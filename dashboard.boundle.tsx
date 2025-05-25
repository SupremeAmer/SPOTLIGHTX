import React from "react";
import ReactDOM from "react-dom/client";
import SupremeAmerDashboard from "./SupremeAmerDashboard";

// Expose a function so vanilla JS can call it
(window as any).renderDashboard = (elId: string) => {
  const el = document.getElementById(elId);
  if (el) {
    ReactDOM.createRoot(el).render(<SupremeAmerDashboard />);
  }
};
