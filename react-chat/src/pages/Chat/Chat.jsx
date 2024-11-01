import React, { useEffect, useRef, useState, useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { months } from "../../utils/constants";
import { HeaderChat } from "../../components/HeaderChat";
import { Helmet } from "react-helmet-async";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import SendIcon from "@mui/icons-material/Send";
import "./Chat.scss";
import { useParams, useNavigate } from "react-router-dom";

export const Chat = ({ chatListArr, setChatListArr }) => {
    const [inputValue, setInputValue] = useState("");
    const [isEmpty, setIsempty] = useState(false);
    const { theme } = useContext(ThemeContext);
    const { id } = useParams();
    const chatEndRef = useRef(null);
    const inputRef = useRef(null);
    const navigate = useNavigate();

    const chat =
        chatListArr.length === 0
            ? JSON.parse(localStorage.getItem("chatListArr")).find(chat => chat.id.toString() === id)
            : chatListArr.find(chat => chat.id.toString() === id);

    const USER =
        (JSON.parse(localStorage.getItem("currentUser")) && JSON.parse(localStorage.getItem("currentUser")).username) ||
        "Alex";

    const handleInputChange = e => {
        setInputValue(e.target.value);
    };

    const handleSending = e => {
        e.preventDefault();
        sendMessage();
    };

    const sendMessage = () => {
        if (inputValue.trim()) {
            const date = new Date();
            const newMessage = {
                message: inputValue.trim(),
                createdAt: date,
                author: USER,
            };
            console.log(newMessage);
            const updatedArr = [...chatListArr];
            const currChat = updatedArr.find(chat => chat.id.toString() === id);
            currChat.messages.push(newMessage);
            setChatListArr(updatedArr);
            setInputValue("");
            inputRef.current.focus();
            // таймер для того, чтобы последнее сообщение успело создаться
            // и прокрутило именно в самый низ
            setTimeout(() => {
                scrollToBottom();
            }, 50);
        }
    };

    const handleTestMessage = e => {
        e.preventDefault();
        sendTestMessage();
    };

    const sendTestMessage = () => {
        const date = new Date();
        const newMessage = {
            message: "Тестовое сообщение",
            createdAt: date,
            author: chat.companionName,
        };
        const updatedArr = [...chatListArr];
        const currChat = updatedArr.find(chat => chat.id.toString() === id);
        currChat.messages.push(newMessage);
        currChat.quantityNew += 1;
        setChatListArr(updatedArr);
        setTimeout(() => {
            scrollToBottom();
        }, 50);
    };

    const scrollToBottom = () => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, []);

    useEffect(() => {
        if (!chat) {
            navigate("/404");
        }
    }, [id]);

    if (!chat) return null;

    return (
        <>
            <Helmet>
                <title>{chat.companionName}</title>
            </Helmet>
            <HeaderChat chatListArr={chatListArr} />
            <form className={`form ${theme}`} action="/">
                <div className="form__input-container">
                    <input
                        className="form__input"
                        placeholder="Введите сообщение"
                        type="text"
                        autoComplete="off"
                        value={inputValue}
                        onChange={handleInputChange}
                        ref={inputRef}
                    />
                    <button className="form__send-btn icon" onClick={handleSending}>
                        <SendIcon />
                    </button>
                </div>
                <button className="test-button" onClick={handleTestMessage}>
                    Имитация отправки сообщения от собеседника
                </button>
                <div className="form__bottom-spacer"></div>
            </form>
            <div className="messages">
                <div ref={chatEndRef} />
                {chat.messages
                    .map((obj, i) => {
                        const creationDate = new Date(obj.createdAt);

                        const day = String(creationDate.getDate()).padStart(2, "0");
                        const month = months[creationDate.getMonth()];
                        const year = creationDate.getFullYear();
                        const hours = String(creationDate.getHours()).padStart(2, "0");
                        const minutes = String(creationDate.getMinutes()).padStart(2, "0");
                        const seconds = String(creationDate.getSeconds()).padStart(2, "0");

                        return (
                            <div
                                key={i}
                                className={`message ${obj.author === chat.companionName ? "message_incoming" : ""}`}
                            >
                                <p className="message__text">{obj.message}</p>
                                <div className="message__info tooltip">
                                    <span className="tooltiptext">
                                        {day} {month} {year}г., {hours}:{minutes}:{seconds}
                                    </span>
                                    <p className="message__time">{hours + ":" + minutes}</p>
                                    <span
                                        className={`material-symbols-outlined message__arrows ${
                                            obj.author === chat.companionName ? "message__arrows_incoming" : ""
                                        }`}
                                    >
                                        <DoneAllIcon sx={{ fontSize: 14 }} />
                                    </span>
                                </div>
                            </div>
                        );
                    })
                    .reverse()}
            </div>
            <div className="bg"></div>
            {chat.messages.length === 0 && <div className="empty-chat">Нет сообщений</div>}
        </>
    );
};
