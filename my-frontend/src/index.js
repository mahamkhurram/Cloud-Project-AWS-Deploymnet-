import React from 'react';
import ReactDOM from 'react-dom/client'; // Use the new ReactDOM API
import './index.css'; // Make sure this file exists in the 'src' folder
import App from './App'; // Import the App component
import reportWebVitals from './reportWebVitals'; // Optional for performance tracking

// The root element where React will attach your app
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the app wrapped inside React.StrictMode for extra checks during development
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Optional: Log performance metrics (you can disable this)
reportWebVitals();
