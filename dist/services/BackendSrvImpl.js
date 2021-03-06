"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BackendSrvImpl = void 0;
const tslib_1 = require("tslib");
const request_promise_native_1 = tslib_1.__importDefault(require("request-promise-native"));
const logging_1 = require("../logging");
const logger = new logging_1.Logger();
const serializeQueryStringParams = function (obj, prefix) {
    var str = [], p;
    for (p in obj) {
        if (obj.hasOwnProperty(p)) {
            var k = prefix ? prefix + "[" + p + "]" : p, v = obj[p];
            str.push((v !== null && typeof v === "object") ?
                serializeQueryStringParams(v, k) :
                encodeURIComponent(k) + "=" + encodeURIComponent(v));
        }
    }
    return str.join("&");
};
/**
 * AppDynamics
 * Strives to be a generic class that provides a native way to query data from restful
 * online data sources.
 */
class BackendSrvImpl {
    /**
     * Creates a new BackendTestSrv
     * @param config A Settings object thta includes both Secure and Insecure settings.
     * @todo Figure out a way to keep the secure options secure, rather than hard coding them. Perhaps from the command line?
     */
    constructor(config, headers) {
        this.config = config;
        this._headers = headers || {};
        if (config.basicauthenabled) {
            this._headers = Object.assign(Object.assign({}, this.headers), { 'Authorization': 'Basic ' + Buffer.from(config.basicauthuser + ':' + config.decryptedsecurejsondataMap[0][1]).toString('base64') });
        }
        logger.debug("Headers", this._headers);
    }
    get(url, params) {
        return this.datasourceRequest(Object.assign(Object.assign({}, params), { method: 'GET', url }));
    }
    delete(url) {
        return this.datasourceRequest({ method: 'DELETE', url });
    }
    post(uri, body, data) {
        return this.datasourceRequest(Object.assign(Object.assign({}, data), { body, method: 'POST', uri }));
    }
    patch(url, data) {
        return this.datasourceRequest(Object.assign(Object.assign({}, data), { method: 'PATCH', url }));
    }
    put(url, data) {
        return this.datasourceRequest(Object.assign(Object.assign({}, data), { method: 'PUT', url }));
    }
    request(options) {
        return this.datasourceRequest(options);
    }
    get headers() {
        return this._headers;
    }
    set headers(value) {
        this._headers = value;
    }
    /**
     * datasourceRequest acts as an testing replacement for querying data from the datasource
     * @param options BackendSrvRequest that contains all the options relevant for a proper query.
     * @param data *optional* For a specific data respose in the form of a promise
     * @returns Promise for a DataQueryResponse
     */
    datasourceRequest(request) {
        //logger.debug("==>", request);
        request.headers = this.headers;
        if (request.params) {
            const params = serializeQueryStringParams(request.params);
            request.url += `?${params}`;
        }
        return request_promise_native_1.default(request).then(response => {
            try {
                //logger.debug("<==", response);
                const data = JSON.parse(response);
                return Promise.resolve({ data });
            }
            catch (ex) {
                return Promise.reject(ex);
            }
        });
    }
}
exports.BackendSrvImpl = BackendSrvImpl;
//# sourceMappingURL=BackendSrvImpl.js.map