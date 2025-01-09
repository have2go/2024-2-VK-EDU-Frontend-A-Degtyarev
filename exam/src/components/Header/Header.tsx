import { useLocation, Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import "./Header.scss";

export const Header: React.FC = () => {
    const location = useLocation();

    return (
        <header className="header">
            {location.pathname === "/history" && (
                <Link to={"/"} className="header__back-link">
                    <ArrowBackIcon sx={{ fontSize: 30 }} />
                </Link>
            )}
            <h1 className="header__title">{location.pathname === "/" ? "VK Translate" : "История"}</h1>
        </header>
    );
};
