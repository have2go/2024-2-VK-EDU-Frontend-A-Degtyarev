import React, { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { NewChatModal } from "../../components/NewChatModal";
import { ChatStatus } from "../../components/ChatStatus";
import { HeaderChatlist } from "../../components/HeaderChatlist";
import { Helmet } from "react-helmet-async";
import PersonIcon from "@mui/icons-material/Person";
import "./Chatlist.scss";
import { Link, useNavigate } from "react-router-dom";
import { Centrifuge } from "centrifuge";
import { getChats, refreshTokens } from "../../api/api";
import { useChatsStore, useCurrentUserStore } from "../../store/store";

export const Chatlist = ({ handleToggleModal, isModalOpen, createNewChat }) => {
    const { chats, fetchChats, setChats } = useChatsStore();
    const { userData, tokens, login } = useCurrentUserStore();
    
    const { theme } = useContext(ThemeContext);

    const navigate = useNavigate();

    const loadChats = async () => {
        if (tokens.access) {
            await fetchChats(tokens.access);
        } else {
            const tokens = localStorage.getItem("tokens");
            if (tokens) {
                try {
                    const parsedTokens = JSON.parse(tokens);
                    const newTokens = await refreshTokens(parsedTokens.refresh);
                    login(newTokens.access, newTokens.refresh);
                    await fetchChats(newTokens.access);
                } catch (err) {
                    console.error(err);
                    navigate("/login");
                }
            } else {
                navigate("/login");
            }
        }
    };

    useEffect(() => {
        loadChats();
    }, [tokens.access, fetchChats, userData, navigate]);

    return (
        <>
            <Helmet>
                <title>Список чатов</title>
            </Helmet>
            <HeaderChatlist handleToggleModal={handleToggleModal} />
            <div className={`content content_chatlist ${theme}`}>
                <div className="chatlist">
                    {(!chats || chats?.results?.length === 0) && (
                        <div className="chatlist__empty">
                            Чатов нет
                            <br />
                            <span className="chatlist__empty-text">Попробуй написать кому-нибудь</span>
                        </div>
                    )}
                    {chats?.results.map(chat => {
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
                    })}
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
