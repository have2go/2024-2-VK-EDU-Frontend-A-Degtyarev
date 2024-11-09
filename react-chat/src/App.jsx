import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { ChatList } from "./pages/Chatlist";
import { Chat } from "./pages/Chat";
import "./App.scss";
import { NotFound } from "./pages/NotFound";
import { Profile } from "./pages/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";

function App() {
    const navigate = useNavigate();

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleToggleModal = e => {
        setIsModalOpen(!isModalOpen);

        const header = document.querySelector(".header");
        const content = document.querySelector(".content");
        const modal = document.querySelector(".newchat");

        if (!isModalOpen) {
            header.setAttribute("inert", "true");
            content.setAttribute("inert", "true");
            modal.removeAttribute("inert");
        } else {
            header.removeAttribute("inert");
            content.removeAttribute("inert");
            modal.setAttribute("inert", "true");
        }
    };

    return (
        <div className={`container`}>
            <Routes>
                <Route
                    path="/"
                    element={<ChatList handleToggleModal={handleToggleModal} isModalOpen={isModalOpen} />}
                />
                <Route
                    path="/chat/:id"
                    element={
                        <ProtectedRoute>
                            <Chat />
                        </ProtectedRoute>
                    }
                />
                <Route path="/profile" element={<Profile />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/404" element={<NotFound />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </div>
    );
}

export default App;
