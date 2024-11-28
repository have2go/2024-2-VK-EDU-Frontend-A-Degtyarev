import { Navigate } from "react-router-dom";
import { useCurrentUserStore } from "../store/store";

const PublicRoute = ({ children }) => {
    const { tokens } = useCurrentUserStore();

    if (tokens?.access || localStorage.getItem("tokens")) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default PublicRoute;
