import { HTTPTransport } from '../../utils/api/api';
import { ChatType, UsersChat } from "@/pages/chats/types";

export class chatsAPI {
    request: HTTPTransport;
    baseUrl: string;

    constructor() {
        this.request = new HTTPTransport();
        this.baseUrl = 'https://ya-praktikum.tech/api/v2';
    }

    async getChats(): Promise<ChatType[]> {
        const response = await this.request.get<ChatType[]>(`${this.baseUrl}/chats`, {});
        return response
    }

    async createChat(data: any): Promise<XMLHttpRequest> {
        const response = await this.request.post(`${this.baseUrl}/chats`, {

            data,
        });
        return response
    }

    async getChatToken(id: number): Promise<{ token: string }> {
        const response = await this.request.post(`${this.baseUrl}/chats/token/${id}`, {});
        return JSON.parse((response).response)
    }

    async getChatUsers(id: any): Promise<UsersChat[]> {
        const response = await this.request.get<UsersChat[]>(`${this.baseUrl}/chats/${id}/users`, {});
        return response
    }

    async addUserToChat(data: any): Promise<XMLHttpRequest> {
        const response = await this.request.put(`${this.baseUrl}/chats/users`, {
            data,
        });
        return response;
    }

    async updateChatAvatar(data: FormData): Promise<XMLHttpRequest> {
        const response = await this.request.put(`${this.baseUrl}/chats/avatar`, {
            headers: {},
            data,
        });
        return response;
    }
}
