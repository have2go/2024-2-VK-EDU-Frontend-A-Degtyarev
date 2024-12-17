import { Link } from "react-router-dom";
import { ThemeSwitch } from "../ThemeSwitch";

import PersonIcon from "@mui/icons-material/Person";
import TranslateIcon from "@mui/icons-material/Translate";
import "./SideContent.scss";

export const SideContent = () => {
    return (
        <div className="sidecontent">
            <div className="sidecontent__links">
                <Link to={"/profile"} className="sidecontent__link">
                    <span className="icon sidecontent__avatar">
                        <PersonIcon />
                    </span>
                </Link>
                <Link to={"/translate"} className="sidecontent__link">
                    <span className="icon sidecontent__avatar">
                        <TranslateIcon />
                    </span>
                </Link>
            </div>

            <ThemeSwitch />
        </div>
    );
};
