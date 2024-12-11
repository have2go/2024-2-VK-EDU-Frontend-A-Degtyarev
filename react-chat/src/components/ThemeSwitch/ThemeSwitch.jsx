import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import cn from "classnames";
import "./ThemeSwitch.scss";

export const ThemeSwitch = () => {
    const { theme, setTheme } = useContext(ThemeContext);

    const classes = {
        themeSwitchCellDark: cn("theme-switch__cell", { "theme-switch__cell_active": theme === "dark" }),
        themeSwitchCellLight: cn("theme-switch__cell", { "theme-switch__cell_active": theme === "light" }),
    };

    return (
        <div className="theme-switch">
            <button
                className={classes.themeSwitchCellDark}
                onClick={() => {
                    setTheme("dark");
                }}
            >
                <DarkModeIcon sx={{ fontSize: 18 }} />
            </button>
            <button
                className={classes.themeSwitchCellLight}
                onClick={() => {
                    setTheme("light");
                }}
            >
                <LightModeIcon sx={{ fontSize: 18 }} />
            </button>
        </div>
    );
};
