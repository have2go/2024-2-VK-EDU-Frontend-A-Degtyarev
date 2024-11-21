import React, { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { UserContext } from "../../context/UserContext";
import { NewChatModal } from "../../components/NewChatModal";
import { ChatStatus } from "../../components/ChatStatus";
import { HeaderChatlist } from "../../components/HeaderChatlist";
import { Helmet } from "react-helmet-async";
import PersonIcon from "@mui/icons-material/Person";
import "./Chatlist.scss";
import { Link, useNavigate } from "react-router-dom";
import { Centrifuge } from "centrifuge";
import { getChats, refreshTokens } from "../../api/api";

export const Chatlist = ({ handleToggleModal, isModalOpen, createNewChat }) => {
    const [chats, setChats] = useState(null);

    const { theme } = useContext(ThemeContext);
    const user = useContext(UserContext);

    const navigate = useNavigate();

    useEffect(() => {
        if (user.tokens.access) {
            getChats(user.tokens.access)
                .then(json => setChats(json))
                .catch(err => console.log(err));
        } else {
            if (localStorage.getItem("tokens")) {
                const tokens = JSON.parse(localStorage.getItem("tokens"));

                refreshTokens(tokens.refresh)
                    .then(json => {
                        user.login(json.access, json.refresh);
                        getChats(json.access)
                            .then(json => setChats(json))
                            .catch(err => console.log(err));
                    })
                    .catch(err => console.log(err));
            } else {
                navigate("/login");
            }
        }
    }, []);

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
