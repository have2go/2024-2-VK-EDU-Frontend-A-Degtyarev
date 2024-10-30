import React, { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { ThemeContext } from "../../context/ThemeContext";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PersonIcon from "@mui/icons-material/Person";
import SearchIcon from "@mui/icons-material/Search";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import "./HeaderChat.scss";

export const HeaderChat = ({ chatListArr }) => {
    const { theme } = useContext(ThemeContext);

    const { id } = useParams();
    const chat =
        chatListArr.length === 0
            ? JSON.parse(localStorage.getItem("chatListArr")).find(chat => chat.id.toString() === id)
            : chatListArr.find(chat => chat.id.toString() === id);

    return (
        <header className={`header ${theme}`}>
            <Link to={"/"} className="header__back-btn">
                <span className="icon header__back">
                    <ArrowBackIcon sx={{ fontSize: 30 }} />
                </span>
            </Link>
            <div className="header__user">
                <div className="header__avatar-container">
                    <span className="icon">
                        <PersonIcon sx={{ fontSize: 30 }} />
                    </span>
                </div>
                <div className="header__name-container">
                    <p className="header__name">{chat.companionName}</p>
                    <p className="header__last-seen">был 2 часа назад</p>
                </div>
            </div>
            <div className="header__utils-container">
                <span className="icon header__search">
                    <SearchIcon sx={{ fontSize: 30 }} />
                </span>
                <span className="icon header__more">
                    <MoreVertIcon sx={{ fontSize: 30 }} />
                </span>
            </div>
        </header>
    );
};
