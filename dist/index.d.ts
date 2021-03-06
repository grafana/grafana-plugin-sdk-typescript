#!/usr/bin/env node
import { DataFrame } from '@grafana/data';
import * as proto from './proto/backend_grpc_pb';
import { CheckHealthRequest, CheckHealthResponse, QueryDataRequest, QueryDataResponse, DataSourceInstanceSettings as InternalDataSourceInstanceSettings, CollectMetricsRequest, CollectMetricsResponse, CallResourceRequest, CallResourceResponse, DataQuery as InternalDataQuery, PluginContext as InternalPluginContext } from './proto/backend_pb';
import * as grpc from 'grpc';
import { Logger } from './logging';
import { API } from './api';
export { CheckHealthRequest, CheckHealthResponse, QueryDataRequest, QueryDataResponse, CollectMetricsRequest, CollectMetricsResponse, CallResourceRequest, CallResourceResponse, DataResponse, } from './proto/backend_pb';
import { BackendSrvImpl } from './services/BackendSrvImpl';
export { BackendSrvImpl };
export declare class ApiConnectionManager {
    apiMap: Record<string, API>;
    constructor();
    getAPI(settings: InternalDataSourceInstanceSettings.AsObject): API;
}
export declare abstract class DiagnosticsService implements proto.IDiagnosticsServer {
    abstract CheckHealth(request: CheckHealthRequest): Promise<CheckHealthResponse>;
    abstract CollectMetrics(request: CollectMetricsRequest): Promise<CollectMetricsResponse>;
    checkHealth: (call: grpc.ServerUnaryCall<CheckHealthRequest>, callback: grpc.sendUnaryData<CheckHealthResponse>) => Promise<void>;
    collectMetrics: (call: grpc.ServerUnaryCall<CollectMetricsRequest>, callback: grpc.sendUnaryData<CollectMetricsResponse>) => Promise<void>;
}
export interface DataQuery<T> extends InternalDataQuery.AsObject {
    query: T;
}
export interface DataSourceInstanceSettings<T> extends InternalDataSourceInstanceSettings.AsObject {
    json: T;
}
export interface PluginContext<T> extends InternalPluginContext.AsObject {
    datasourceinstancesettings?: DataSourceInstanceSettings<T>;
}
export declare abstract class DataService<Q, O> implements proto.IDataServer {
    abstract QueryData(request: DataQuery<Q>, pluginContext?: PluginContext<O>): Promise<DataFrame[]>;
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
