export interface ICurrentUserResponse {
    id: string;
    username: string;
    first_name: string;
    last_name: string;
    bio: string | null;
    avatar: string | null;
    last_online_at: string;
    is_online: boolean;
}

export interface IUsersResponse {
    count: number;
    next: string;
    previous: string;
    results: [
        {
            id: string;
            username: string;
            first_name: string;
            last_name: string;
            bio: string | null;
            avatar: string | null;
            last_online_at: string;
            is_online: boolean;
        }
    ];
}

export interface IChatsResponse {
    count: number;
    next: string;
    previous: string;
    results: [
        {
            id: string;
            title: string;
            members: [
                {
                    id: string;
                    username: string;
                    first_name: string;
                    last_name: string;
                    bio: string | null;
                    avatar: string | null;
                    last_online_at: string;
                    is_online: boolean;
                }
            ];
            creator: {
                id: string;
                username: string;
                first_name: string;
                last_name: string;
                bio: string | null;
                avatar: string | null;
                last_online_at: string;
                is_online: boolean;
            };
            avatar: string | null;
            created_at: string;
            updated_at: string;
            is_private: boolean;
            last_message: object | null;
            unread_messages_count: number;
        }
    ];
}

export interface IRegister {
    username: string;
    password: string;
    first_name: string;
    last_name: string;
    bio: string | null;
    avatar: File | null;
}

export interface IPatchUser {
    id: string;
    username: string;
    first_name: string;
    last_name: string;
    bio: string | null;
    avatar: string | null;
    last_online_at: string;
    is_online: boolean;
}

export interface IChatInfoResponse {
    id: string;
    title: string;
    members: [
        {
            id: string;
            username: string;
            first_name: string;
            last_name: string;
            bio: string | null;
            avatar: string | null;
            last_online_at: string;
            is_online: boolean;
        }
    ];
    creator: {
        id: string;
        username: string;
        first_name: string;
        last_name: string;
        bio: string | null;
        avatar: string | null;
        last_online_at: string;
        is_online: boolean;
    };
    avatar: string | null;
    created_at: string;
    updated_at: string;
    is_private: boolean;
    last_message: object | null;
    unread_messages_count: number;
}

export interface IPostedMessageResponse {
    id: string;
    text: string | null;
    voice: string | null;
    chat: string;
    files: [
        {
            item: string;
        }
    ];
    updated_at: string;
    created_at: string;
}

export interface IMessagesResponse {
    count: number;
    next: string;
    previous: string;
    results: [
        {
            id: string;
            text: string | null;
            voice: string | null;
            chat: string;
            sender: {
                id: string;
                username: string;
                first_name: string;
                last_name: string;
                bio: string | null;
                avatar: string | null;
                last_online_at: string;
                is_online: boolean;
            };
            files: [
                {
                    item: string;
                }
            ];
            was_read_by: [
                {
                    id: string;
                    username: string;
                    first_name: string;
                    last_name: string;
                    bio: string | null;
                    avatar: string | null;
                    last_online_at: string;
                    is_online: boolean;
                }
            ];
            updated_at: string;
            created_at: string;
        }
    ];
}
