import React, { useEffect, useRef, useState } from "react";

// useRef lets you store a value or reference that survives re-renders without causing a re-render.
// What’s happening?

// inputRef stores DOM element

// .current points to <input>

// No re-render triggered

// Mental model: “useRef gives me direct access to the DOM.”

// function UseRef() {
//     const inputRef = useRef<HTMLInputElement>(null);
//     const focusInput = () => {
//         inputRef.current?.focus();
//       };
//       return (
//         <>
//           <input ref={inputRef} />
//           <button onClick={focusInput}>Focus Input</button>
//         </>
//       );
// }

// export default UseRef

// Example - 2 Store previous value
// Why useRef here? - We want to remember old value, But don’t want re-render
function Counter() {
  const [count, setCount] = useState(0);
  const prevCount = useRef<number>(0);

  useEffect(() => {
    prevCount.current = count;
  }, [count]);

  return (
    <>
      <p>Current: {count}</p>
      <p>Previous: {prevCount.current}</p>
      <button onClick={() => setCount(count + 1)}>+</button>
    </>
  );
}

export default Counter;