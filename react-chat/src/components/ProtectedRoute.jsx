import { Navigate } from "react-router-dom";
import { useCurrentUserStore } from "../store/store";

const ProtectedRoute = ({ children }) => {
    const { tokens } = useCurrentUserStore();

    if (!tokens?.access && !localStorage.getItem("tokens")) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;
