import React, { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";

import "./Chatlist.scss";
import PersonIcon from "@mui/icons-material/Person";
import ChatStatus from "../ChatStatus/ChatStatus";

const Chatlist = ({ chatListArr, handleChatChoosing }) => {
    const { theme, setTheme } = useContext(ThemeContext);
    return (
        <>
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
        </>
    );
};

export default Chatlist;
