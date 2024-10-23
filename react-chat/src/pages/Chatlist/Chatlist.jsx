import React, { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { NewChatModal } from "../../components/NewChatModal";
import { ChatStatus } from "../../components/ChatStatus";
import { HeaderChatlist } from "../../components/HeaderChatlist";
import PersonIcon from "@mui/icons-material/Person";
import "./Chatlist.scss";

export const Chatlist = ({ chatListArr, handleChatChoosing, handleToggleModal, isModalOpen, createNewChat }) => {
    const { theme } = useContext(ThemeContext);

    return (
        <>
            <HeaderChatlist handleToggleModal={handleToggleModal} />
            <div className={`content content_chatlist ${theme}`}>
                <div className="chatlist">
                    {chatListArr.map(obj => {
                        const creationDate = new Date(obj.messages.at(-1).createdAt);
                        const hours = String(creationDate.getHours()).padStart(2, "0");
                        const minutes = String(creationDate.getMinutes()).padStart(2, "0");

                        return (
                            <div key={obj.id} className="chatlist__link" onClick={() => handleChatChoosing(obj.id)}>
                                <div className="chatlist__element">
                                    <div className="chatlist__avatar">
                                        <span className="icon chatlist__photo">
                                            <PersonIcon />
                                        </span>
                                    </div>
                                    <div className="chatlist__text-container">
                                        <p className="chatlist__name">{obj.companionName}</p>
                                        <p className="chatlist__last-msg">{obj.messages.at(-1).message}</p>
                                    </div>
                                    <div className="chatlist__info">
                                        <p className="chatlist__sent-at">
                                            {hours}:{minutes}
                                        </p>
                                        <ChatStatus obj={obj} />
                                    </div>
                                </div>
                            </div>
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
