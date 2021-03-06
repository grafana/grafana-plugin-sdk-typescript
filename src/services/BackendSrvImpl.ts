import { DataSourceJsonData } from '@grafana/data';
import { BackendSrv, BackendSrvRequest, BackendSrvResponse } from '../backend_srv';
import requestPromise from 'request-promise-native';
import { DataSourceInstanceSettings } from '../index';
import { Logger } from '../logging';

const logger: Logger = new Logger();

const serializeQueryStringParams = function(obj: any, prefix?: string): string {
  var str = [],
    p;
  for (p in obj) {
    if (obj.hasOwnProperty(p)) {
      var k = prefix ? prefix + "[" + p + "]" : p,
        v = obj[p];
      str.push((v !== null && typeof v === "object") ?
      serializeQueryStringParams(v, k) :
        encodeURIComponent(k) + "=" + encodeURIComponent(v));
    }
  }
  return str.join("&");
}

/**
 * AppDynamics
 * Strives to be a generic class that provides a native way to query data from restful 
 * online data sources.
 */
export class BackendSrvImpl implements BackendSrv {
  config: DataSourceInstanceSettings<DataSourceJsonData>;
  _headers: any;

  /**
   * Creates a new BackendTestSrv
   * @param config A Settings object thta includes both Secure and Insecure settings.
   * @todo Figure out a way to keep the secure options secure, rather than hard coding them. Perhaps from the command line?
   */
  constructor(config: DataSourceInstanceSettings<DataSourceJsonData>, headers?: any) {
    this.config = config;
    this._headers = headers || {};

    if (config.basicauthenabled) {
      this._headers = {
        ...this.headers,
        'Authorization': 'Basic ' + Buffer.from(config.basicauthuser + ':' + config.decryptedsecurejsondataMap[0][1]).toString('base64')
      }
    }

    logger.debug("Headers", this._headers);
  }

  get(url: string, params?: any): Promise<any> {
    return this.datasourceRequest({ ...params, method: 'GET', url });
  }
  delete(url: string): Promise<any> {
    return this.datasourceRequest({ method: 'DELETE', url });
  }
  post(uri: string, body: any, data?: any): Promise<any> {
    return this.datasourceRequest({ ...data, body, method: 'POST', uri });
  }
  patch(url: string, data?: any): Promise<any> {
    return this.datasourceRequest({ ...data, method: 'PATCH', url });
  }
  put(url: string, data?: any): Promise<any> {
    return this.datasourceRequest({ ...data, method: 'PUT', url });
  }

  request<T>(options: BackendSrvRequest<T>): Promise<any> {
    return this.datasourceRequest<T>(options);
  }

  get headers(): any {
    return this._headers
  }

  set headers(value: any) {
    this._headers = value;
  }

  /**
   * datasourceRequest acts as an testing replacement for querying data from the datasource
   * @param options BackendSrvRequest that contains all the options relevant for a proper query.
   * @param data *optional* For a specific data respose in the form of a promise
   * @returns Promise for a DataQueryResponse
   */
  datasourceRequest<T>(request: BackendSrvRequest<T>): Promise<BackendSrvResponse<T>> {
    //logger.debug("==>", request);
    request.headers = this.headers;
    if (request.params) {
      const params = serializeQueryStringParams(request.params);
      request.url += `?${params}`;
    }
    
    return requestPromise(request).then(response => {
      try {
        //logger.debug("<==", response);
        const data = JSON.parse(response);
        return Promise.resolve({ data });
      } catch(ex) {
        return Promise.reject(ex);
      }
    });
  }
}
