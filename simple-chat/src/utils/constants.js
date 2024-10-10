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

export const sampleUsers = [
    {
        id: 1111,
        companionName: "Иван Иванов",
        quantityNew: 150,
        isRead: false,
        isMentioned: false,
        messages: [
            {
                message: "Отправлено, не прочитано",
                createdAt: "2024-10-08T12:46:45.772Z",
                author: "Alex",
            },
        ],
    },
    {
        id: 2222,
        companionName: "Очень длиииииииииииииииииинное имя",
        quantityNew: 23,
        isRead: true,
        isMentioned: false,
        messages: [
            {
                message: "Отправлено, прочитано",
                createdAt: "2024-10-08T14:06:45.772Z",
                author: "Alex",
            },
        ],
    },
    {
        id: 3333,
        companionName: "Олег Олегович",
        quantityNew: 0,
        isRead: true,
        isMentioned: false,
        messages: [
            {
                message: "Прочитанное входящее",
                createdAt: "2024-10-08T10:33:45.772Z",
                author: "Олег Олегович",
            },
        ],
    },
    {
        id: 4444,
        companionName: "Тест Тестов",
        quantityNew: 150,
        isRead: false,
        isMentioned: true,
        messages: [
            {
                message: "99+ новых с упоминанием",
                createdAt: "2024-10-08T10:33:45.772Z",
                author: "Тест Тестов",
            },
        ],
    },
    {
        id: 5555,
        companionName: "12345",
        quantityNew: 3,
        isRead: false,
        isMentioned: false,
        messages: [
            {
                message: "Просто непрочитанные",
                createdAt: "2024-10-08T10:33:45.772Z",
                author: "12345",
            },
        ],
    },
    // {
    //     name: "Петр Петров",
    //     lastMsg: "1232343545657645671231231231123321",
    //     sentAt: "05:13",
    //     sentBy: "Петр Петров",
    //     quantityNew: 23,
    //     isRead: false,
    //     isMentioned: true,
    // },
    // {
    //     name: "Андрей Андреев",
    //     lastMsg: "абвгд",
    //     sentAt: "21:30",
    //     sentBy: "Андрей Андреев",
    //     quantityNew: 122,
    //     isRead: false,
    //     isMentioned: false,
    // },
    // {
    //     name: "Дмитрий Дмитриевич",
    //     lastMsg: "23",
    //     sentAt: "20:21",
    //     sentBy: "Дмитрий Дмитриевич",
    //     quantityNew: 0,
    //     isRead: true,
    //     isMentioned: false,
    // },
    // {
    //     name: "Антон Антонович Антонов",
    //     lastMsg: "12323132312312312313123211231312323132",
    //     sentAt: "08:54",
    //     sentBy: "Антон Антонович Антонов",
    //     quantityNew: 5673,
    //     isRead: false,
    //     isMentioned: true,
    // },
    // {
    //     name: "Иван Иванов",
    //     lastMsg: "ТестТестТест",
    //     sentAt: "12:13",
    //     sentBy: "Иван Иванов",
    //     quantityNew: 0,
    //     isRead: true,
    //     isMentioned: false,
    // },
    // {
    //     name: "Андрей Андреев",
    //     lastMsg: "абвгд",
    //     sentAt: "21:30",
    //     sentBy: "Андрей Андреев",
    //     quantityNew: 122,
    //     isRead: false,
    //     isMentioned: false,
    // },
];
