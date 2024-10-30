import React from "react";
import { SideContent } from "../SideContent";
import "./SidebarBurger.scss";

export const SidebarBurger = ({ toggleMenu, isMenuOpen }) => {
    return (
        <>
            <div
                className={`sidebar-burger__overlay ${isMenuOpen ? "sidebar-burger__overlay_active" : ""}`}
                onClick={toggleMenu}
            ></div>
            <div className={`sidebar-burger ${isMenuOpen ? "sidebar-burger_open" : ""}`}>
                <SideContent />
            </div>
        </>
    );
};
