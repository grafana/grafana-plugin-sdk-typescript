#!/usr/bin/env node
import { DataFrame } from '@grafana/data';
import * as proto from './proto/backend_grpc_pb';
import { CheckHealthRequest, CheckHealthResponse, QueryDataRequest, QueryDataResponse, DataSourceInstanceSettings, CollectMetricsRequest, CollectMetricsResponse, CallResourceRequest, CallResourceResponse, DataQuery } from './proto/backend_pb';
import * as grpc from 'grpc';
import { Logger } from './logging';
import { API } from './api';
export { CheckHealthRequest, CheckHealthResponse, QueryDataRequest, QueryDataResponse, DataSourceInstanceSettings, CollectMetricsRequest, CollectMetricsResponse, CallResourceRequest, CallResourceResponse, DataResponse, } from './proto/backend_pb';
import { BackendSrvImpl } from './services/BackendSrvImpl';
export { BackendSrvImpl };
export declare class ApiConnectionManager {
    apiMap: Record<string, API>;
    constructor();
    getAPI(settings: DataSourceInstanceSettings.AsObject): API;
}
export declare abstract class DiagnosticsService implements proto.IDiagnosticsServer {
    abstract CheckHealth(request: CheckHealthRequest): Promise<CheckHealthResponse>;
    abstract CollectMetrics(request: CollectMetricsRequest): Promise<CollectMetricsResponse>;
    checkHealth: (call: grpc.ServerUnaryCall<CheckHealthRequest>, callback: grpc.sendUnaryData<CheckHealthResponse>) => Promise<void>;
    collectMetrics: (call: grpc.ServerUnaryCall<CollectMetricsRequest>, callback: grpc.sendUnaryData<CollectMetricsResponse>) => Promise<void>;
}
export interface DataRequest<T> extends DataQuery.AsObject {
    query: T;
}
export declare abstract class DataService<T> implements proto.IDataServer {
    abstract QueryData(request: DataRequest<T>): Promise<DataFrame[]>;
    queryData(call: grpc.ServerUnaryCall<QueryDataRequest>, callback: grpc.sendUnaryData<QueryDataResponse>): Promise<void>;
}
export declare abstract class ResourceService implements proto.IResourceServer {
    abstract CallResource(request: CallResourceRequest): Promise<CallResourceResponse>;
    callResource: grpc.handleServerStreamingCall<CallResourceRequest, CallResourceResponse>;
}
export declare class BackendServer {
    server: grpc.Server;
    port: number;
    constructor();
    addDiagnosticsService: (instance: proto.IDiagnosticsServer) => void;
    addResourceService: (instance: proto.IResourceServer) => void;
    addDataService: (instance: proto.IDataServer) => void;
    run(): void;
}
declare const logger: Logger;
export { logger, Logger, DataFrame, };
