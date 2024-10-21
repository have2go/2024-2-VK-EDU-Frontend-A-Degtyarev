import { useEffect, useState, useContext } from "react";
import { ThemeContext } from "./context/ThemeContext";
import "./App.scss";
import Chatlist from "./components/Chatlist/Chatlist";
import Chat from "./components/Chat/Chat";
import Header from "./components/Header/Header";
import NewChatModal from "./components/NewChatModal/NewChatModal";

function App() {
    const { theme, setTheme } = useContext(ThemeContext);

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
        if (savedChats) {
            setChatListArr(JSON.parse(savedChats));
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
    }, [theme]);

    return (
        <div className={`container`}>
            <button
                style={{ zIndex: 999, position: "fixed" }}
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
                CHANGE THEME
            </button>
            <Header
                chatListArr={chatListArr}
                handleToggleModal={handleToggleModal}
                currentPage={currentPage}
                currentChat={currentChat}
                setCurrentPage={setCurrentPage}
                setChatListArr={setChatListArr}
            />
            {currentPage === "chatlist" && (
                <Chatlist chatListArr={chatListArr} handleChatChoosing={handleChatChoosing} />
            )}
            {currentPage === "chat" && (
                <Chat currentChat={currentChat} chatListArr={chatListArr} setChatListArr={setChatListArr} />
            )}
            <NewChatModal
                isModalOpen={isModalOpen}
                handleToggleModal={handleToggleModal}
                createNewChat={createNewChat}
            />
        </div>
    );
}

export default App;
