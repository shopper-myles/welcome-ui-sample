import React from "react";
import ReactDOM from "react-dom/client";

export function createRoot(id: string, children: React.ReactNode) {
  return ReactDOM.createRoot(document.getElementById(id)!).render(
    <React.StrictMode>{children}</React.StrictMode>
  );
}
