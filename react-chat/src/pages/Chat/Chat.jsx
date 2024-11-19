import React, { useEffect, useRef, useState, useContext, useCallback } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { UserContext } from "../../context/UserContext";
import { HeaderChat } from "../../components/HeaderChat";
import { Helmet } from "react-helmet-async";
import SendIcon from "@mui/icons-material/Send";
import "./Chat.scss";
import { useNavigate, useParams } from "react-router-dom";
import { Centrifuge } from "centrifuge";
import { Message } from "../../components/Message";

export const Chat = () => {
    const { theme } = useContext(ThemeContext);
    const { id } = useParams();

    const user = useContext(UserContext);
    const navigate = useNavigate();

    const [chatInfo, setChatInfo] = useState(null);
    const [messages, setMessages] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(false);
    const [isEmpty, setIsEmpty] = useState(false);
    const [selectedMessage, setSelectedMessage] = useState(null);

    const chatEndRef = useRef(null);
    const chatStartRef = useRef(null);
    const containerRef = useRef(null);
    const observer = useRef();
    const inputRef = useRef();

    const handleSending = e => {
        e.preventDefault();
        sendMessage();
    };

    const scrollToBottom = () => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const sendMessage = async () => {
        if (inputRef.current.value.trim()) {
            await fetch(`https://vkedu-fullstack-div2.ru/api/messages/`, {
                method: "POST",
                body: JSON.stringify({
                    text: inputRef.current.value,
                    chat: id,
                }),
                headers: {
                    Authorization: `Bearer ${user.tokens.access}`,
                    "Content-Type": "application/json",
                },
            })
                .then(res => {
                    if (res.ok) {
                        return res.json();
                    }
                    return Promise.reject(res);
                })
                .catch(res => {
                    console.log(res);
                });
            inputRef.current.value = "";
            inputRef.current.focus();
            // таймер для того, чтобы последнее сообщение успело создаться
            // и прокрутило именно в самый низ
            setTimeout(() => {
                scrollToBottom();
            }, 50);
        }
    };

    const fetchMessages = async pageNumber => {
        await fetch(`https://vkedu-fullstack-div2.ru/api/messages/?chat=${id}&page=${pageNumber}&page_size=20`, {
            headers: {
                Authorization: `Bearer ${user.tokens.access}`,
                "Content-Type": "application/json",
            },
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(res);
            })
            .then(json => {
                setMessages(prevMessages => (pageNumber === 1 ? json.results : [...prevMessages, ...json.results]));
                if (pageNumber === 1) {
                    setTimeout(() => {
                        scrollToBottom();
                    }, 50);
                    setTimeout(() => {
                        setHasMore(json.next !== null);
                    }, 500);
                } else {
                    setHasMore(json.next !== null);
                }
            })
            .catch(res => {
                console.log(res);
            });
    };

    useEffect(() => {
        if (!user.tokens.access) {
            navigate("/");
        } else {
            inputRef.current.focus();
            fetch(`https://vkedu-fullstack-div2.ru/api/chat/${id}/`, {
                headers: {
                    Authorization: `Bearer ${user.tokens.access}`,
                    "Content-Type": "application/json",
                },
            })
                .then(res => {
                    if (res.ok) {
                        return res.json();
                    }
                    return Promise.reject(res);
                })
                .then(json => {
                    setChatInfo(json);
                })
                .catch(res => {
                    console.log(res);
                });

            const centrifuge = new Centrifuge("wss://vkedu-fullstack-div2.ru/connection/websocket/", {
                getToken: ctx =>
                    fetch("https://vkedu-fullstack-div2.ru/api/centrifugo/connect/", {
                        body: JSON.stringify(ctx),
                        method: "POST",
                        headers: {
                            Authorization: `Bearer ${user.tokens.access}`,
                            "Content-Type": "application/json",
                        },
                    })
                        .then(res => res.json())
                        .then(data => data.token),
            });

            const subscription = centrifuge.newSubscription(user.data.id, {
                getToken: ctx =>
                    fetch("https://vkedu-fullstack-div2.ru/api/centrifugo/subscribe/", {
                        body: JSON.stringify(ctx),
                        method: "POST",
                        headers: {
                            Authorization: `Bearer ${user.tokens.access}`,
                            "Content-Type": "application/json",
                        },
                    })
                        .then(res => res.json())
                        .then(data => data.token),
            });

            subscription.on("publication", ctx => {
                const { event, message } = ctx.data;

                if (event === "create") {
                    setMessages(prevMessages => [message, ...prevMessages]);
                    scrollToBottom();
                } else if (event === "update") {
                    setMessages(prevMessages => prevMessages.map(msg => (msg.id === message.id ? message : msg)));
                } else if (event === "delete") {
                    setMessages(prevMessages => prevMessages.filter(msg => msg.id !== message.id));
                }
            });

            subscription.subscribe();
            centrifuge.connect();

            return () => {
                subscription.unsubscribe();
                centrifuge.disconnect();
            };
        }
    }, []);

    useEffect(() => {
        fetchMessages(page);
    }, [page]);

    useEffect(() => {
        const observerCallback = entries => {
            if (entries[0].isIntersecting && hasMore) {
                setPage(prevPage => prevPage + 1);
            }
        };
        observer.current = new IntersectionObserver(observerCallback);
        if (chatStartRef.current) {
            observer.current.observe(chatStartRef.current);
        }
        return () => observer.current.disconnect();
    }, [hasMore]);

    useEffect(() => {
        if (messages.length === 0) {
            setIsEmpty(true);
        } else {
            setIsEmpty(false);
        }
    }, [messages]);

    return (
        <>
            <Helmet>
                <title>{chatInfo?.title}</title>
            </Helmet>
            <HeaderChat chat={chatInfo} selectedMessage={selectedMessage} setSelectedMessage={setSelectedMessage} />
            <form className={`form ${theme}`} action="/">
                <div className="form__input-container">
                    <input
                        className="form__input"
                        placeholder="Введите сообщение"
                        type="text"
                        autoComplete="off"
                        ref={inputRef}
                    />
                    <button className="form__send-btn icon" onClick={handleSending}>
                        <SendIcon />
                    </button>
                </div>
                <div className="form__bottom-spacer"></div>
            </form>
            <div className="messages" ref={containerRef}>
                <div ref={chatEndRef} />
                {messages?.map(msg => {
                    return (
                        <Message
                            key={msg.id}
                            user={user}
                            msg={msg}
                            selectedMessage={selectedMessage}
                            setSelectedMessage={setSelectedMessage}
                        />
                    );
                })}
                <div ref={chatStartRef} />
            </div>
            <div className="bg"></div>
            {isEmpty && <div className="empty-chat">Нет сообщений</div>}
        </>
    );
};
