import "./globals.css";
import "./chat.css";
import { months } from "./utils/constants";

const form = document.querySelector("form");
const input = document.querySelector(".form__input");
const messages = document.querySelector(".messages");
const testBtn = document.querySelector(".test-button");
const companionName = document.querySelector(".info__name");

const CHAT_LIST_KEY = "chatListArr";
const USER = "Alex";

const chatId = Number(new URLSearchParams(window.location.search).get("chat_id"));

let chatListArr = JSON.parse(localStorage.chatListArr);
let newMessages = [];

const curentChatIndex = chatListArr.findIndex(chat => chat.id === chatId);

companionName.textContent = chatListArr[curentChatIndex].companionName;

const messageTemplate = obj => {
    const creationDate = new Date(obj.createdAt);

    const day = String(creationDate.getDate()).padStart(2, "0");
    const month = months[creationDate.getMonth()];
    const year = creationDate.getFullYear();
    const hours = String(creationDate.getHours()).padStart(2, "0");
    const minutes = String(creationDate.getMinutes()).padStart(2, "0");
    const seconds = String(creationDate.getSeconds()).padStart(2, "0");

    return `
    <div class="message ${obj.author === USER ? "" : "message_incoming"}">
        <p class="message__text">${obj.message}</p>
        <div class="message__info tooltip">
        <span class="tooltiptext">${day} ${month} ${year}г., ${hours}:${minutes}:${seconds}</span>
            <p class="message__time">${hours + ":" + minutes}</p>
            <span class="material-symbols-outlined message__arrows ${
                obj.author === USER ? "" : "message__arrows_incoming"
            }"> done_all </span>
        </div>
    </div>
    `;
};

form.addEventListener("submit", handleSubmit);

testBtn.onclick = () => sendTestMessage();

function sendTestMessage() {
    const date = new Date();
    newMessages.push({
        message: "Тестовое сообщение",
        createdAt: date,
        author: chatListArr[curentChatIndex].companionName,
    });
    chatListArr[curentChatIndex].quantityNew += 1;
}

function handleSubmit(event) {
    event.preventDefault();
    sendMessage();
}

function sendMessage() {
    if (input.value) {
        const date = new Date();
        chatListArr[curentChatIndex].messages.push({
            message: input.value,
            createdAt: date,
            author: USER,
        });
        localStorage.setItem(CHAT_LIST_KEY, JSON.stringify(chatListArr));
        input.value = "";
        render();
        messages.scrollTo({
            top: 0,
        });
    }
}

setInterval(() => {
    if (newMessages.length > 0) {
        chatListArr[curentChatIndex].messages.push(...newMessages);
        newMessages = [];
        chatListArr[curentChatIndex].messages = chatListArr[curentChatIndex].messages.sort(
            (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
        );
        localStorage.setItem(CHAT_LIST_KEY, JSON.stringify(chatListArr));
        render();
    }
}, 500);

function render() {
    document.querySelector(".messages").innerHTML = chatListArr[curentChatIndex].messages
        .map(messageTemplate)
        .reverse()
        .join("");
}

render();
// localStorage.clear();
