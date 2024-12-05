import React, { useRef, useState, useEffect } from "react";
import { months } from "../../utils/constants";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import { useCurrentUserStore } from "../../store/store";

import "./Message.scss";

export const Message = ({ msg, selectedMessage, setSelectedMessage }) => {
    const { userData } = useCurrentUserStore();

    const [isTextSelected, setIsTextSelected] = useState(false);

    const creationDate = new Date(msg.created_at);

    const day = String(creationDate.getDate()).padStart(2, "0");
    const month = months[creationDate.getMonth()];
    const year = creationDate.getFullYear();
    const hours = String(creationDate.getHours()).padStart(2, "0");
    const minutes = String(creationDate.getMinutes()).padStart(2, "0");
    const seconds = String(creationDate.getSeconds()).padStart(2, "0");

    const messageRef = useRef();

    const handleSelectMessage = (e, isEditable) => {
        const isLink = e.target.tagName === "A";
        if (isLink || isTextSelected) return;

        const el = e.target.firstChild && e.target.tagName !== "P" ? e.target.firstChild : e.target;

        const message = el.closest(".message");
        const containsLink = el.querySelector("a");
        const isImg = el.tagName === "IMG" || el.querySelector(".message__img");
        const isVoice = msg.voice;

        if (selectedMessage?.id === message?.id) {
            setSelectedMessage(null);
        } else {
            setSelectedMessage({
                id: message?.id,
                isEditable: isEditable,
                text: messageRef.current?.innerHTML || null,
                isImg: isImg,
                isVoice: isVoice,
                containsLink: containsLink,
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

    const handleMouseUp = () => {
        const selectedText = window.getSelection().toString();
        setIsTextSelected(selectedText.length > 0);
    };

    useEffect(() => {
        document.addEventListener("mouseup", handleMouseUp);

        return () => {
            document.removeEventListener("mouseup", handleMouseUp);
        };
    }, []);

    return (
        userData?.id && (
            <div
                className={`message__wrapper ${msg.sender?.id === userData?.id ? "" : "message__wrapper_incoming"} ${
                    selectedMessage?.id === msg.id ? "message__wrapper_active" : ""
                }`}
                onClick={e => {
                    e.stopPropagation();
                    handleSelectMessage(e, msg.sender?.id === userData.id);
                }}
                onDragStart={e => e.preventDefault()}
            >
                <div
                    className={`message ${msg.sender?.id === userData?.id ? "" : "message_incoming"} ${
                        selectedMessage?.id === msg.id ? "message_selected" : ""
                    }`}
                    onClick={e => {
                        e.stopPropagation();
                        handleSelectMessage(e, msg.sender?.id === userData.id);
                    }}
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
                                msg.sender?.id === userData?.id ? "" : "message__arrows_incoming"
                            }`}
                        >
                            <DoneAllIcon sx={{ fontSize: 14 }} />
                        </span>
                    </div>
                </div>
            </div>
        )
    );
};
