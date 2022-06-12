import { HTTPTransport } from '../../utils/api/api';
import { BaseAPI } from '../../utils/api/base-api';

const chatMessagesAPIInstance = new HTTPTransport('api/v1/messages');

export class ChatMessagesAPI extends BaseAPI {
    request(id: string) {
        return chatMessagesAPIInstance.get(`/${id}`);
    }
}