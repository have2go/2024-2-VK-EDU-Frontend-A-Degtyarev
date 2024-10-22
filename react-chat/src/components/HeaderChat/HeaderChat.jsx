import React, { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PersonIcon from "@mui/icons-material/Person";
import SearchIcon from "@mui/icons-material/Search";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import "./HeaderChat.scss";

export const HeaderChat = ({ chatListArr, currentChat, setCurrentPage, setChatListArr }) => {
    const { theme } = useContext(ThemeContext);

    const handleGoBack = () => {
        if (chatListArr.length > 0 && chatListArr.at(-1).messages.length === 0) {
            const updatedArr = [...chatListArr];
            updatedArr.pop();
            setChatListArr(updatedArr);
            localStorage.setItem("chatListArr", JSON.stringify(updatedArr));
        }
        setCurrentPage("chatlist");
    };

    return (
        <header className={`header ${theme}`}>
            <button className="header__back-btn" onClick={handleGoBack}>
                <span className="icon header__back">
                    <ArrowBackIcon sx={{ fontSize: 30 }} />
                </span>
            </button>
            <div className="header__user">
                <div className="header__avatar-container">
                    <span className="icon">
                        <PersonIcon sx={{ fontSize: 30 }} />
                    </span>
                </div>
                <div className="header__name-container">
                    <p className="header__name">{currentChat.companionName}</p>
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
