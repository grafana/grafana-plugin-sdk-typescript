#!/usr/bin/env node
import * as proto from './proto/backend_grpc_pb';
import {
    CheckHealthRequest,
    CheckHealthResponse,
    QueryDataRequest,
    QueryDataResponse,
    DataSourceInstanceSettings as InternalDataSourceInstanceSettings,
    CollectMetricsRequest,
    CollectMetricsResponse,
    CallResourceRequest,
    CallResourceResponse,
    DataResponse,
    DataQuery as InternalDataQuery,
    PluginContext as InternalPluginContext,
} from './proto/backend_pb';
import * as grpc from '@grpc/grpc-js';
import { Logger } from './helpers/logging';
import { RecordBatchFileWriter, tableFromArrays } from 'apache-arrow';

const logger = new Logger();

export class API {
    constructor(settings: DataSourceInstanceSettings<any>) {

    }

    public testDatasource(): any {
        throw "Not implemented Yet..."
    }
}

export {
    CheckHealthRequest,
    CheckHealthResponse,
    QueryDataRequest,
    QueryDataResponse,
    CollectMetricsRequest,
    CollectMetricsResponse,
    CallResourceRequest,
    CallResourceResponse,
    DataResponse,
} from './proto/backend_pb';

import { BackendSrvImpl } from './services/BackendSrvImpl';
import {processInputData} from "./helpers/prepare-query";
export { BackendSrvImpl }

export class ApiConnectionManager {
    apiMap: Record<string, API>;
    constructor() {
        this.apiMap = {}
    }

    getAPI(settings: any): API {
        if (!this.apiMap[settings.url]) {
            this.apiMap[settings.url] = new API(settings);
        }

        return this.apiMap[settings.url];
    }
}


export abstract class DiagnosticsService implements proto.IDiagnosticsServer {
    [key: string]: any;
    abstract CheckHealth(request: CheckHealthRequest): Promise<CheckHealthResponse>;
    abstract CollectMetrics(request: CollectMetricsRequest): Promise<CollectMetricsResponse>;

    checkHealth = async (call: grpc.ServerUnaryCall<CheckHealthRequest, CheckHealthResponse>, callback: grpc.sendUnaryData<CheckHealthResponse>) => {
        let response: CheckHealthResponse = new CheckHealthResponse();
        let err: any = null;

        try {
            response = await this.CheckHealth(call.request);
        } catch(ex: any) {
            logger.warn("exception", ex);
            response.setStatus(CheckHealthResponse.HealthStatus.ERROR);
            response.setMessage(ex as string);
            err = ex;
        }

        callback(err, response);
    }

    collectMetrics = async (call: grpc.ServerUnaryCall<CollectMetricsRequest, CollectMetricsResponse>, callback: grpc.sendUnaryData<CollectMetricsResponse>) => {
        let response: CollectMetricsResponse = new CollectMetricsResponse();
        let err: any = null;

        try {
            response = await this.CollectMetrics(call.request);
        } catch (ex: any) {
            logger.warn("exception", ex);
            err = ex;
        }
        callback(err, response);
    };
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

export abstract class DataService<Q,O> implements proto.IDataServer {
    [key: string]: any;
    abstract QueryData(request: DataQuery<Q>, pluginContext?: PluginContext<O>): Promise<any[]>;
    async queryData(call: grpc.ServerUnaryCall<QueryDataRequest, QueryDataResponse>, callback: grpc.sendUnaryData<QueryDataResponse>) {
        let request: QueryDataRequest.AsObject = call.request.toObject();

        const {queriesList, pluginContext} = processInputData(request)

        const response: QueryDataResponse = new QueryDataResponse();
        let err: any = null;

        try {
            if (pluginContext?.datasourceinstancesettings) {
                const dataFrames: any[] = await this.QueryData({
                    ...pluginContext,
                    targets: queriesList.map((query: any) => {
                        return {
                            ...query,
                            query: query.json,
                        }
                    }),
                });

                for (const dataFrame of dataFrames) {
                    const writer = new RecordBatchFileWriter()
                    const dataResponse: DataResponse = new DataResponse();

                    writer.write(
                        tableFromArrays(
                            dataFrame.fields.reduce((acc: { [key: string]: any }, field: any) => {
                                acc[field.name] = field.values

                                return acc
                            }, {})
                        )
                    );

                    logger.info()
                    writer.finish();
                    const frames = await writer.toUint8Array();
                    dataResponse.addFrames(frames);
                    writer.close();
                    response.getResponsesMap().set(dataFrame.refId, dataResponse);
                }
            }
        } catch(ex: any) {
            console.trace(ex)
            err = ex;
        }

        logger.info("response", response.toObject());
        callback(err, response);
    }
}

export abstract class ResourceService implements proto.IResourceService {
    [key: string]: any;
    abstract CallResource(request: CallResourceRequest): Promise<CallResourceResponse>;

    callResource: any = async (call: grpc.ServerWritableStream<CallResourceRequest, CallResourceResponse>) => {
        let response: CallResourceResponse = new CallResourceResponse();
        let err: any = null;

        try {
            response = await this.CallResource(call.request);
        } catch(ex: any) {
            logger.error("CallResource exception", ex);
            err = ex;
        }

        call.write(response, (writeErr: any) => {
            if (err) {
                logger.error('error', err);
                call.emit('error', err)
            }
            if (writeErr) {
                logger.error('write error', writeErr);
                call.emit('write error', writeErr);
            }
            call.end()
        });
    }
}

export class BackendServer {
    server: grpc.Server;
    constructor() {
        this.server = new grpc.Server();
    }

    public addDiagnosticsService = (instance: any) => {
        this.server.addService(proto.DiagnosticsService as any, instance as any);
    }

    public addResourceService = (instance: any) => {
        this.server.addService(proto.ResourceService as any, instance as any);
    }

    public addDataService = (instance: any) => {
        this.server.addService(proto.DataService as any, instance as any);
    }

    public run() {
        this.server.bindAsync('0.0.0.0:0', grpc.ServerCredentials.createInsecure(), (error, port) => {
            console.log(`1|2|tcp|localhost:${port}|grpc`);
        })
    }
}

grpc.setLogger(logger);
grpc.setLogVerbosity(grpc.logVerbosity.DEBUG);


export {
    logger,
    Logger
}

