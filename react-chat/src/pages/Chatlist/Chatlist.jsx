import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { NewChatModal } from "../../components/NewChatModal";
import { ChatStatus } from "../../components/ChatStatus";
import { HeaderChatlist } from "../../components/HeaderChatlist";
import { Helmet } from "react-helmet-async";
import PersonIcon from "@mui/icons-material/Person";
import "./Chatlist.scss";
import { Link, useNavigate } from "react-router-dom";
import { refreshTokens } from "../../api/api";
import { useChatsStore, useCurrentUserStore } from "../../store/store";
import { PuffLoader } from "react-spinners";

export const Chatlist = ({ handleToggleModal, isModalOpen, createNewChat }) => {
    const { chats, fetchChats, setChats } = useChatsStore();
    const { userData, tokens, login, logout } = useCurrentUserStore();

    const [isLoading, setIsLoading] = useState(false);

    const { theme } = useContext(ThemeContext);

    const navigate = useNavigate();

    const loadChats = async () => {
        if (tokens.access) {
            await fetchChats(tokens.access);
            setIsLoading(false);
        } else {
            const tokens = localStorage.getItem("tokens");
            if (tokens) {
                const parsedTokens = JSON.parse(tokens);
                await refreshTokens(parsedTokens.refresh)
                    .then(res => {
                        refreshTokens(res.refresh).then(async res => {
                            await login(res.access, res.refresh);
                            fetchChats(res.access).then(res => setIsLoading(false));
                        });
                    })
                    .catch(err => {
                        localStorage.removeItem("tokens");
                        logout();
                        navigate("/login");
                    });
            } else {
                localStorage.removeItem("tokens");
                logout();
                navigate("/login");
            }
        }
    };

    useLayoutEffect(() => {
        setIsLoading(true);
    }, []);

    useEffect(() => {
        loadChats();
    }, []);

    return (
        <>
            <Helmet>
                <title>Список чатов</title>
            </Helmet>
            <HeaderChatlist handleToggleModal={handleToggleModal} />
            <div className={`content content_chatlist ${theme}`}>
                <div className="chatlist">
                    {isLoading ? (
                        <PuffLoader
                            color={theme === "dark" ? "#cfbff5" : "#5b22b4"}
                            cssOverride={{ margin: "auto" }}
                            size={100}
                        />
                    ) : !chats || chats?.results?.length === 0 ? (
                        <div className="chatlist__empty">
                            Чатов нет
                            <br />
                            <span className="chatlist__empty-text">Попробуй написать кому-нибудь</span>
                        </div>
                    ) : (
                        chats?.results.map(chat => {
                            const lastMsg = chat.last_message;
                            return (
                                <Link to={`/chat/${chat.id}`} key={chat.id} className="chatlist__link">
                                    <div className="chatlist__element">
                                        {chat.avatar ? (
                                            <img className="chatlist__avatar" src={chat.avatar} alt="avatar"></img>
                                        ) : (
                                            <span className="icon chatlist__avatar chatlist__photo">
                                                <PersonIcon />
                                            </span>
                                        )}
                                        <div className="chatlist__text-container">
                                            <p className="chatlist__name">{chat.title}</p>
                                            <p className="chatlist__last-msg">
                                                {lastMsg.voice
                                                    ? "Голосовое сообщение"
                                                    : lastMsg.files.length > 0
                                                    ? lastMsg.files.length === 1
                                                        ? "Изображение"
                                                        : `Изображения (${lastMsg.files.length})`
                                                    : lastMsg.text || "Нет сообщений"}
                                            </p>
                                        </div>
                                        {/* {chat.last_message.text && (
                                            <div className="chatlist__info">
                                                <p className="chatlist__sent-at">
                                                    {hours}:{minutes}
                                                </p>
                                                <ChatStatus obj={obj} />
                                            </div>
                                        )} */}
                                    </div>
                                </Link>
                            );
                        })
                    )}
                </div>
            </div>
            <NewChatModal
                isModalOpen={isModalOpen}
                handleToggleModal={handleToggleModal}
                createNewChat={createNewChat}
            />
        </>
    );
};
