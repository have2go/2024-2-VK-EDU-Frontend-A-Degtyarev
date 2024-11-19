import React, { useContext, useEffect, useState, useRef } from "react";
import { UserContext } from "../../context/UserContext";
import { Link, useNavigate } from "react-router-dom";
import { ThemeContext } from "../../context/ThemeContext";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PersonIcon from "@mui/icons-material/Person";
import SearchIcon from "@mui/icons-material/Search";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import "./HeaderChat.scss";
import { ConfirmationModal } from "../ConfirmationModal";

export const HeaderChat = ({ chat, selectedMessage, setSelectedMessage }) => {
    const { theme } = useContext(ThemeContext);
    const user = useContext(UserContext);

    const navigate = useNavigate();

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState(null);
    const [inputValue, setInputValue] = useState("");

    const dropdownRef = useRef(null);

    const handleModalOpen = type => {
        setModalType(type);
        setIsMenuOpen(false);
        setIsModalOpen(true);
    };

    const handleConfirm = () => {
        if (modalType === `deleteChat`) {
            fetch(`https://vkedu-fullstack-div2.ru/api/chat/${chat.id}/`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${user.tokens.access}`,
                    "Content-Type": "application/json",
                },
            })
                .then(res => {
                    if (res.ok) {
                        navigate(`/`);
                        return;
                    }
                    return Promise.reject(res);
                })
                .catch(res => {
                    console.log(res);
                });
        }
        if (modalType === "deleteMessage") {
            fetch(`https://vkedu-fullstack-div2.ru/api/message/${selectedMessage.id}/`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${user.tokens.access}`,
                    "Content-Type": "application/json",
                },
            })
                .then(res => {
                    if (res.ok) {
                        setIsModalOpen(false);
                        setSelectedMessage(null);
                        return res.json();
                    }
                    return Promise.reject(res);
                })
                .catch(res => {
                    console.log(res);
                });
        }
        if (modalType === "editMessage" && inputValue.trim()) {
            fetch(`https://vkedu-fullstack-div2.ru/api/message/${selectedMessage.id}/`, {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${user.tokens.access}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    text: inputValue,
                }),
            })
                .then(res => {
                    if (res.ok) {
                        setInputValue("");
                        setIsModalOpen(false);
                        setSelectedMessage(null);
                        return res.json();
                    }
                    return Promise.reject(res);
                })
                .catch(res => {
                    console.log(res);
                });
        }
    };

    useEffect(() => {
        const handleClickOutside = event => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsMenuOpen(false);
            }
        };

        if (isMenuOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isMenuOpen]);

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
                    <p className="header__name">{chat?.title}</p>
                    <p className="header__last-seen">был 2 часа назад</p>
                </div>
            </div>
            <div className="header__utils-container">
                {selectedMessage?.isEditable ? (
                    <>
                        <button className="icon header__search" onClick={() => handleModalOpen("editMessage")}>
                            <EditIcon sx={{ fontSize: 26 }} />
                        </button>
                        <button className="icon header__more" onClick={() => handleModalOpen("deleteMessage")}>
                            <DeleteIcon sx={{ fontSize: 26 }} />
                        </button>
                    </>
                ) : (
                    <>
                        <button className="icon header__search">
                            <SearchIcon sx={{ fontSize: 30 }} />
                        </button>
                        <button className="icon header__more" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                            <MoreVertIcon sx={{ fontSize: 30 }} />
                        </button>
                    </>
                )}
                <div ref={dropdownRef} className={`header__dropdown ${isMenuOpen ? "header__dropdown_active" : ""}`}>
                    <button className="header__dropdown-element" onClick={() => handleModalOpen("deleteChat")}>
                        <DeleteIcon color="error" /> Удалить чат
                    </button>
                </div>
            </div>
            <ConfirmationModal
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                modalType={modalType}
                handleConfirm={handleConfirm}
                selectedMessage={selectedMessage}
                inputValue={inputValue}
                setInputValue={setInputValue}
            />
        </header>
    );
};
