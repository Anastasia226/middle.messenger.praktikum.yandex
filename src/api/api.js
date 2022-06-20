"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HTTPTransport = void 0;
const query_string_1 = require("../utils/mydash/query-string");
var Method;
(function (Method) {
    Method["GET"] = "GET";
    Method["POST"] = "POST";
    Method["PUT"] = "PUT";
    Method["DELETE"] = "DELETE";
})(Method || (Method = {}));
class HTTPTransport {
    async get(url, options = {}) {
        return JSON.parse((await this.request(url, { ...options, method: Method.GET })).response);
    }
    ;
    async put(url, options = {}) {
        return await this.request(url, { ...options, method: Method.PUT });
    }
    ;
    post(url, options = {}) {
        return this.request(url, { ...options, method: Method.POST });
    }
    ;
    delete(url, options = {}) {
        return this.request(url, { ...options, method: Method.DELETE });
    }
    ;
    request(url, options) {
        const { method, data, headers = {
            'Content-type': 'application/x-www-form-urlencoded',
        } } = options;
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            if (method === Method.GET) {
                url = url + (0, query_string_1.queryStringify)(data || {});
            }
            xhr.open(method, url);
            Object.keys(headers).forEach((key) => {
                xhr.setRequestHeader(key, headers[key]);
            });
            xhr.onload = function () {
                const { status } = xhr;
                if (status === 200) {
                    resolve(xhr);
                }
                else {
                    reject(new Error());
                }
            };
            xhr.onabort = reject;
            xhr.onerror = reject;
            xhr.ontimeout = reject;
            xhr.withCredentials = true;
            if (method === Method.GET || !data) {
                xhr.send();
            }
            else if (data instanceof FormData) {
                xhr.send(data);
            }
            else {
                xhr.send((0, query_string_1.queryStringify)(data || {}));
            }
        });
    }
    ;
}
exports.HTTPTransport = HTTPTransport;
//# sourceMappingURL=api.js.map