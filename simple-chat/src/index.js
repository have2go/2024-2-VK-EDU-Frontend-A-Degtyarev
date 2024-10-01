import "./index.css";

const form = document.querySelector("form");
const input = document.querySelector(".form__input");
const messages = document.querySelector(".messages");
const testBtn = document.querySelector(".test-button");

const months = [
    "января",
    "февраля",
    "марта",
    "апреля",
    "мая",
    "июня",
    "июля",
    "августа",
    "сентября",
    "октября",
    "ноября",
    "декабря",
];

const MESSAGE_LIST_KEY = "messageArr";
const USER = "Alex";

let messagesToRender = [];
let newMessages = [];

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

if (localStorage.messageArr) {
    messagesToRender = JSON.parse(localStorage.getItem(MESSAGE_LIST_KEY));
}

form.addEventListener("submit", handleSubmit);

testBtn.onclick = () => sendTestMessage();
function sendTestMessage() {
    const date = new Date();
    newMessages.push({
        message: "Тестовое сообщение",
        createdAt: date,
        author: "Bob",
    });
}

function handleSubmit(event) {
    event.preventDefault();
    sendMessage();
}

function sendMessage() {
    if (input.value) {
        const date = new Date();
        messagesToRender.push({
            message: input.value,
            createdAt: date,
            author: USER,
        });
        localStorage.setItem(MESSAGE_LIST_KEY, JSON.stringify(messagesToRender));
        input.value = "";
        render();
        messages.scrollTo({
            top: 0,
        });
    }
}

setInterval(() => {
    if (newMessages.length > 0) {
        messagesToRender.push(...newMessages);
        newMessages = [];
        const sortedMessages = messagesToRender.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        localStorage.setItem(MESSAGE_LIST_KEY, JSON.stringify(sortedMessages));
        render();
    }
}, 500);

function render() {
    document.querySelector(".messages").innerHTML = messagesToRender.map(messageTemplate).reverse().join("");
}

render();
// localStorage.clear();
