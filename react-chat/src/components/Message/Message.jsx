import React, { useRef, useState } from "react";
import { months } from "../../utils/constants";
import DoneAllIcon from "@mui/icons-material/DoneAll";

import "./Message.scss";

export const Message = ({ user, msg, selectedMessage, setSelectedMessage }) => {
    const creationDate = new Date(msg.created_at);

    const day = String(creationDate.getDate()).padStart(2, "0");
    const month = months[creationDate.getMonth()];
    const year = creationDate.getFullYear();
    const hours = String(creationDate.getHours()).padStart(2, "0");
    const minutes = String(creationDate.getMinutes()).padStart(2, "0");
    const seconds = String(creationDate.getSeconds()).padStart(2, "0");

    const messageRef = useRef();

    const handleSelectMessage = (div, isEditable) => {
        if (selectedMessage?.id === div.id) {
            setSelectedMessage(null);
        } else {
            setSelectedMessage({
                id: div.id,
                isEditable: isEditable,
                text: messageRef.current.innerHTML,
            });
        }
    };

    return (
        <div
            className={`message__wrapper ${msg.sender?.id === user.data.id ? "" : "message__wrapper_incoming"} ${
                selectedMessage?.id === msg.id ? "message__wrapper_active" : ""
            }`}
        >
            <div
                className={`message ${msg.sender?.id === user.data.id ? "" : "message_incoming"} ${
                    selectedMessage?.id === msg.id ? "message_selected" : ""
                }`}
                onClick={e => handleSelectMessage(e.target.closest(".message"), msg.sender?.id === user.data.id)}
                id={msg.id}
            >
                <p className="message__text" ref={messageRef}>
                    {msg.text}
                </p>
                <div className="message__info tooltip">
                    <span className="tooltiptext">
                        {day} {month} {year}г., {hours}:{minutes}:{seconds}
                    </span>
                    <p className="message__time">{hours + ":" + minutes}</p>
                    <span
                        className={`material-symbols-outlined message__arrows ${
                            msg.sender?.id === user.data.id ? "" : "message__arrows_incoming"
                        }`}
                    >
                        <DoneAllIcon sx={{ fontSize: 14 }} />
                    </span>
                </div>
            </div>
        </div>
    );
};
