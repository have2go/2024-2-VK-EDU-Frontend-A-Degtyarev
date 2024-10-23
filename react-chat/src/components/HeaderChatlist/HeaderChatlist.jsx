import React, { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
import "./HeaderChatlist.scss";

export const HeaderChatlist = ({ handleToggleModal }) => {
    const { theme } = useContext(ThemeContext);

    return (
        <header className={`header ${theme}`}>
            <span className="icon header__menu">
                <MenuIcon sx={{ fontSize: 32 }} />
            </span>
            <h1 className="header__title">Список чатов</h1>
            <span className="icon header__search">
                <SearchIcon sx={{ fontSize: 32 }} />
            </span>
            <button className="new-msg" onClick={handleToggleModal}>
                <span className="icon new-msg__symbol">
                    <EditIcon sx={{ fontSize: 26 }} />
                </span>
            </button>
        </header>
    );
};
