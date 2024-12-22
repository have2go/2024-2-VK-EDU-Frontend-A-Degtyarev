import API from "./api";
import * as T from "./types";

export const getCurrentUser = async (url: string, accessToken?: string) => {
    return await API.get<T.ICurrentUserResponse>(url, undefined, accessToken);
};

export const getUsers = async (url: string, data?: Record<string, any>, accessToken?: string) => {
    return await API.get<T.IUsersResponse>(url, data, accessToken);
};

export const getChats = async (url: string, data?: Record<string, any>, accessToken?: string) => {
    return await API.get<T.IChatsResponse>(url, data, accessToken);
};

export const getChatInfo = async (id: string, accessToken?: string) => {
    return await API.get<T.IChatInfoResponse>(`/chat/${id}/`, undefined, accessToken);
};

export const getMessages = async (accessToken?: string, data?: any) => {
    return await API.get<T.IMessagesResponse>("/messages/", data, accessToken);
};

export const register = async (body: FormData) => {
    return await API.post<T.IRegister>("/register/", body);
};

export const auth = async (username: string, password: string) => {
    return await API.post<{
        access: string;
        refresh: string;
    }>("/auth/", { username: username, password: password });
};

export const refreshTokens = async (refreshToken: string) => {
    return await API.post<{
        refresh: string;
        access: string;
    }>("/auth/refresh/", { refresh: refreshToken });
};

export const sendMessage = async (id: string, accessToken: string, inputValue: string) => {
    return await API.post<T.IPostedMessageResponse>(
        "/messages/",
        {
            text: inputValue,
            chat: id,
        },
        accessToken
    );
};

export const sendVoice = async (accessToken: string, formData: FormData) => {
    return await API.post<T.IPostedMessageResponse>("/messages/", formData, accessToken);
};

export const sendGeo = async (accessToken: string, id: string, locationUrl: string) => {
    return await API.post<T.IPostedMessageResponse>(
        "/messages/",
        {
            text: locationUrl,
            chat: id,
        },
        accessToken
    );
};

export const sendImages = async (accessToken: string, formData: FormData) => {
    return await API.post<T.IPostedMessageResponse>("/messages/", formData, accessToken);
};

export const connectCentrifuge = async (ctx: string, accessToken: string) => {
    return await API.post<{
        token: string;
    }>("/centrifugo/connect/", ctx, accessToken);
};

export const subscribeCentrifuge = async (ctx: string, accessToken: string) => {
    return await API.post<{
        token: string;
    }>("/centrifugo/subscribe/", ctx, accessToken);
};

export const saveProfile = async (id: string, accessToken: string, body: FormData) => {
    return await API.patch<T.IPatchUser>(`/user/${id}/`, body, accessToken);
};

export const deleteProfile = async (id: string, accessToken: string) => {
    return await API.delete(`/user/${id}/`, accessToken);
};
