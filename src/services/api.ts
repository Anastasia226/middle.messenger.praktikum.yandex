enum METHOD {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE'
};

type Options = {
    method: METHOD;
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

class HTTPTransport {
    get(url: string, options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> {
        return this.request(url, { ...options, method: METHOD.GET });
    };

    put(url: string, options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> {
        return this.request(url, { ...options, method: METHOD.PUT });
    };

    post(url: string, options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> {
        return this.request(url, { ...options, method: METHOD.POST });
    };

    delete(url: string, options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> {
        return this.request(url, { ...options, method: METHOD.DELETE });
    };

    request(url: string, options: Options = { method: METHOD.GET }): Promise<XMLHttpRequest> {
        const { method, data } = options;

        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            if (method === METHOD.GET) {
                url = url + queryStringify(options.data);
            }
            xhr.open(method, url);

            xhr.onload = function () {
                resolve(xhr);
            };

            xhr.onabort = reject;
            xhr.onerror = reject;
            xhr.ontimeout = reject;

            if (method === METHOD.GET || !data) {
                xhr.send();
            } else {
                xhr.send(data);
            }
        });
    };
} 