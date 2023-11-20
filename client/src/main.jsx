import React from "react"; // Importing React
import ReactDOM from "react-dom/client"; // Importing ReactDOM from the new React 18 API
import App from "./App.jsx"; // Importing the main App component

// Creating a root element
const root = ReactDOM.createRoot(document.getElementById("root"));

// Rendering the App component inside the root element
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
