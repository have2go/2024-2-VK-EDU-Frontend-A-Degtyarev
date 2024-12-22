import { create } from "zustand";
import { getChats, getCurrentUser, getUsers } from "../api/requests";

export const useCurrentUserStore = create(set => ({
    userData: null,
    tokens: { access: null, refresh: null },

    setUserData: data => set({ data }),
    setTokens: tokens => set({ tokens }),

    login: async (access, refresh) => {
        const res = await getCurrentUser("/user/current/", access);
        set({
            tokens: { access, refresh },
            userData: res,
        });
        return res;
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
    fetchUsers: async (searchTerm, pageNumber, access, currentUserId) => {
        try {
            const res = await getUsers("/users/", { search: searchTerm, page: pageNumber }, access);

            const filteredUsers = res.results.filter(user => user.id !== currentUserId);
            set(state => ({
                users: pageNumber === 1 ? filteredUsers : [...state.users, ...filteredUsers],
            }));

            return { hasMore: res.next !== null };
        } catch {
            return { hasMore: false };
        }
    },
}));

export const useChatsStore = create(set => ({
    chats: null,
    setChats: newChats => set({ chats: newChats }),
    fetchChats: async (access, pageNumber, searchTerm) => {
        const res = await getChats("/chats/", { search: searchTerm, page: pageNumber }, access);

        set(state => ({
            chats: pageNumber === 1 ? res : { ...res, results: [...state.chats.results, ...res.results] },
        }));
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
