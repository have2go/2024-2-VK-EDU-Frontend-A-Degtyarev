import React, { useEffect, useState, useRef } from "react";

import "./ConfirmationModal.scss";

export const ConfirmationModal = ({
    isHeaderModalOpen,
    setIsHeaderModalOpen,
    modalType,
    handleConfirm,
    selectedMessage,
    inputValue,
    setInputValue,
    fileInputRef,
}) => {
    const [isMouseDownOutside, setIsMouseDownOutside] = useState(false);
    const inputRef = useRef(null);

    const modalText = {
        deleteChat: "Вы действительно хотите удалить этот чат?",
        deleteMessage: "Вы действительно хотите удалить это сообщение?",
        editMessage: "Измените сообщение",
        deleteProfile: "Вы действительно хотите удалить свой профиль?",
    };

    const handleMouseDown = e => {
        if (e.target.classList.contains("modal")) {
            setIsMouseDownOutside(true);
        }
    };

    const handleMouseUp = () => {
        if (isMouseDownOutside) {
            setIsHeaderModalOpen(false);
        }
        setIsMouseDownOutside(false);
    };

    useEffect(() => {
        if (setInputValue) {
            if (selectedMessage?.text?.trim()) {
                if (selectedMessage.containsLink) {
                    setInputValue(selectedMessage.containsLink.href);
                } else {
                    setInputValue(selectedMessage.text);
                }
            } else {
                setInputValue("");
            }
        }
    }, [selectedMessage]);

    useEffect(() => {
        if (isHeaderModalOpen && modalType === "editMessage" && inputRef.current) {
            setTimeout(() => {
                inputRef.current.focus();
            }, 100);
        }
    }, [isHeaderModalOpen, modalType]);

    return (
        <div
            className={`modal ${isHeaderModalOpen ? "modal_active" : ""}`}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
        >
            <div className="modal__content" onClick={e => e.stopPropagation()}>
                <p className="modal__text">{modalText[modalType]}</p>
                {modalType === "editMessage" && selectedMessage?.text && (
                    <input
                        className="modal__input"
                        type="text"
                        value={inputValue}
                        onChange={e => setInputValue(e.target.value)}
                        ref={inputRef}
                    />
                )}
                {/* {modalType === "editMessage" && selectedMessage?.isImg && (
                    <input type="file" accept="image/*" multiple ref={fileInputRef} />
                )} */}
                <div className="modal__buttons">
                    <button className="modal__button modal__button_cancel" onClick={() => setIsHeaderModalOpen(false)}>
                        {modalType === "editMessage" ? "Отмена" : "Нет"}
                    </button>
                    <button className="modal__button modal__button_confirm" onClick={handleConfirm}>
                        {modalType === "editMessage" ? "Изменить" : "Да"}
                    </button>
                </div>
            </div>
        </div>
    );
};
