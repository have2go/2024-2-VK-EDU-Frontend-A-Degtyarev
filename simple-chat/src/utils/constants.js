export const months = [
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

const chatStatus = obj =>
    obj.messages.at(-1).author === obj.companionName
        ? obj.isRead
            ? ``
            : obj.quantityNew > 99
            ? `<div class="chatlist__quantity">${
                  obj.isMentioned ? `<span style="font-size: 16px;">@</span>` : ""
              }99</div>`
            : `<div class="chatlist__quantity">${obj.isMentioned ? `<span style="font-size: 16px">@</span>` : ""}${
                  obj.quantityNew
              }</div>`
        : obj.isRead
        ? `<span class="material-symbols-outlined" style="font-size: 26px">
                done_all
            </span>`
        : `<span class="material-symbols-outlined" style="font-size: 26px">
                check
            </span>`;

export const elementTemplate = obj => {
    const creationDate = new Date(obj.messages.at(-1).createdAt);
    const hours = String(creationDate.getHours()).padStart(2, "0");
    const minutes = String(creationDate.getMinutes()).padStart(2, "0");

    return `<a class="chatlist__link" href="./chat.html?chat_id=${obj.id}">
        <div class="chatlist__element">
            <div class="chatlist__avatar">
                <span class="material-symbols-outlined" style="font-size: 50px">
                    account_circle
                </span>
            </div>
            <div class="chatlist__text-container">
                <p class="chatlist__name">${obj.companionName}</p>
                <p class="chatlist__last-msg">${obj.messages.at(-1).message}</p>
            </div>
            <div class="chatlist__info">
                <p class="chatlist__sent-at">${hours}:${minutes}</p>
                ${chatStatus(obj)}
            </div>
        </div>
    </a>`;
};