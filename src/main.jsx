import { StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import App from "./App.jsx";
import "./styles.css";

/* The markup is prerendered at build time, so attach to it rather than
   discarding it and drawing the page a second time. */
hydrateRoot(
  document.getElementById("root"),
  <StrictMode>
    <App />
  </StrictMode>
);
