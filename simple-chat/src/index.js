import "./index.css";

const form = document.querySelector("form");
const input = document.querySelector(".form-input");

const messageTemplate = obj => {
    return `
    <div class="message">
        <p class="message__text">${obj.message}</p>
        <div class="message__info">
            <p class="message__time">${obj.author}</p>
            <p class="message__time">${obj.createdAt}</p>
            <span class="material-symbols-outlined message__arrows"> done_all </span>
        </div>
    </div>
    `;
};

let messagesToRender = [];

if (localStorage.messageArr) {
    messagesToRender = JSON.parse(localStorage.getItem("messageArr"));
}

form.addEventListener("submit", handleSubmit);
form.addEventListener("keypress", handleKeyPress);

function handleSubmit(event) {
    event.preventDefault();
    if (input.value) {
        const date = new Date();
        messagesToRender.push({
            message: input.value,
            createdAt: String(date.getHours()).padStart(2, "0") + ":" + String(date.getMinutes()).padStart(2, "0"),
            author: "Алексей",
        });
        localStorage.setItem("messageArr", JSON.stringify(messagesToRender));
        input.value = "";
        render();
    }
}

function handleKeyPress(event) {
    if (event.keyCode === 13) {
        form.dispatchEvent(new Event("submit"));
    }
}

function render() {
    document.querySelector(".messages").innerHTML = messagesToRender.map(messageTemplate).reverse().join("");
}

render();