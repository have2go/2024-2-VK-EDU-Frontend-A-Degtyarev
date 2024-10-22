import { useEffect, useState, useContext } from "react";
import { ThemeContext } from "./context/ThemeContext";
import { ChatList } from "./pages/Chatlist";
import { Chat } from "./pages/Chat";
import "./App.scss";

function App() {
    const { theme, setTheme } = useContext(ThemeContext);

    const THEME_KEY = "theme";
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
        };
        setChatListArr([...chatListArr, newChat]);
        setCurrentChat(newChat);
        setCurrentPage("chat");
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

    const handleChatChoosing = id => {
        const index = chatListArr.findIndex(chat => chat.id === id);
        setCurrentChat(chatListArr[index]);
        setCurrentPage("chat");
    };

    useEffect(() => {
        const savedChats = localStorage.getItem(CHAT_LIST_KEY);
        const savedTheme = localStorage.getItem(THEME_KEY);
        if (savedChats) {
            setChatListArr(JSON.parse(savedChats));
        }
        if (savedTheme && savedTheme !== theme) {
            setTheme(savedTheme);
        }
    }, []);

    useEffect(() => {
        if (chatListArr.length > 0) {
            localStorage.setItem(CHAT_LIST_KEY, JSON.stringify(chatListArr));
        }
    }, [chatListArr]);

    useEffect(() => {
        const body = document.querySelector("body");
        if (body.className !== "") body.className = "";
        body.classList.add(theme);
        localStorage.setItem(THEME_KEY, theme);
    }, [theme]);

    return (
        <div className={`container`}>
            <button
                style={{ zIndex: 999, position: "fixed" }}
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
                CHANGE THEME
            </button>
            {currentPage === "chatlist" && (
                <ChatList
                    chatListArr={chatListArr}
                    handleChatChoosing={handleChatChoosing}
                    handleToggleModal={handleToggleModal}
                    isModalOpen={isModalOpen}
                    createNewChat={createNewChat}
                />
            )}
            {currentPage === "chat" && (
                <Chat
                    currentChat={currentChat}
                    chatListArr={chatListArr}
                    setChatListArr={setChatListArr}
                    setCurrentPage={setCurrentPage}
                />
            )}
        </div>
    );
}

export default App;
