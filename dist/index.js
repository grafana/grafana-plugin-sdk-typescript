#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = exports.logger = exports.BackendServer = exports.ResourceService = exports.DataService = exports.DiagnosticsService = exports.ApiConnectionManager = exports.BackendSrvImpl = exports.DataResponse = exports.CallResourceResponse = exports.CallResourceRequest = exports.CollectMetricsResponse = exports.CollectMetricsRequest = exports.QueryDataResponse = exports.QueryDataRequest = exports.CheckHealthResponse = exports.CheckHealthRequest = void 0;
const tslib_1 = require("tslib");
const data_1 = require("@grafana/data");
const proto = tslib_1.__importStar(require("./proto/backend_grpc_pb"));
const backend_pb_1 = require("./proto/backend_pb");
const grpc = tslib_1.__importStar(require("grpc"));
const logging_1 = require("./logging");
Object.defineProperty(exports, "Logger", { enumerable: true, get: function () { return logging_1.Logger; } });
const api_1 = require("./api");
var backend_pb_2 = require("./proto/backend_pb");
Object.defineProperty(exports, "CheckHealthRequest", { enumerable: true, get: function () { return backend_pb_2.CheckHealthRequest; } });
Object.defineProperty(exports, "CheckHealthResponse", { enumerable: true, get: function () { return backend_pb_2.CheckHealthResponse; } });
Object.defineProperty(exports, "QueryDataRequest", { enumerable: true, get: function () { return backend_pb_2.QueryDataRequest; } });
Object.defineProperty(exports, "QueryDataResponse", { enumerable: true, get: function () { return backend_pb_2.QueryDataResponse; } });
Object.defineProperty(exports, "CollectMetricsRequest", { enumerable: true, get: function () { return backend_pb_2.CollectMetricsRequest; } });
Object.defineProperty(exports, "CollectMetricsResponse", { enumerable: true, get: function () { return backend_pb_2.CollectMetricsResponse; } });
Object.defineProperty(exports, "CallResourceRequest", { enumerable: true, get: function () { return backend_pb_2.CallResourceRequest; } });
Object.defineProperty(exports, "CallResourceResponse", { enumerable: true, get: function () { return backend_pb_2.CallResourceResponse; } });
Object.defineProperty(exports, "DataResponse", { enumerable: true, get: function () { return backend_pb_2.DataResponse; } });
const BackendSrvImpl_1 = require("./services/BackendSrvImpl");
Object.defineProperty(exports, "BackendSrvImpl", { enumerable: true, get: function () { return BackendSrvImpl_1.BackendSrvImpl; } });
class ApiConnectionManager {
    constructor() {
        this.apiMap = {};
    }
    getAPI(settings) {
        if (!this.apiMap[settings.url]) {
            this.apiMap[settings.url] = new api_1.API(settings);
        }
        return this.apiMap[settings.url];
    }
}
exports.ApiConnectionManager = ApiConnectionManager;
class DiagnosticsService {
    constructor() {
        this.checkHealth = (call, callback) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            let response = new backend_pb_1.CheckHealthResponse();
            let err = null;
            try {
                response = yield this.CheckHealth(call.request);
            }
            catch (ex) {
                logger.warn("exception", ex);
                response.setStatus(backend_pb_1.CheckHealthResponse.HealthStatus.ERROR);
                response.setMessage(ex);
                err = ex;
            }
            callback(err, response);
        });
        this.collectMetrics = (call, callback) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            let response = new backend_pb_1.CollectMetricsResponse();
            let err = null;
            try {
                response = yield this.CollectMetrics(call.request);
            }
            catch (ex) {
                logger.warn("exception", ex);
                err = ex;
            }
            callback(err, response);
        });
    }
}
exports.DiagnosticsService = DiagnosticsService;
class DataService {
    queryData(call, callback) {
        var _a, _b;
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const request = call.request.toObject();
            const context = call.request.toObject().plugincontext;
            const response = new backend_pb_1.QueryDataResponse();
            let err = null;
            try {
                if ((_a = request.plugincontext) === null || _a === void 0 ? void 0 : _a.datasourceinstancesettings) {
                    for (let query of request.queriesList) {
                        const dataResponse = new backend_pb_1.DataResponse();
                        const jsonString = Buffer.from(query.json, 'base64').toString('ascii');
                        const queryAsQ = JSON.parse(jsonString);
                        const contextJson = Buffer.from((_b = context.datasourceinstancesettings) === null || _b === void 0 ? void 0 : _b.jsondata, 'base64').toString('ascii');
                        const contextAsO = JSON.parse(contextJson);
                        const dataFrames = yield this.QueryData(Object.assign(Object.assign({}, query), { query: queryAsQ }), Object.assign(Object.assign({}, context), { datasourceinstancesettings: Object.assign(Object.assign({}, context.datasourceinstancesettings), { json: contextAsO }) }));
                        dataFrames.forEach((dataFrame) => {
                            dataResponse.addFrames(data_1.grafanaDataFrameToArrowTable(dataFrame).serialize());
                        });
                        response.getResponsesMap().set(query.refid, dataResponse);
                    }
                    ;
                }
            }
            catch (ex) {
                logger.error("Query data exception", ex);
                err = ex;
            }
            callback(err, response);
        });
    }
}
exports.DataService = DataService;
class ResourceService {
    constructor() {
        this.callResource = (call) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            let response = new backend_pb_1.CallResourceResponse();
            let err = null;
            try {
                response = yield this.CallResource(call.request);
            }
            catch (ex) {
                logger.error("CallResource exception", ex);
                err = ex;
            }
            call.write(response, writeErr => {
                if (err) {
                    logger.error('error', err);
                    call.emit('error', err);
                }
                if (writeErr) {
                    logger.error('write error', writeErr);
                    call.emit('write error', writeErr);
                }
                call.end();
            });
        });
    }
}
exports.ResourceService = ResourceService;
class BackendServer {
    constructor() {
        this.addDiagnosticsService = (instance) => {
            this.server.addService(proto.DiagnosticsService, instance);
        };
        this.addResourceService = (instance) => {
            this.server.addService(proto.ResourceService, instance);
        };
        this.addDataService = (instance) => {
            this.server.addService(proto.DataService, instance);
        };
        this.server = new grpc.Server();
        this.port = this.server.bind('0.0.0.0:0', grpc.ServerCredentials.createInsecure());
    }
    run() {
        this.server.start();
        console.log(`1|2|tcp|localhost:${this.port}|grpc`);
    }
}
exports.BackendServer = BackendServer;
const logger = new logging_1.Logger();
exports.logger = logger;
grpc.setLogger(logger);
grpc.setLogVerbosity(grpc.logVerbosity.INFO);
//# sourceMappingURL=index.js.map