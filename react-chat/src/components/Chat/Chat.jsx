import React, { useEffect, useRef, useState, useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { months } from "../../utils/constants";
import "./Chat.scss";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import SendIcon from "@mui/icons-material/Send";

const Chat = ({ currentChat, chatListArr, setChatListArr }) => {
    const { theme } = useContext(ThemeContext);
    
    const USER = "Alex";
    const [inputValue, setInputValue] = useState("");
    const [currentChatIndex, setCurrentChatIndex] = useState(0);
    const chatEndRef = useRef(null);

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
            const updatedArr = [...chatListArr];
            updatedArr[currentChatIndex].messages.push(newMessage);
            setChatListArr(updatedArr);
            setInputValue("");
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
            author: chatListArr[currentChatIndex].companionName,
        };
        const updatedArr = [...chatListArr];
        updatedArr[currentChatIndex].messages.push(newMessage);
        updatedArr[currentChatIndex].quantityNew += 1;
        setChatListArr(updatedArr);
        setTimeout(() => {
            scrollToBottom();
        }, 50);
    };

    const scrollToBottom = () => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        setCurrentChatIndex(chatListArr.findIndex(chat => chat.id === currentChat.id));
        scrollToBottom();
    }, []);

    return (
        <>
            <form className={`form ${theme}`} action="/">
                <div className="form__input-container">
                    <input
                        className="form__input"
                        placeholder="Введите сообщение"
                        type="text"
                        autoComplete="off"
                        value={inputValue}
                        onChange={handleInputChange}
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
                {chatListArr[currentChatIndex].messages
                    .map((obj, i) => {
                        const creationDate = new Date(obj.createdAt);

                        const day = String(creationDate.getDate()).padStart(2, "0");
                        const month = months[creationDate.getMonth()];
                        const year = creationDate.getFullYear();
                        const hours = String(creationDate.getHours()).padStart(2, "0");
                        const minutes = String(creationDate.getMinutes()).padStart(2, "0");
                        const seconds = String(creationDate.getSeconds()).padStart(2, "0");

                        return (
                            <div key={i} className={`message ${obj.author === USER ? "" : "message_incoming"}`}>
                                <p className="message__text">{obj.message}</p>
                                <div className="message__info tooltip">
                                    <span className="tooltiptext">
                                        {day} {month} {year}г., {hours}:{minutes}:{seconds}
                                    </span>
                                    <p className="message__time">{hours + ":" + minutes}</p>
                                    <span
                                        className={`material-symbols-outlined message__arrows ${
                                            obj.author === USER ? "" : "message__arrows_incoming"
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
        </>
    );
};

export default Chat;
