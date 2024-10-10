import "./globals.css";
import "./index.css";
import { elementTemplate, sampleUsers } from "./utils/constants";

const chatList = document.querySelector(".chatlist");
const newChatModal = document.querySelector(".newchat");
const openModalBtn = document.querySelector(".new-msg");
const closeModalBtn = document.querySelector(".newchat__close-btn");
const submitCreationBtn = document.querySelector(".newchat__submit-btn");
const nameInput = document.querySelector(".newchat__name");

let chatListArr = JSON.parse(localStorage.getItem("chatListArr")) || sampleUsers;

if (!JSON.parse(localStorage.getItem("chatListArr"))) localStorage.setItem("chatListArr", JSON.stringify(chatListArr));

// если создали новый чат, но ничего в нём не написали - при возвращении к списку чатов удалим его
if (chatListArr.at(-1).messages.length === 0) {
    chatListArr.pop();
    localStorage.setItem("chatListArr", JSON.stringify(chatListArr));
}

openModalBtn.onclick = function () {
    newChatModal.classList.add("newchat_active");
};

closeModalBtn.onclick = function (e) {
    e.preventDefault();
    newChatModal.classList.remove("newchat_active");
};

submitCreationBtn.onclick = submitCreation;

function submitCreation(e) {
    e.preventDefault();

    if (!nameInput.value.trim()) {
        return;
    }

    createNewChat(nameInput.value);
}

function createNewChat(name) {
    const id = generateUniqueId();
    chatListArr.push({
        id: id,
        companionName: name,
        quantityNew: 0,
        isRead: false,
        isMentioned: false,
        messages: [],
    });
    localStorage.setItem("chatListArr", JSON.stringify(chatListArr));
    window.location.href = `./chat.html?chat_id=${id}`;
}

function generateUniqueId() {
    let id;
    let isUnique = false;

    while (!isUnique) {
        id = Math.floor(Math.random() * 10000);
        isUnique = !chatListArr.some(chat => chat.id === id);
    }

    return id;
}

function render() {
    chatList.innerHTML = chatListArr.map(elementTemplate).join("");
}

render();
