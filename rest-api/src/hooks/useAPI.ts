import { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";

interface UseApiResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => void; // ✅ New field
}

export function useApi<T>(apiFunc: (signal: AbortSignal) => Promise<T>): UseApiResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  // This state is just a trigger. Changing it forces useEffect to run again.
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const refetch = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  useEffect(() => {
    // 1. Reset state before making the call
    setLoading(true);
    setData(null);
    setError(null);

    // Create the controller
    // AbortController is a browser API used to cancel pending async requests.
    // in React, we use it inside the useEffect cleanup function to cancel API calls if the component unmounts.
    // This prevents 'memory leaks' where the application tries to update the state of a component that no longer exists.
    // its like one request call was going on but before it could complete the user navigated away from that component/page.
    const controller = new AbortController();

    const executeApi = async () => {
      try {
        // Pass the signal to the service function
        const result = await apiFunc(controller.signal);
        setData(result);
      } catch (err) {

        // Ignore errors if they were caused by cancellation
        if (axios.isCancel(err)) {
            console.log("Request cancelled successfully");
            return;
        }
        
        // 2. Handle Axios Errors (HTTP 400, 404, 500, etc.)
        if (axios.isAxiosError(err)) {
          const axiosError = err as AxiosError<any>; // Cast to access .response.data

          // Try to get the custom message from the backend (e.g., { message: "User not found" })
          const serverMessage = axiosError.response?.data?.message || axiosError.response?.data?.error;
          
          if (serverMessage) {
             setError(serverMessage);
          } else {
             // Fallback: "Request failed with status code 404"
             setError(axiosError.message);
          }
        
          // Optional: You can log the specific status code for debugging
          console.error("HTTP Status:", axiosError.response?.status);
        } 
        
        // 3. Handle Standard JS Errors
        else if (err instanceof Error) {
          setError(err.message);
        } 
        
        // 4. Handle Unknown Errors
        else {
          setError("An unknown error occurred");
        }
      } finally {
        // Only stop loading if the component is still mounted (not cancelled)
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    executeApi();
    // Cleanup function triggers the abort
    return () => {
      controller.abort();
    };
    // 3. ✅ IMPORTANT: Add 'refreshTrigger' to the dependency array
  // This tells React: "Run this effect again whenever refreshTrigger changes"
  }, [refreshTrigger]); 

  return { data, loading, error, refetch };
}