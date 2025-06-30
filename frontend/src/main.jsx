// index.jsx
import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client"; // use react-router-dom!
import AppRouter from "./AppRouter.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AppRouter />
  </StrictMode>
);
