import "../globals.css";
import "./chatList.css";

const USER = "Алексей Дегтярев";

const chatList = document.querySelector(".chatlist");

const elementTemplate = obj =>
    `<a class="chatlist__link" href="/chat/chat.html">
        <div class="chatlist__element">
            <div class="chatlist__avatar">
                <span class="material-symbols-outlined" style="font-size: 50px">
                    account_circle
                </span>
            </div>
            <div class="chatlist__text-container">
                <p class="chatlist__name">${obj.name}</p>
                <p class="chatlist__last-msg">${obj.lastMsg}</p>
            </div>
            <div class="chatlist__info">
                <p class="chatlist__sent-at">${obj.sentAt}</p>
                ${
                    obj.sentBy === USER
                        ? obj.isRead
                            ? `<span class="material-symbols-outlined" style="font-size: 26px">
                            done_all
                        </span>`
                            : `<span class="material-symbols-outlined" style="font-size: 26px">
                            check
                        </span>`
                        : obj.isRead
                        ? ``
                        : obj.quantityNew > 99
                        ? `<div class="chatlist__quantity">${
                              obj.isMentioned ? `<span style="font-size: 16px;">@</span>` : ""
                          }99</div>`
                        : `<div class="chatlist__quantity">${
                              obj.isMentioned ? `<span style="font-size: 16px">@</span>` : ""
                          }${obj.quantityNew}</div>`
                }
            </div>
        </div>
    </a>`;

const sampleUsers = [
    {
        name: "Иван Иванов",
        lastMsg: "123437н47823н48971812030938131",
        sentAt: "13:53",
        sentBy: USER,
        quantityNew: 150,
        isRead: true,
        isMentioned: false,
    },
    {
        name: "Очень длиииииииииииииииииинное имя",
        lastMsg: "абвгд",
        sentAt: "12:13",
        sentBy: USER,
        quantityNew: 23,
        isRead: false,
        isMentioned: false,
    },
    {
        name: "Иван Иванов",
        lastMsg: "ТестТестТест",
        sentAt: "12:13",
        sentBy: "Иван Иванов",
        quantityNew: 0,
        isRead: true,
        isMentioned: false,
    },
    {
        name: "Петр Петров",
        lastMsg: "1232343545657645671231231231123321",
        sentAt: "05:13",
        sentBy: "Петр Петров",
        quantityNew: 23,
        isRead: false,
        isMentioned: true,
    },
    {
        name: "Андрей Андреев",
        lastMsg: "абвгд",
        sentAt: "21:30",
        sentBy: "Андрей Андреев",
        quantityNew: 122,
        isRead: false,
        isMentioned: false,
    },
    {
        name: "Дмитрий Дмитриевич",
        lastMsg: "23",
        sentAt: "20:21",
        sentBy: "Дмитрий Дмитриевич",
        quantityNew: 0,
        isRead: true,
        isMentioned: false,
    },
    {
        name: "Антон Антонович Антонов",
        lastMsg: "12323132312312312313123211231312323132",
        sentAt: "08:54",
        sentBy: "Антон Антонович Антонов",
        quantityNew: 5673,
        isRead: false,
        isMentioned: true,
    },
    {
        name: "Иван Иванов",
        lastMsg: "ТестТестТест",
        sentAt: "12:13",
        sentBy: "Иван Иванов",
        quantityNew: 0,
        isRead: true,
        isMentioned: false,
    },
    {
        name: "Андрей Андреев",
        lastMsg: "абвгд",
        sentAt: "21:30",
        sentBy: "Андрей Андреев",
        quantityNew: 122,
        isRead: false,
        isMentioned: false,
    },
];

chatList.innerHTML = sampleUsers.map(elementTemplate).join("");
