import { HTTPTransport } from '../api';
import { ChatType, UsersChat } from "@/pages/chats/types";

export class chatsAPI {
    request: HTTPTransport;
    baseUrl: string;

    constructor() {
        this.request = new HTTPTransport();
        this.baseUrl = 'https://ya-praktikum.tech/api/v2';
    }

    getChats(): Promise<ChatType[]> {
        return this.request.get<ChatType[]>(`${this.baseUrl}/chats`);
    }

    createChat(data: any): Promise<XMLHttpRequest> {
        return this.request.post(`${this.baseUrl}/chats`, {
            data,
        });
    }

    async getChatToken(id: number): Promise<{ token: string }> {
        const response = await this.request.post(`${this.baseUrl}/chats/token/${id}`, {});
        return JSON.parse((response).response)
    }

    getChatUsers(id: any): Promise<UsersChat[]> {
        return this.request.get<UsersChat[]>(`${this.baseUrl}/chats/${id}/users`, {});
    }

    addUserToChat(data: any): Promise<XMLHttpRequest> {
        return this.request.put(`${this.baseUrl}/chats/users`, {
            data,
        });
    }

    updateChatAvatar(data: FormData): Promise<XMLHttpRequest> {
        return this.request.put(`${this.baseUrl}/chats/avatar`, {
            headers: {},
            data,
        });
    }
}
