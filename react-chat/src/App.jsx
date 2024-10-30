import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { ChatList } from "./pages/Chatlist";
import { Chat } from "./pages/Chat";
import "./App.scss";
import { NotFound } from "./pages/NotFound";
import { Profile } from "./pages/Profile";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
    const navigate = useNavigate();

    const CHAT_LIST_KEY = "chatListArr";
    const [currentPage, setCurrentPage] = useState("chatlist");
    const [chatListArr, setChatListArr] = useState([]);
    const [currentChat, setCurrentChat] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);

    const createNewChat = name => {
        const id = generateUniqueId();
        const newChat = {
            id: id,
            companionName: name,
            quantityNew: 0,
            isRead: false,
            isMentioned: false,
            messages: [],
            creationDate: Date.now(),
        };
        setChatListArr([...chatListArr, newChat]);
        navigate(`/chat/${id}`);
    };

    const generateUniqueId = () => {
        let id;
        let isUnique = false;

        while (!isUnique) {
            id = Math.floor(Math.random() * 10000);
            isUnique = !chatListArr.some(chat => chat.id === id);
        }

        return id;
    };

    const handleToggleModal = e => {
        setIsModalOpen(!isModalOpen);
    };

    useEffect(() => {
        const savedChats = localStorage.getItem(CHAT_LIST_KEY);
        if (savedChats && savedChats !== "[]") {
            setChatListArr(JSON.parse(savedChats));
        }
    }, []);

    useEffect(() => {
        if (chatListArr.length > 0) {
            localStorage.setItem(CHAT_LIST_KEY, JSON.stringify(chatListArr));
        }
    }, [chatListArr]);

    return (
        <div className={`container`}>
            <Routes>
                <Route
                    path="/"
                    element={
                        <ChatList
                            chatListArr={chatListArr}
                            handleToggleModal={handleToggleModal}
                            isModalOpen={isModalOpen}
                            createNewChat={createNewChat}
                        />
                    }
                />
                <Route
                    path="/chat/:id"
                    element={
                        <ProtectedRoute chatListArr={chatListArr}>
                            <Chat
                                currentChat={currentChat}
                                chatListArr={chatListArr}
                                setChatListArr={setChatListArr}
                                setCurrentPage={setCurrentPage}
                            />
                        </ProtectedRoute>
                    }
                />
                <Route path="/profile" element={<Profile />} />
                <Route path="/404" element={<NotFound />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </div>
    );
}

export default App;
