import { Link } from "react-router-dom";
import { ThemeSwitch } from "../ThemeSwitch";

import PersonIcon from "@mui/icons-material/Person";
import "./SideContent.scss";

export const SideContent = () => {
    return (
        <div className="sidecontent">
            <div className="sidecontent__links">
                <Link to={"/profile"} className="sidecontent__profile-link">
                    <span className="icon sidecontent__avatar">
                        <PersonIcon />
                    </span>
                </Link>
            </div>

            <ThemeSwitch />
        </div>
    );
};
