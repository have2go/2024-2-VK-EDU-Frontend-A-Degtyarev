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

export const Chatlist = ({ handleToggleModal, isModalOpen, createNewChat }) => {
    const [chats, setChats] = useState(null);

    const { theme } = useContext(ThemeContext);
    const user = useContext(UserContext);
    // console.log("CONTEXT", user.data);
    // console.log("STATE", chats);
    const navigate = useNavigate();

    useEffect(() => {
        if (user.tokens.access) {
            fetch("https://vkedu-fullstack-div2.ru/api/chats/", {
                headers: {
                    Authorization: `Bearer ${user.tokens.access}`,
                    "Content-Type": "application/json",
                },
            })
                .then(response => (response.ok ? response.json() : Promise.reject(response)))
                .then(json => setChats(json))
                .catch(console.error);
        } else {
            if (localStorage.getItem("tokens")) {
                const tokens = JSON.parse(localStorage.getItem("tokens"));
                console.log(123);
                fetch("https://vkedu-fullstack-div2.ru/api/auth/refresh/", {
                    method: "POST",
                    body: JSON.stringify({
                        refresh: tokens.refresh,
                    }),
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                    .then(response => (response.ok ? response.json() : Promise.reject(response)))
                    .then(json => {
                        user.login(json.access, json.refresh);
                        fetch("https://vkedu-fullstack-div2.ru/api/chats/", {
                            headers: {
                                Authorization: `Bearer ${json.access}`,
                                "Content-Type": "application/json",
                            },
                        })
                            .then(response => (response.ok ? response.json() : Promise.reject(response)))
                            .then(json => setChats(json))
                            .catch(console.error);
                    })

                    .catch(console.error);
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
                    {chats?.results.map(chat => {
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
                                            {chat.last_message.text || "Нет сообщений"}
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
