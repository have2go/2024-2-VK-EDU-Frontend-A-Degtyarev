import React, { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import CheckIcon from "@mui/icons-material/Check";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import "./ChatStatus.scss";

export const ChatStatus = ({ obj }) => {
    const { theme } = useContext(ThemeContext);

    return obj.messages.at(-1).author === obj.companionName ? (
        obj.isRead ? (
            ``
        ) : obj.quantityNew > 99 ? (
            <div className={`chatstatus__quantity ${theme}`}>{obj.isMentioned ? <span>@</span> : ""}99</div>
        ) : (
            <div className={`chatstatus__quantity ${theme}`}>
                {obj.isMentioned ? <span>@</span> : ""}
                {obj.quantityNew}
            </div>
        )
    ) : obj.isRead ? (
        <span className={`${theme} icon chatstatus__icon `}>
            <DoneAllIcon />
        </span>
    ) : (
        <span className={`${theme} icon chatstatus__icon `}>
            <CheckIcon />
        </span>
    );
};
