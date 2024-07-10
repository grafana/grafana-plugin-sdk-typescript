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
        writeMessage('Query Data 333 '+ call.request.toObject())
        let request: QueryDataRequest.AsObject = call.request.toObject();
        const {queriesList, pluginContext} = processInputData(request)
        // const request = {
        //     "plugincontext": {
        //         "orgid": 1,
        //         "pluginid": "vertamedia-clickhouse-datasource",
        //         "user": {
        //             "login": "",
        //             "name": "",
        //             "email": "",
        //             "role": "Admin"
        //         },
        //         "datasourceinstancesettings": {
        //             "id": 5,
        //             "name": "clickhouse",
        //             "url": "http://clickhouse:8123",
        //             "user": "",
        //             "database": "",
        //             "basicauthenabled": true,
        //             "basicauthuser": "default",
        //             "jsondata": {
        //                 "addCorsHeader": true,
        //                 "compressionType": "gzip",
        //                 "useCompression": true,
        //                 "usePOST": true
        //             },
        //             "decryptedsecurejsondataMap": [
        //                 ["basicAuthPassword", ""]
        //             ],
        //             "lastupdatedms": 1720528778000,
        //             "uid": "P7E099F39B84EA795"
        //         },
        //         "headersMap": [
        //             ["FromAlert", "true"],
        //             ["X-Cache-Skip", "true"],
        //             ["http_X-Grafana-Org-Id", "1"]
        //         ],
        //         "queriesList": [
        //             {
        //                 "refid": "A",
        //                 "maxdatapoints": 43200,
        //                 "intervalms": 1000,
        //                 "timerange": {
        //                     "fromepochms": 1720529132456,
        //                     "toepochms": 1720529732456
        //                 },
        //                 "json": {
        //                     "add_metadata": true,
        //                     "database": "default",
        //                     "datasource": {
        //                         "type": "vertamedia-clickhouse-datasource",
        //                         "uid": "P7E099F39B84EA795"
        //                     },
        //                     "dateColDataType": "EventDate",
        //                     "dateTimeColDataType": "EventTime",
        //                     "dateTimeType": "DATETIME",
        //                     "editorMode": "builder",
        //                     "extrapolate": true,
        //                     "format": "table",
        //                     "formattedQuery": "SELECT $timeSeries as t, count() FROM $table WHERE $timeFilter GROUP BY t ORDER BY t",
        //                     "hide": false,
        //                     "interval": "",
        //                     "intervalFactor": 1,
        //                     "intervalMs": 1000,
        //                     "maxDataPoints": 43200,
        //                     "query": "SELECT $timeSeries as t, count() FROM $table WHERE $timeFilter GROUP BY t ORDER BY t",
        //                     "refId": "A",
        //                     "round": "0s",
        //                     "skip_comments": true,
        //                     "table": "test_alerts"
        //                 },
        //                 "querytype": ""
        //             }
        //         ]
        //     }
        // }

        const context: InternalPluginContext.AsObject = request.plugincontext!;
        const response: QueryDataResponse = new QueryDataResponse();
        let err: grpc.ServiceError | null = null;

        try {
            if (request.plugincontext?.datasourceinstancesettings) {
                for (let query of queriesList) {
                    const writer = new RecordBatchFileWriter()
                    const dataResponse: DataResponse = new DataResponse();

                    const request =  {
                        ...query,
                        query: query.json,
                    }

                    const dataFrame: any = await this.QueryData(request, pluginContext);

                    writer.write(
                        tableFromArrays(
                            dataFrame.fields.reduce((acc,field) => {
                                acc[field.name] = field.values;

                                return acc
                            }, {})
                        )
                    );

                    writer.finish();
                    const frames = await writer.toUint8Array();
                    dataResponse.addFrames(frames);
                    writer.close();
                    response.getResponsesMap().set(query.refid, dataResponse);
                }

            }
        } catch(ex: any) {
            console.trace(ex)
            err = ex;
        }

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

const logger = new Logger();
grpc.setLogger(logger);
grpc.setLogVerbosity(grpc.logVerbosity.DEBUG);


export {
    logger,
    Logger
}

