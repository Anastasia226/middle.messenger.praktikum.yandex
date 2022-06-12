enum Method {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE'
};

type Options = {
    method: Method;
    data?: any;
};

type OptionsWithoutMethod = Omit<Options, 'method'>;

function queryStringify(data: OptionsWithoutMethod) {
    let queryParams = '';
    Object.keys(data).forEach((key) =>
        queryParams = `${queryParams}${key}=${String(data.data[key])}&`
    );
    return queryParams === '' ? queryParams : `?${queryParams.slice(0, -1)}`
}

export class HTTPTransport {
    protected url;

    constructor(url: string) {
        this.url = url;
    }

    get(url: string, options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> {
        return this.request(url, { ...options, method: Method.GET });
    };

    put(url: string, options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> {
        return this.request(url, { ...options, method: Method.PUT });
    };

    post(url: string, options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> {
        return this.request(url, { ...options, method: Method.POST });
    };

    delete(url: string, options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> {
        return this.request(url, { ...options, method: Method.DELETE });
    };

    request(url: string, options: Options = { method: Method.GET }): Promise<XMLHttpRequest> {
        const { method, data } = options;

        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            if (method === Method.GET) {
                url = url + queryStringify(options.data);
            }
            xhr.open(method, url);

            xhr.onload = function () {
                resolve(xhr);
            };

            xhr.onabort = reject;
            xhr.onerror = reject;
            xhr.ontimeout = reject;

            if (method === Method.GET || !data) {
                xhr.send();
            } else {
                xhr.send(data);
            }
        });
    };
} 