import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

// Because of React.StrictMode:

// useEffect(() => { deleteEmployeeById(); }, []);
// runs → deletes employee 4 (200 OK).

// React simulates unmount + remount.

// useEffect runs again → DELETE /employees/4 again → 404 (not found).

// In production build, this double-run won’t happen, but in dev it does.

root.render(
  // <React.StrictMode>
    <App />
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
