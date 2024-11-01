import React, { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { NewChatModal } from "../../components/NewChatModal";
import { ChatStatus } from "../../components/ChatStatus";
import { HeaderChatlist } from "../../components/HeaderChatlist";
import { Helmet } from "react-helmet-async";
import PersonIcon from "@mui/icons-material/Person";
import "./Chatlist.scss";
import { Link } from "react-router-dom";

export const Chatlist = ({ chatListArr, handleToggleModal, isModalOpen, createNewChat }) => {
    const { theme } = useContext(ThemeContext);

    return (
        <>
            <Helmet>
                <title>Список чатов</title>
            </Helmet>
            <HeaderChatlist handleToggleModal={handleToggleModal} />
            <div className={`content content_chatlist ${theme}`}>
                <div className="chatlist">
                    {[...chatListArr]
                        .sort((a, b) => b.creationDate - a.creationDate)
                        .map(obj => {
                            let hours;
                            let minutes;
                            let lastMsg = "Нет сообщений";

                            if (obj.messages.length > 0) {
                                const creationDate = new Date(obj.messages.at(-1).createdAt);
                                hours = String(creationDate.getHours()).padStart(2, "0");
                                minutes = String(creationDate.getMinutes()).padStart(2, "0");
                                lastMsg = obj.messages.at(-1).message;
                            }

                            return (
                                <Link to={`/chat/${obj.id}`} key={obj.id} className="chatlist__link">
                                    <div className="chatlist__element">
                                        <div className="chatlist__avatar">
                                            <span className="icon chatlist__photo">
                                                <PersonIcon />
                                            </span>
                                        </div>
                                        <div className="chatlist__text-container">
                                            <p className="chatlist__name">{obj.companionName}</p>
                                            <p className="chatlist__last-msg">{lastMsg}</p>
                                        </div>
                                        {obj.messages.length > 0 && (
                                            <div className="chatlist__info">
                                                <p className="chatlist__sent-at">
                                                    {hours}:{minutes}
                                                </p>
                                                <ChatStatus obj={obj} />
                                            </div>
                                        )}
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
