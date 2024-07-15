#!/usr/bin/env node
// @ts-nocheck
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
import {RecordBatchFileWriter, tableFromArrays, tableFromJSON, Table} from 'apache-arrow';

const logger = new Logger();

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import { writeFileSync } from 'fs';

// Specify the file path and the data to write
const filePath = './example.txt';
const data = '123';

// Write the data to the file
writeFileSync(filePath, data);

// Get the directory name of the current module file
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define the file path
// const filePath = path.join(__dirname, 'messages.txt');

// Function to write a message to the file
function writeMessage(message) {
    // Append the message to the file
    fs.appendFile(message, message + '\n', (err) => {
        if (err) {
            console.error('Error writing to file', err);
        } else {
            console.log('Message written to file:', message);
        }
    });
}


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
    abstract CheckHealth(request: CheckHealthRequest): Promise<CheckHealthResponse>;
    abstract CollectMetrics(request: CollectMetricsRequest): Promise<CollectMetricsResponse>;

    checkHealth = async (call: grpc.ServerUnaryCall<CheckHealthRequest, CheckHealthResponse>, callback: grpc.sendUnaryData<CheckHealthResponse>) => {
        let response: CheckHealthResponse = new CheckHealthResponse();
        let err: grpc.ServiceError | null = null;

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
        let err: grpc.ServiceError | null = null;

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
    abstract QueryData(request: DataQuery<Q>, pluginContext?: PluginContext<O>): Promise<any[]>;
    async queryData(call: grpc.ServerUnaryCall<QueryDataRequest, QueryDataResponse>, callback: grpc.sendUnaryData<QueryDataResponse>) {
        let request: QueryDataRequest.AsObject = call.request.toObject();

        const {queriesList, pluginContext} = processInputData(request)


        const context: InternalPluginContext.AsObject = request.plugincontext!;
        const response: QueryDataResponse = new QueryDataResponse();
        let err: grpc.ServiceError | null = null;

        try {
            if (pluginContext?.datasourceinstancesettings) {
                const dataFrames: any[] = await this.QueryData({
                    ...pluginContext,
                    targets: queriesList.map(query => {
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
                            dataFrame.fields.filter(field => {
                                return field.name === 't' || field.name === 'v'
                            }).reduce((acc, field) => {
                                if (field.name === 't') {
                                    acc[field.name] = field.values.map(value => new Date(value))
                                } else if (field.name === 'v') {
                                    acc[field.name] = field.values.map(Number)
                                }

                                return acc
                            }, {})
                        )
                    );

                    // const LENGTH = 100;
                    //
                    // const rainAmounts = Float32Array.from(
                    //     { length: LENGTH },
                    //     () => Number((Math.random() * 20).toFixed(1)));
                    // const rainDates = Array.from(
                    //     { length: LENGTH },
                    //     (_, i) => new Date(Date.now() - 1000 * 60 * 60 * 24 * i));
                    //
                    // const rainfall = tableFromArrays({
                    //     precipitation: rainAmounts,
                    //     date: rainDates,
                    // });

                    // writer.write(rainfall)
                    //
                    // logger.info('Results', tableFromArrays(
                    //     dataFrame.fields.filter(field => {
                    //         return field.name === 't' || field.name === 'v'
                    //     }).reduce((acc,field) => {
                    //         acc[field.name] = field.values;
                    //
                    //         console.log(field.name, field.values)
                    //
                    //         return acc
                    //     }, {})
                    // ))


                    logger.info()
                    writer.finish();
                    const frames = await writer.toUint8Array();
                    dataResponse.addFrames(frames);
                    writer.close();
                    response.getResponsesMap().set('A', dataResponse);
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
    abstract CallResource(request: CallResourceRequest): Promise<CallResourceResponse>;

    callResource: grpc.handleServerStreamingCall<CallResourceRequest, CallResourceResponse> = async (call: grpc.ServerWritableStream<CallResourceRequest, CallResourceResponse>) => {
        let response: CallResourceResponse = new CallResourceResponse();
        let err: grpc.ServiceError | null = null;

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
    port: number;
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

