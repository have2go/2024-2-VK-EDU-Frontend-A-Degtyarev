import { createContext, useLayoutEffect, useState } from "react";

export const ThemeContext = createContext();

const preferDarkSchema = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
const defaultTheme = preferDarkSchema ? "dark" : "light";

export const ThemeProvider = ({ children }) => {
    const THEME_KEY = "theme";
    const [theme, setTheme] = useState(localStorage.getItem(THEME_KEY) || defaultTheme);

    useLayoutEffect(() => {
        document.body.classList.remove("light", "dark");
        document.body.classList.add(theme);
        localStorage.setItem(THEME_KEY, theme);
    }, [theme]);

    return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
};
