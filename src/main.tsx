import React from "react";
import App from "~/src/App";
import { createRoot } from "./utilities/shared/shared";

import "~/src/theme/theme.module.css";

createRoot(
  "root",
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
