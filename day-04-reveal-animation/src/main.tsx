import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Reveal } from "./Reveal";
import "./styles.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Reveal />
  </StrictMode>
);
