const BASE_URL = "https://vkedu-fullstack-div2.ru/api";

const handleResponse = res => {
    return res.ok ? res.json() : Promise.reject(res);
};

const handleError = res => {
    return res.json().then(json => {
        console.log("Код ошибки: ", res.status);
        console.log("Ответ: ", json.detail || json);
        return Promise.reject(json);
    });
};

// Регистрация и авторизация
export const register = async body => {
    return await fetch(BASE_URL + "/register/", {
        method: "POST",
        body: body,
    })
        .then(handleResponse)
        .catch(handleError);
};

export const auth = async (username, password) => {
    return await fetch(BASE_URL + "/auth/", {
        method: "POST",
        body: JSON.stringify({
            username: username || null,
            password: password || null,
        }),
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then(handleResponse)
        .catch(handleError);
};

export const getUser = async accessToken => {
    return await fetch("https://vkedu-fullstack-div2.ru/api/user/current/", {
        headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
        },
    })
        .then(handleResponse)
        .catch(handleError);
};

// Профиль
export const saveProfile = async (id, accessToken, body) => {
    return await fetch(BASE_URL + `/user/${id}/`, {
        method: "PATCH",
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
        body: body,
    })
        .then(handleResponse)
        .catch(handleError);
};

export const deleteProfile = async (id, accessToken) => {
    return await fetch(BASE_URL + `/user/${id}/`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
        },
    })
        .then(handleResponse)
        .catch(handleError);
};

// Токены
export const refreshTokens = async refreshToken => {
    return await fetch(BASE_URL + "/auth/refresh/", {
        method: "POST",
        body: JSON.stringify({
            refresh: refreshToken,
        }),
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then(handleResponse)
        .catch(handleError);
};

// Список чатов
export const getChats = async accessToken => {
    return await fetch(BASE_URL + "/chats/", {
        headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
        },
    })
        .then(handleResponse)
        .catch(handleError);
};

// Чат
export const getChatInfo = async (id, accessToken) => {
    return await fetch(BASE_URL + `/chat/${id}/`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
        },
    })
        .then(handleResponse)
        .catch(handleError);
};

export const sendMessage = async (id, accessToken, inputValue) => {
    return await fetch(BASE_URL + `/messages/`, {
        method: "POST",
        body: JSON.stringify({
            text: inputValue,
            chat: id,
        }),
        headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
        },
    })
        .then(handleResponse)
        .catch(handleError);
};

export const getMessages = async (id, accessToken, page) => {
    return await fetch(BASE_URL + `/messages/?chat=${id}&page=${page}&page_size=20`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
        },
    })
        .then(handleResponse)
        .catch(handleError);
};

export const sendVoice = async (accessToken, formData) => {
    return await fetch(BASE_URL + "/messages/", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
        body: formData,
    })
        .then(handleResponse)
        .catch(handleError);
};

export const sendGeo = async (id, accessToken, locationUrl) => {
    return await fetch(BASE_URL + `/messages/`, {
        method: "POST",
        body: JSON.stringify({
            text: locationUrl,
            chat: id,
        }),
        headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
        },
    })
        .then(handleResponse)
        .catch(handleError);
};

export const sendImages = async (accessToken, formData) => {
    return await fetch(BASE_URL + `/messages/`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
        body: formData,
    });
};

// Центрифуга
export const connectCentrifuge = async (ctx, accessToken) => {
    return await fetch(BASE_URL + "/centrifugo/connect/", {
        body: JSON.stringify(ctx),
        method: "POST",
        headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
        },
    })
        .then(handleResponse)
        .catch(handleError);
};

export const subscribeCentrifuge = async (ctx, accessToken) => {
    return await fetch(BASE_URL + "/centrifugo/subscribe/", {
        body: JSON.stringify(ctx),
        method: "POST",
        headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
        },
    })
        .then(handleResponse)
        .catch(handleError);
};
