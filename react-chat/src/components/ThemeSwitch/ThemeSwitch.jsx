import React, { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";

import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import "./ThemeSwitch.scss";

export const ThemeSwitch = () => {
    const { theme, setTheme } = useContext(ThemeContext);

    return (
        <div className="theme-switch">
            <button
                className={`theme-switch__cell ${theme === "dark" ? "theme-switch__cell_active" : ""}`}
                onClick={() => {
                    setTheme("dark");
                }}
            >
                <DarkModeIcon sx={{ fontSize: 18 }} />
            </button>
            <button
                className={`theme-switch__cell ${theme === "light" ? "theme-switch__cell_active" : ""}`}
                onClick={() => {
                    setTheme("light");
                }}
            >
                <LightModeIcon sx={{ fontSize: 18 }} />
            </button>
        </div>
    );
};
