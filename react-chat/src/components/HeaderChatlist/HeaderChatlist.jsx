import React, { useContext, useState } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import SearchIcon from "@mui/icons-material/Search";
import { SidebarBurger } from "../SidebarBurger";
import "./HeaderChatlist.scss";
import { NewChatBtn } from "../NewChatBtn";
import { Sidebar } from "../Sidebar";

export const HeaderChatlist = ({ handleToggleModal }) => {
    const { theme } = useContext(ThemeContext);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = e => {
        e.preventDefault();
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className={`header ${theme}`}>
            <button className="header__menu" onClick={toggleMenu}>
                {isMenuOpen ? <MenuOpenIcon sx={{ fontSize: 32 }} /> : <MenuIcon sx={{ fontSize: 32 }} />}
            </button>
            <h1 className="header__title">Список чатов</h1>
            <button className="icon header__search">
                <SearchIcon sx={{ fontSize: 32 }} />
            </button>
            <NewChatBtn handleToggleModal={handleToggleModal} />
            <Sidebar />
            <SidebarBurger toggleMenu={toggleMenu} isMenuOpen={isMenuOpen} />
        </header>
    );
};
