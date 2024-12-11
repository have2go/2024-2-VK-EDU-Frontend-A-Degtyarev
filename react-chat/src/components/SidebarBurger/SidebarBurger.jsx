import { SideContent } from "../SideContent";
import cn from "classnames";
import "./SidebarBurger.scss";

export const SidebarBurger = ({ toggleMenu, isMenuOpen }) => {
    const classes = {
        sidebarBurgerOverlay: cn("sidebar-burger__overlay", { "sidebar-burger__overlay_active": isMenuOpen }),
        sidebarBurger: cn("sidebar-burger", { "sidebar-burger_open": isMenuOpen }),
    };

    return (
        <>
            <div className={classes.sidebarBurgerOverlay} onClick={toggleMenu}></div>
            <div className={classes.sidebarBurger}>
                <SideContent />
            </div>
        </>
    );
};
