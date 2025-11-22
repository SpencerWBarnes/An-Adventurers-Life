import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { CurrentDayProvider } from "./CurrentDayContext";

const container = document.getElementById("root")!;
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <CurrentDayProvider>
      <App />
    </CurrentDayProvider>
  </React.StrictMode>
);
