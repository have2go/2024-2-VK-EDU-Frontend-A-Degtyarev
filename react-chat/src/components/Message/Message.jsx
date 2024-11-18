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

    const handleSelectMessage = (e, isEditable) => {
        const message = e.target.closest(".message");
        const isLink = e.target.tagName === "A";
        const isImg = e.target.tagName === "IMG" || Boolean(e.target.querySelector(".message__img"));
        const isVoice = msg.voice;

        if (selectedMessage?.id === message?.id || isLink) {
            setSelectedMessage(null);
        } else {
            setSelectedMessage({
                id: message?.id,
                isEditable: isEditable,
                text: messageRef.current?.innerHTML || null,
                isImg: isImg,
                isVoice: isVoice,
            });
        }
    };

    const formatMessageText = text => {
        const urlRegex = /(https?:\/\/[^\s]+)/g;
        return text.split(urlRegex).map((part, index) =>
            urlRegex.test(part) ? (
                <a
                    key={index}
                    href={part}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "#3498db", textDecoration: "underline" }}
                >
                    {part}
                </a>
            ) : (
                part
            )
        );
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
                onClick={e => handleSelectMessage(e, msg.sender?.id === user.data.id)}
                id={msg.id}
            >
                {msg.text && (
                    <p className="message__text" ref={messageRef}>
                        {formatMessageText(msg.text)}
                    </p>
                )}
                {msg.files.length > 0 && !msg.voice && (
                    <div className="message__img-container">
                        {msg.files.map((file, i) => {
                            return (
                                <img
                                    key={i}
                                    src={file.item}
                                    alt="attachment"
                                    className="message__img"
                                    draggable={false}
                                />
                            );
                        })}
                    </div>
                )}
                {msg.voice && (
                    <audio className="message__audio" controls>
                        <source src={msg.voice} type="audio/wav" />
                    </audio>
                )}
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
