import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { AppProvider } from "./context/AppContext.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import { DsaContextProvider } from "./context/DsaContext.jsx";
createRoot(document.getElementById("root")).render(
  <>
    <BrowserRouter>
      <ThemeProvider>
        <AppProvider>
          <DsaContextProvider>
            <App />
          </DsaContextProvider>
        </AppProvider>
      </ThemeProvider>
    </BrowserRouter>
  </>,
);
