import { useCurrentUserStore } from "../../store/store";

import CheckIcon from "@mui/icons-material/Check";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import "./ChatStatus.scss";

export const ChatStatus = ({ lastMsg }) => {
    const { userData } = useCurrentUserStore();

    return userData.id === lastMsg.sender.id ? (
        lastMsg.was_read_by.length > 0 ? (
            <span className={` icon chatstatus__icon `}>
                <DoneAllIcon />
            </span>
        ) : (
            <span className={` icon chatstatus__icon `}>
                <CheckIcon />
            </span>
        )
    ) : (
        ""
    );
};
