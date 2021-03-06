import { DataSourceJsonData } from '@grafana/data';
import { BackendSrv, BackendSrvRequest, BackendSrvResponse } from '../backend_srv';
import { DataSourceInstanceSettings } from '../index';
/**
 * AppDynamics
 * Strives to be a generic class that provides a native way to query data from restful
 * online data sources.
 */
export declare class BackendSrvImpl implements BackendSrv {
    config: DataSourceInstanceSettings<DataSourceJsonData>;
    _headers: any;
    /**
     * Creates a new BackendTestSrv
     * @param config A Settings object thta includes both Secure and Insecure settings.
     * @todo Figure out a way to keep the secure options secure, rather than hard coding them. Perhaps from the command line?
     */
    constructor(config: DataSourceInstanceSettings<DataSourceJsonData>, headers?: any);
    get(url: string, params?: any): Promise<any>;
    delete(url: string): Promise<any>;
    post(uri: string, body: any, data?: any): Promise<any>;
    patch(url: string, data?: any): Promise<any>;
    put(url: string, data?: any): Promise<any>;
    request<T>(options: BackendSrvRequest<T>): Promise<any>;
    get headers(): any;
    set headers(value: any);
    /**
     * datasourceRequest acts as an testing replacement for querying data from the datasource
     * @param options BackendSrvRequest that contains all the options relevant for a proper query.
     * @param data *optional* For a specific data respose in the form of a promise
     * @returns Promise for a DataQueryResponse
     */
    datasourceRequest<T>(request: BackendSrvRequest<T>): Promise<BackendSrvResponse<T>>;
}
