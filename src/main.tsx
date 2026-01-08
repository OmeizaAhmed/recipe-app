import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import GlobalContextComponent from "./GlobalContextComponent.tsx";
import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <StrictMode>
      <GlobalContextComponent>
        <App />
      </GlobalContextComponent>
    </StrictMode>
  </BrowserRouter>
);
