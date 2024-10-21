import React, {useContext} from "react";
import { ThemeContext } from "../../context/ThemeContext";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PersonIcon from "@mui/icons-material/Person";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import "./Header.scss";

const Header = ({ chatListArr, handleToggleModal, currentPage, currentChat, setCurrentPage, setChatListArr }) => {
    const { theme, setTheme } = useContext(ThemeContext);
    
    const handleGoBack = () => {
        if (chatListArr.length > 0 && chatListArr.at(-1).messages.length === 0) {
            const updatedArr = [...chatListArr];
            updatedArr.pop();
            setChatListArr(updatedArr);
        }
        setCurrentPage("chatlist");
    };

    return (
        <header className={`header ${theme}`}>
            {currentPage === "chatlist" && (
                <>
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
                </>
            )}
            {currentPage === "chat" && (
                <>
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
                </>
            )}
        </header>
    );
};

export default Header;
