import React, { useEffect } from "react";

import "./ConfirmationModal.scss";

export const ConfirmationModal = ({
    isModalOpen,
    setIsModalOpen,
    modalType,
    handleConfirm,
    selectedMessage,
    inputValue,
    setInputValue,
}) => {
    const modalText = {
        deleteChat: "Вы действительно хотите удалить этот чат?",
        deleteMessage: "Вы действительно хотите удалить это сообщение?",
        editMessage: "Измените сообщение",
        deleteProfile: "Вы действительно хотите удалить свой профиль?",
    };

    useEffect(() => {
        if (setInputValue) {
            if (selectedMessage?.text.trim()) {
                setInputValue(selectedMessage.text);
            } else {
                setInputValue("");
            }
        }
    }, [selectedMessage]);

    return (
        <div className={`modal ${isModalOpen ? "modal_active" : ""}`} onClick={() => setIsModalOpen(false)}>
            <div className="modal__content" onClick={e => e.stopPropagation()}>
                <p className="modal__text">{modalText[modalType]}</p>
                {modalType === "editMessage" && (
                    <input type="text" value={inputValue} onChange={e => setInputValue(e.target.value)} />
                )}
                <div className="modal__buttons">
                    <button className="modal__button modal__button_cancel" onClick={() => setIsModalOpen(false)}>
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
