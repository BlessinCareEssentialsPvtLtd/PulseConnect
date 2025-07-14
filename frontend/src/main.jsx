// index.jsx
import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client"; // use react-router-dom!
import AppRouter from "./AppRouter.jsx";
import { AuthProvider } from "./context/AuthContext";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>
);
