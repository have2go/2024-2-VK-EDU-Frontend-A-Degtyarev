import React, { useEffect, useState, useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";

import CloseIcon from "@mui/icons-material/Close";
import "./NewChatModal.scss";

const NewChatModal = ({ isModalOpen, handleToggleModal, createNewChat }) => {
    const { theme } = useContext(ThemeContext);
    const [newChatName, setNewChatName] = useState("");

    const submitCreation = e => {
        e.preventDefault();

        if (!newChatName.trim()) {
            return;
        }
        handleToggleModal();
        createNewChat(newChatName);
        setNewChatName("");
    };

    const handleNameChange = e => {
        setNewChatName(e.target.value);
    };

    const handleKeyDown = e => {
        if (e.key === "Escape" && isModalOpen) {
            handleToggleModal();
        }
    };

    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    });

    return (
        <div className={`${theme} newchat ${isModalOpen ? "newchat_active" : ""}`}>
            <form className="newchat__form" onSubmit={submitCreation}>
                <h3 className="newchat__title">Кому вы хотите написать?</h3>
                <input
                    type="text"
                    className="newchat__name"
                    placeholder="Имя собеседника"
                    autoComplete="off"
                    value={newChatName}
                    onChange={handleNameChange}
                />
                <button className="newchat__submit-btn" type="submit">
                    Создать чат
                </button>
                <button className="newchat__close-btn" onClick={handleToggleModal} type="button">
                    <span className="icon">
                        <CloseIcon sx={{ fontSize: 32 }} />
                    </span>
                </button>
            </form>
        </div>
    );
};

export default NewChatModal;
