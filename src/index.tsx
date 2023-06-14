import React from "react";
import { createRoot } from "react-dom/client";
import App from "./pages/app/App";

const root = document.getElementById("root");
if (root) {
  createRoot(root).render(<App />);
}
