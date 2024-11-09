import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

const ProtectedRoute = ({ children, chatListArr }) => {
    const { id } = useParams();
    const navigate = useNavigate();

    // const chat =
    //     chatListArr.length === 0
    //         ? JSON.parse(localStorage.getItem("chatListArr")).find(chat => chat.id.toString() === id)
    //         : chatListArr.find(chat => chat.id.toString() === id);

    // useEffect(() => {
    //     if (!chat) {
    //         navigate("/404");
    //     }
    // }, [id]);

    return true ? children : null; 
};

export default ProtectedRoute;
