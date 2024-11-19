import React from "react";
import { Link } from "react-router-dom";
import { ThemeSwitch } from "../ThemeSwitch";

import PersonIcon from "@mui/icons-material/Person";
import LoginIcon from '@mui/icons-material/Login';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import "./SideContent.scss";

export const SideContent = () => {
    return (
        <div className="sidecontent">
            <div className="sidecontent__links">
                <Link to={"/register"} className="sidecontent__profile-link">
                    <span className="icon sidecontent__avatar">
                        <AssignmentIndIcon />
                    </span>
                </Link>
                <Link to={"/login"} className="sidecontent__profile-link">
                    <span className="icon sidecontent__avatar">
                        <LoginIcon />
                    </span>
                </Link>
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
