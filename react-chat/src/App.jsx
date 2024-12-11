import { useEffect, useState, useRef, useContext } from "react";
import { Routes, Route } from "react-router-dom";
import { ChatList } from "./pages/Chatlist";
import { Chat } from "./pages/Chat";
import { ThemeContext } from "./context/ThemeContext";
import "./App.scss";
import { NotFound } from "./pages/NotFound";
import { Profile } from "./pages/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import { Centrifuge } from "centrifuge";
import { useCurrentUserStore, useMessagesStore, useChatsStore } from "./store/store";
import { connectCentrifuge, subscribeCentrifuge } from "./api/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
    const isConnected = useRef(false);

    const { theme } = useContext(ThemeContext);
    const { userData, tokens } = useCurrentUserStore();
    const { chatId, addMessage, updateMessage, deleteMessage } = useMessagesStore();
    const { fetchChats } = useChatsStore();

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleToggleModal = () => {
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

    useEffect(() => {
        if (userData && tokens && !isConnected.current) {
            const centrifuge = new Centrifuge("wss://vkedu-fullstack-div2.ru/connection/websocket/", {
                getToken: ctx => connectCentrifuge(ctx, tokens.access).then(data => data.token),
            });

            const subscription = centrifuge.newSubscription(userData.id, {
                getToken: ctx => subscribeCentrifuge(ctx, tokens.access).then(data => data.token),
            });

            subscription.on("publication", ctx => {
                const { event, message } = ctx.data;
                console.log(ctx.data);

                if (event === "create") {
                    if (message.chat === chatId) {
                        addMessage(message);
                    } else {
                        fetchChats(tokens.access);
                        // console.log(message);
                        toast(`Новое сообщение от ${message.sender.first_name}`);
                    }
                } else if (event === "update") {
                    if (message.chat === chatId) {
                        updateMessage(message);
                    } else {
                        fetchChats(tokens.access);
                    }
                } else if (event === "delete") {
                    if (message.chat === chatId) {
                        deleteMessage(message);
                    } else {
                        fetchChats(tokens.access);
                    }
                }
            });

            subscription.subscribe();
            centrifuge.connect();

            isConnected.current = true;

            return () => {
                subscription.unsubscribe();
                centrifuge.disconnect();
                isConnected.current = false;
            };
        }
    }, [userData?.id, chatId]);

    return (
        <div className={`container`}>
            <ToastContainer position="top-right" autoClose={5000} closeOnClick theme={theme} style={{ zIndex: 1000 }} />
            <Routes>
                <Route
                    path="/"
                    element={
                        <ProtectedRoute>
                            <ChatList handleToggleModal={handleToggleModal} isModalOpen={isModalOpen} />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/chat/:id"
                    element={
                        <ProtectedRoute>
                            <Chat />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/profile"
                    element={
                        <ProtectedRoute>
                            <Profile />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/register"
                    element={
                        <PublicRoute>
                            <Register />
                        </PublicRoute>
                    }
                />
                <Route
                    path="/login"
                    element={
                        <PublicRoute>
                            <Login />
                        </PublicRoute>
                    }
                />
                <Route path="/404" element={<NotFound />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </div>
    );
}

export default App;
