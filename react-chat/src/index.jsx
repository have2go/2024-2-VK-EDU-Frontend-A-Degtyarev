import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import { HelmetProvider } from "react-helmet-async";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <HelmetProvider>
            <ThemeProvider>
                <HashRouter>
                    <App />
                </HashRouter>
            </ThemeProvider>
        </HelmetProvider>
    </StrictMode>
);
