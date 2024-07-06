#!/usr/bin/env node
// @ts-nocheck
import { DataFrame, FieldType, ArrayVector, DateTime, dataFrameToJSON} from '@grafana/data';
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
import {RecordBatchFileWriter, tableFromArrays, tableFromJSON} from 'apache-arrow';

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
  abstract QueryData(request: DataQuery<Q>, pluginContext?: PluginContext<O>): Promise<DataFrame[]>;

  async queryData(call: grpc.ServerUnaryCall<QueryDataRequest, QueryDataResponse>, callback: grpc.sendUnaryData<QueryDataResponse>) {
    let request: QueryDataRequest.AsObject = {
      "QueryDataRequest": {
        "plugincontext": {
          "orgid": 1,
          "pluginid": "vertamedia-clickhouse-datasource",
          "user": {
            "login": "grafana_scheduler",
            "name": "grafana_scheduler",
            "email": "",
            "role": "Admin"
          },
          "datasourceinstancesettings": {
            "id": 5,
            "name": "clickhouse",
            "url": "http://clickhouse:8123",
            "user": "",
            "database": "",
            "basicauthenabled": true,
            "basicauthuser": "default",
            "jsondata": "eyJhZGRDb3JzSGVhZGVyIjp0cnVlLCJjb21wcmVzc2lvblR5cGUiOiJnemlwIiwidXNlQ29tcHJlc3Npb24iOnRydWUsInVzZVBPU1QiOnRydWV9",
            "decryptedsecurejsondataMap": [
              ["basicAuthPassword", ""]
            ],
            "lastupdatedms": 1720124475000,
            "uid": "P7E099F39B84EA795"
          }
        },
        "headersMap": [
          ["FromAlert", "true"],
          ["X-Cache-Skip", "true"],
          ["X-Grafana-Org-Id", "1"],
          ["X-Rule-Uid", "test_unified_alert"]
        ],
        "queriesList": [
          {
            "refid": "A",
            "maxdatapoints": 43200,
            "intervalms": 1000,
            "timerange": {
              "fromepochms": 1720124290000,
              "toepochms": 1720124890000
            },
            "json": "eyJhZGRfbWV0YWRhdGEiOnRydWUsImRhdGFiYXNlIjoiZGVmYXVsdCIsImRhdGVDb2xEYXRhVHlwZSI6IiIsImRhdGVMb2FkaW5nIjpmYWxzZSwiZGF0ZVRpbWVDb2xEYXRhVHlwZSI6IkV2ZW50VGltZSIsImRhdGVUaW1lVHlwZSI6IkRBVEVUSU1FIiwiZGF0ZXRpbWVMb2FkaW5nIjpmYWxzZSwiZXh0cmFwb2xhdGUiOnRydWUsImZvcm1hdCI6InRpbWVfc2VyaWVzIiwiZm9ybWF0dGVkUXVlcnkiOiJTRUxFQ1QgJHRpbWVTZXJpZXMgYXMgdCwgTmFtZSwgY291bnQoKSBGUk9NICR0YWJsZSBXSEVSRSAkdGltZUZpbHRlciBHUk9VUCBCWSB0LE5hbWUgT1JERVIgQlkgdCxOYW1lIiwiaW50ZXJ2YWwiOiIiLCJpbnRlcnZhbEZhY3RvciI6MSwiaW50ZXJ2YWxNcyI6MTAwMCwibWF4RGF0YVBvaW50cyI6NDMyMDAsInF1ZXJ5IjoiU0VMRUNUXG4gICAgJHRpbWVTZXJpZXMgYXMgdCxcbiAgICBOYW1lLFxuICAgIHN1bShWYWx1ZSkgdlxuRlJPTSAkdGFibGVcblxuV0hFUkUgJHRpbWVGaWx0ZXJcblxuR1JPVVAgQlkgdCwgTmFtZVxuXG5PUkRFUiBCWSB0LCBOYW1lXG4iLCJyYXdRdWVyeSI6dHJ1ZSwicmVmSWQiOiJBIiwicm91bmQiOiIwcyIsInNraXBfY29tbWVudHMiOnRydWUsInRhYmxlIjoidGVzdF9hbGVydHMiLCJ0YWJsZUxvYWRpbmciOmZhbHNlfQ==",
            "querytype": ""
          },
          {
            "refid": "B",
            "maxdatapoints": 43200,
            "intervalms": 1000,
            "timerange": {
              "fromepochms": 1720124290000,
              "toepochms": 1720124890000
            },
            "json": "eyJhZGRfbWV0YWRhdGEiOnRydWUsImRhdGFiYXNlIjoiZGVmYXVsdCIsImRhdGVDb2xEYXRhVHlwZSI6IiIsImRhdGVMb2FkaW5nIjpmYWxzZSwiZGF0ZVRpbWVDb2xEYXRhVHlwZSI6IkV2ZW50VGltZSIsImRhdGVUaW1lVHlwZSI6IkRBVEVUSU1FIiwiZGF0ZXRpbWVMb2FkaW5nIjpmYWxzZSwiZXh0cmFwb2xhdGUiOnRydWUsImZvcm1hdCI6InRpbWVfc2VyaWVzIiwiZm9ybWF0dGVkUXVlcnkiOiJTRUxFQ1QgJHRpbWVTZXJpZXMgYXMgdCwgTmFtZSwgY291bnQoKSBGUk9NICR0YWJsZSBXSEVSRSAkdGltZUZpbHRlciBHUk9VUCBCWSB0LE5hbWUgT1JERVIgQlkgdCxOYW1lIiwiaW50ZXJ2YWwiOiIiLCJpbnRlcnZhbEZhY3RvciI6MSwiaW50ZXJ2YWxNcyI6MTAwMCwibWF4RGF0YVBvaW50cyI6NDMyMDAsInF1ZXJ5IjoiU0VMRUNUXG4gICAgJHRpbWVTZXJpZXMgYXMgdCxcbiAgICBOYW1lLFxuICAgIHN1bShWYWx1ZSkgdlxuRlJPTSAkdGFibGVcblxuV0hFUkUgJHRpbWVGaWx0ZXJcblxuR1JPVVAgQlkgdCwgTmFtZVxuXG5PUkRFUiBCWSB0LCBOYW1lXG4iLCJyYXdRdWVyeSI6dHJ1ZSwicmVmSWQiOiJBIiwicm91bmQiOiIwcyIsInNraXBfY29tbWVudHMiOnRydWUsInRhYmxlIjoidGVzdF9hbGVydHMiLCJ0YWJsZUxvYWRpbmciOmZhbHNlfQ==",
            "querytype": ""
          }
        ]
      }
    }

    request = request.QueryDataRequest;
    const context: InternalPluginContext.AsObject = request.plugincontext!;
    const response: QueryDataResponse = new QueryDataResponse();
    let err: grpc.ServiceError | null = null;
    // writeMessage('QueryDataRequest222' + JSON.stringify(call.request.toObject()));

    console.log(request.plugincontext?.datasourceinstancesettings)
    try {
      if (request.plugincontext?.datasourceinstancesettings) {
        for (let query of request.queriesList) {
          const dataResponse: DataResponse = new DataResponse();
          const jsonString: string = Buffer.from(query.json as string, 'base64').toString('ascii');
          const queryAsQ: Q = JSON.parse(jsonString);
          const contextJson: string = Buffer.from(context.datasourceinstancesettings?.jsondata as string, 'base64').toString('ascii');
          const contextAsO: O = JSON.parse(contextJson);
          const dataFrames: DataFrame[] = await this.QueryData({
            ...query,
            query: queryAsQ,
          }, {
            ...context,
            datasourceinstancesettings: {
              ...context.datasourceinstancesettings!,
              json: contextAsO,
            }
          });

          console.log('DataFrames', dataFrames)
          const writer = new RecordBatchFileWriter()
          dataFrames.forEach((dataFrame: DataFrame) => {
            const newFields = dataFrame.fields.map(field => {
              if (field.type == FieldType.time) {
                return {
                  ...field,
                  values: field.values,
                }
              }
              return field;
            });

            const newDataFrame = {
              ...dataFrame,
              fields: newFields,
            };

            // console.log(newDataFrame, 'NEW DATA FRAME')
            // console.log(newDataFrame, 'NEW DATA FRAME')
            const LENGTH = 2000;

            const rainAmounts = Float32Array.from(
                { length: LENGTH },
                () => Number((Math.random() * 20).toFixed(1)));

            const rainDates = Array.from(
                { length: LENGTH },
                (_, i) => new Date(Date.now() - 1000 * 60 * 60 * 24 * i));

            const rainfall = tableFromArrays({
              precipitation: rainAmounts,
              date: rainDates,
            });

            // const rainfall2 = tableFromArrays({
            //   data: newDataFrame.fields,
            // });
            writer.write(rainfall);
          });
          writer.finish();
          const frames = await writer.toUint8Array();
          // var str = String.fromCharCode.apply(null, frames);
          // console.log(str, 'FRAMES');
          dataResponse.addFrames(frames);
          writer.close();

          response.getResponsesMap().set(query.refid, dataResponse);
        }
        
      }
    } catch(ex: any) {
      throw new Error("Query data exception" + ex)
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
grpc.setLogVerbosity(grpc.logVerbosity.INFO);  

export {
  logger,
  Logger,
  DataFrame,
}
