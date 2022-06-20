import { queryStringify } from '../utils/mydash/query-string';

enum Method {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE'
}


type Options = {
    headers?: Record<string, string>,
    method: Method;
    data?: any;
};

type OptionsWithoutMethod = Omit<Options, 'method'>;


export class HTTPTransport {
    async get<T = XMLHttpRequest>(url: string, options: OptionsWithoutMethod = {}): Promise<T> {
        return JSON.parse((await this.request(url, { ...options, method: Method.GET })).response);
    };

    async put(url: string, options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> {
        return await this.request(url, { ...options, method: Method.PUT });
    };

    post(url: string, options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> {

        return this.request(url, { ...options, method: Method.POST });

    };

    delete(url: string, options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> {
        return this.request(url, { ...options, method: Method.DELETE });
    };

    request(url: string, options: Options): Promise<XMLHttpRequest> {
        const {
            method, data, headers = {
                'Content-type': 'application/json',
            }
        } = options;

        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            if (method === Method.GET) {
                url = url + queryStringify(data || {});
            }
            xhr.open(method, url);
            Object.keys(headers).forEach((key) => {
                xhr.setRequestHeader(key, headers[key]);
            });
            xhr.onload = function () {
                const { status } = xhr;
                if (status === 200) {
                    resolve(xhr);
                } else {
                    reject(new Error());
                }
            };

            xhr.onabort = reject;
            xhr.onerror = reject;
            xhr.ontimeout = reject;
            xhr.withCredentials = true

            if (method === Method.GET || !data) {
                xhr.send();
            } else if (data instanceof FormData) {
                xhr.send(data)
            } else {
                xhr.send(JSON.stringify(data || {}));
            }
        });
    };
} 