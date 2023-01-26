import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App";
import "./styles.css";

const root = createRoot(document.getElementById("main")!);
root.render(<StrictMode><App /></StrictMode>);
