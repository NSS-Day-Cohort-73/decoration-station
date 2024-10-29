import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import DecorationStation from "./components/DecorationStation.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <DecorationStation />
  </StrictMode>
);
