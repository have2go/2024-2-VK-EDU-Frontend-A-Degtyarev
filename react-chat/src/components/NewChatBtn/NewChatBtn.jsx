import EditIcon from "@mui/icons-material/Edit";

import "./NewChatBtn.scss";

export const NewChatBtn = ({ handleToggleModal }) => {
    return (
        <button className="new-msg" onClick={handleToggleModal}>
            <span className="icon new-msg__symbol">
                <EditIcon sx={{ fontSize: 26 }} />
            </span>
        </button>
    );
};
