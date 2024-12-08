import { create } from "zustand";
import { getUser } from "../api/api";

export const useCurrentUserStore = create(set => ({
    userData: null,
    tokens: { access: null, refresh: null },

    setUserData: data => set({ data }),
    setTokens: tokens => set({ tokens }),

    login: async (access, refresh) => {
        try {
            const userData = await getUser(access);
            set({
                tokens: { access, refresh },
                userData: userData,
            });
            return userData;
        } catch (error) {
            console.error("Login failed:", error);
            throw error;
        }
    },

    logout: () => {
        set({
            userData: null,
            tokens: { access: null, refresh: null },
        });
    },
}));

export const useUsersStore = create(set => ({
    users: [],
    setUsers: newUsers => set({ users: newUsers }),
    fetchUsers: async (searchTerm, pageNumber, token, currentUserId) => {
        try {
            const response = await fetch(
                `https://vkedu-fullstack-div2.ru/api/users/?search=${searchTerm}&page=${pageNumber}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );
            if (response.ok) {
                const data = await response.json();
                const filteredUsers = data.results.filter(user => user.id !== currentUserId);
                set(state => ({
                    users: pageNumber === 1 ? filteredUsers : [...state.users, ...filteredUsers],
                }));
                return { hasMore: data.next !== null };
            }
        } catch (error) {
            console.error("Error fetching users:", error);
            return { hasMore: false };
        }
    },
}));

export const useChatsStore = create(set => ({
    chats: null,
    setChats: newChats => set({ chats: newChats }),
    fetchChats: async (token, pageNumber, searchTerm) => {
        try {
            const response = await fetch(
                `https://vkedu-fullstack-div2.ru/api/chats/?search=${searchTerm}&page=${pageNumber}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );
            if (response.ok) {
                const data = await response.json();
                set(state => ({
                    chats: pageNumber === 1 ? data : { ...data, results: [...state.chats.results, ...data.results] },
                }));
            }
        } catch (error) {
            console.error("Error fetching chats:", error);
        }
    },
}));

export const useMessagesStore = create(set => ({
    chatId: null,
    messages: [],
    setChatId: id => set({ chatId: id }),
    setMessages: newMessages => set({ messages: newMessages }),
    addMessage: message =>
        set(state => ({
            messages: [message, ...state.messages],
        })),
    updateMessage: updatedMessage =>
        set(state => ({
            messages: state.messages.map(message =>
                message.id === updatedMessage.id ? { ...message, ...updatedMessage } : message
            ),
        })),
    deleteMessage: messageToDelete =>
        set(state => ({
            messages: state.messages.filter(message => message.id !== messageToDelete.id),
        })),
}));
