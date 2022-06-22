import { HTTPTransport } from '../api';
import store from '../../utils/store/store';

export class userAPI {
  request: HTTPTransport;

  baseUrl: string;

  constructor() {
    this.request = new HTTPTransport();
    this.baseUrl = 'https://ya-praktikum.tech/api/v2';
  }

  signUp(data: any): Promise<XMLHttpRequest> {
    return this.request.post(`${this.baseUrl}/auth/signup`, {
      data,
    });
  }

  signIn(data: any): Promise<XMLHttpRequest> {
    return this.request.post(`${this.baseUrl}/auth/signin`, {
      data,
    });
  }

  async getUser(): Promise<XMLHttpRequest> {
    const response = await this.request.get(`${this.baseUrl}/auth/user`, {});
    store.set('user', response);
    return response;
  }

  logOut(): Promise<XMLHttpRequest> {
    return this.request.post(`${this.baseUrl}/auth/logout`, {});
  }
}
