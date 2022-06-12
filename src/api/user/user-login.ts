import { HTTPTransport } from '../../utils/api/api';
import { BaseAPI } from '../../utils/api/base-api';

const authAPIInstance = new HTTPTransport('api/v1/auth');


export class LoginAPI extends BaseAPI {
    public request(user: any) {
        return authAPIInstance.post('/login', user)
            .then((response) => response); // Обрабатываем получение данных из сервиса далее
    }
}