// package: pluginv2
// file: backend.proto

import * as jspb from 'google-protobuf';

export class AppInstanceSettings extends jspb.Message {
  getJsondata(): Uint8Array | string;
  getJsondata_asU8(): Uint8Array;
  getJsondata_asB64(): string;
  setJsondata(value: Uint8Array | string): void;

  getDecryptedsecurejsondataMap(): jspb.Map<string, string>;
  clearDecryptedsecurejsondataMap(): void;
  getLastupdatedms(): number;
  setLastupdatedms(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AppInstanceSettings.AsObject;
  static toObject(includeInstance: boolean, msg: AppInstanceSettings): AppInstanceSettings.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: AppInstanceSettings, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AppInstanceSettings;
  static deserializeBinaryFromReader(message: AppInstanceSettings, reader: jspb.BinaryReader): AppInstanceSettings;
}

export namespace AppInstanceSettings {
  export type AsObject = {
    jsondata: Uint8Array | string,
    decryptedsecurejsondataMap: Array<[string, string]>,
    lastupdatedms: number,
  }
}

export class DataSourceInstanceSettings extends jspb.Message {
  getId(): number;
  setId(value: number): void;

  getName(): string;
  setName(value: string): void;

  getUrl(): string;
  setUrl(value: string): void;

  getUser(): string;
  setUser(value: string): void;

  getDatabase(): string;
  setDatabase(value: string): void;

  getBasicauthenabled(): boolean;
  setBasicauthenabled(value: boolean): void;

  getBasicauthuser(): string;
  setBasicauthuser(value: string): void;

  getJsondata(): Uint8Array | string;
  getJsondata_asU8(): Uint8Array;
  getJsondata_asB64(): string;
  setJsondata(value: Uint8Array | string): void;

  getDecryptedsecurejsondataMap(): jspb.Map<string, string>;
  clearDecryptedsecurejsondataMap(): void;
  getLastupdatedms(): number;
  setLastupdatedms(value: number): void;

  getUid(): string;
  setUid(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DataSourceInstanceSettings.AsObject;
  static toObject(includeInstance: boolean, msg: DataSourceInstanceSettings): DataSourceInstanceSettings.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: DataSourceInstanceSettings, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DataSourceInstanceSettings;
  static deserializeBinaryFromReader(message: DataSourceInstanceSettings, reader: jspb.BinaryReader): DataSourceInstanceSettings;
}

export namespace DataSourceInstanceSettings {
  export type AsObject = {
    id: number,
    name: string,
    url: string,
    user: string,
    database: string,
    basicauthenabled: boolean,
    basicauthuser: string,
    jsondata: Uint8Array | string,
    decryptedsecurejsondataMap: Array<[string, string]>,
    lastupdatedms: number,
    uid: string,
  }
}

export class User extends jspb.Message {
  getLogin(): string;
  setLogin(value: string): void;

  getName(): string;
  setName(value: string): void;

  getEmail(): string;
  setEmail(value: string): void;

  getRole(): string;
  setRole(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): User.AsObject;
  static toObject(includeInstance: boolean, msg: User): User.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: User, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): User;
  static deserializeBinaryFromReader(message: User, reader: jspb.BinaryReader): User;
}

export namespace User {
  export type AsObject = {
    login: string,
    name: string,
    email: string,
    role: string,
  }
}

export class PluginContext extends jspb.Message {
  getOrgid(): number;
  setOrgid(value: number): void;

  getPluginid(): string;
  setPluginid(value: string): void;

  hasUser(): boolean;
  clearUser(): void;
  getUser(): User | undefined;
  setUser(value?: User): void;

  hasAppinstancesettings(): boolean;
  clearAppinstancesettings(): void;
  getAppinstancesettings(): AppInstanceSettings | undefined;
  setAppinstancesettings(value?: AppInstanceSettings): void;

  hasDatasourceinstancesettings(): boolean;
  clearDatasourceinstancesettings(): void;
  getDatasourceinstancesettings(): DataSourceInstanceSettings | undefined;
  setDatasourceinstancesettings(value?: DataSourceInstanceSettings): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PluginContext.AsObject;
  static toObject(includeInstance: boolean, msg: PluginContext): PluginContext.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: PluginContext, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PluginContext;
  static deserializeBinaryFromReader(message: PluginContext, reader: jspb.BinaryReader): PluginContext;
}

export namespace PluginContext {
  export type AsObject = {
    orgid: number,
    pluginid: string,
    user?: User.AsObject,
    appinstancesettings?: AppInstanceSettings.AsObject,
    datasourceinstancesettings?: DataSourceInstanceSettings.AsObject,
  }
}

export class StringList extends jspb.Message {
  clearValuesList(): void;
  getValuesList(): Array<string>;
  setValuesList(value: Array<string>): void;
  addValues(value: string, index?: number): string;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): StringList.AsObject;
  static toObject(includeInstance: boolean, msg: StringList): StringList.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: StringList, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): StringList;
  static deserializeBinaryFromReader(message: StringList, reader: jspb.BinaryReader): StringList;
}

export namespace StringList {
  export type AsObject = {
    valuesList: Array<string>,
  }
}

export class CallResourceRequest extends jspb.Message {
  hasPlugincontext(): boolean;
  clearPlugincontext(): void;
  getPlugincontext(): PluginContext | undefined;
  setPlugincontext(value?: PluginContext): void;

  getPath(): string;
  setPath(value: string): void;

  getMethod(): string;
  setMethod(value: string): void;

  getUrl(): string;
  setUrl(value: string): void;

  getHeadersMap(): jspb.Map<string, StringList>;
  clearHeadersMap(): void;
  getBody(): Uint8Array | string;
  getBody_asU8(): Uint8Array;
  getBody_asB64(): string;
  setBody(value: Uint8Array | string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CallResourceRequest.AsObject;
  static toObject(includeInstance: boolean, msg: CallResourceRequest): CallResourceRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: CallResourceRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CallResourceRequest;
  static deserializeBinaryFromReader(message: CallResourceRequest, reader: jspb.BinaryReader): CallResourceRequest;
}

export namespace CallResourceRequest {
  export type AsObject = {
    plugincontext?: PluginContext.AsObject,
    path: string,
    method: string,
    url: string,
    headersMap: Array<[string, StringList.AsObject]>,
    body: Uint8Array | string,
  }
}

export class CallResourceResponse extends jspb.Message {
  getCode(): number;
  setCode(value: number): void;

  getHeadersMap(): jspb.Map<string, StringList>;
  clearHeadersMap(): void;
  getBody(): Uint8Array | string;
  getBody_asU8(): Uint8Array;
  getBody_asB64(): string;
  setBody(value: Uint8Array | string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CallResourceResponse.AsObject;
  static toObject(includeInstance: boolean, msg: CallResourceResponse): CallResourceResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: CallResourceResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CallResourceResponse;
  static deserializeBinaryFromReader(message: CallResourceResponse, reader: jspb.BinaryReader): CallResourceResponse;
}

export namespace CallResourceResponse {
  export type AsObject = {
    code: number,
    headersMap: Array<[string, StringList.AsObject]>,
    body: Uint8Array | string,
  }
}

export class TimeRange extends jspb.Message {
  getFromepochms(): number;
  setFromepochms(value: number): void;

  getToepochms(): number;
  setToepochms(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TimeRange.AsObject;
  static toObject(includeInstance: boolean, msg: TimeRange): TimeRange.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: TimeRange, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): TimeRange;
  static deserializeBinaryFromReader(message: TimeRange, reader: jspb.BinaryReader): TimeRange;
}

export namespace TimeRange {
  export type AsObject = {
    fromepochms: number,
    toepochms: number,
  }
}

export class DataQuery extends jspb.Message {
  getRefid(): string;
  setRefid(value: string): void;

  getMaxdatapoints(): number;
  setMaxdatapoints(value: number): void;

  getIntervalms(): number;
  setIntervalms(value: number): void;

  hasTimerange(): boolean;
  clearTimerange(): void;
  getTimerange(): TimeRange | undefined;
  setTimerange(value?: TimeRange): void;

  getJson(): Uint8Array | string;
  getJson_asU8(): Uint8Array;
  getJson_asB64(): string;
  setJson(value: Uint8Array | string): void;

  getQuerytype(): string;
  setQuerytype(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DataQuery.AsObject;
  static toObject(includeInstance: boolean, msg: DataQuery): DataQuery.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: DataQuery, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DataQuery;
  static deserializeBinaryFromReader(message: DataQuery, reader: jspb.BinaryReader): DataQuery;
}

export namespace DataQuery {
  export type AsObject = {
    refid: string,
    maxdatapoints: number,
    intervalms: number,
    timerange?: TimeRange.AsObject,
    json: Uint8Array | string,
    querytype: string,
  }
}

export class QueryDataRequest extends jspb.Message {
  hasPlugincontext(): boolean;
  clearPlugincontext(): void;
  getPlugincontext(): PluginContext | undefined;
  setPlugincontext(value?: PluginContext): void;

  getHeadersMap(): jspb.Map<string, string>;
  clearHeadersMap(): void;
  clearQueriesList(): void;
  getQueriesList(): Array<DataQuery>;
  setQueriesList(value: Array<DataQuery>): void;
  addQueries(value?: DataQuery, index?: number): DataQuery;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): QueryDataRequest.AsObject;
  static toObject(includeInstance: boolean, msg: QueryDataRequest): QueryDataRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: QueryDataRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): QueryDataRequest;
  static deserializeBinaryFromReader(message: QueryDataRequest, reader: jspb.BinaryReader): QueryDataRequest;
}

export namespace QueryDataRequest {
  export type AsObject = {
    plugincontext?: PluginContext.AsObject,
    headersMap: Array<[string, string]>,
    queriesList: Array<DataQuery.AsObject>,
  }
}

export class QueryDataResponse extends jspb.Message {
  getResponsesMap(): jspb.Map<string, DataResponse>;
  clearResponsesMap(): void;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): QueryDataResponse.AsObject;
  static toObject(includeInstance: boolean, msg: QueryDataResponse): QueryDataResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: QueryDataResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): QueryDataResponse;
  static deserializeBinaryFromReader(message: QueryDataResponse, reader: jspb.BinaryReader): QueryDataResponse;
}

export namespace QueryDataResponse {
  export type AsObject = {
    responsesMap: Array<[string, DataResponse.AsObject]>,
  }
}

export class DataResponse extends jspb.Message {
  clearFramesList(): void;
  getFramesList(): Array<Uint8Array | string>;
  getFramesList_asU8(): Array<Uint8Array>;
  getFramesList_asB64(): Array<string>;
  setFramesList(value: Array<Uint8Array | string>): void;
  addFrames(value: Uint8Array | string, index?: number): Uint8Array | string;

  getError(): string;
  setError(value: string): void;

  getJsonmeta(): Uint8Array | string;
  getJsonmeta_asU8(): Uint8Array;
  getJsonmeta_asB64(): string;
  setJsonmeta(value: Uint8Array | string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DataResponse.AsObject;
  static toObject(includeInstance: boolean, msg: DataResponse): DataResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: DataResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DataResponse;
  static deserializeBinaryFromReader(message: DataResponse, reader: jspb.BinaryReader): DataResponse;
}

export namespace DataResponse {
  export type AsObject = {
    framesList: Array<Uint8Array | string>,
    error: string,
    jsonmeta: Uint8Array | string,
  }
}

export class CollectMetricsRequest extends jspb.Message {
  hasPlugincontext(): boolean;
  clearPlugincontext(): void;
  getPlugincontext(): PluginContext | undefined;
  setPlugincontext(value?: PluginContext): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CollectMetricsRequest.AsObject;
  static toObject(includeInstance: boolean, msg: CollectMetricsRequest): CollectMetricsRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: CollectMetricsRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CollectMetricsRequest;
  static deserializeBinaryFromReader(message: CollectMetricsRequest, reader: jspb.BinaryReader): CollectMetricsRequest;
}

export namespace CollectMetricsRequest {
  export type AsObject = {
    plugincontext?: PluginContext.AsObject,
  }
}

export class CollectMetricsResponse extends jspb.Message {
  hasMetrics(): boolean;
  clearMetrics(): void;
  getMetrics(): CollectMetricsResponse.Payload | undefined;
  setMetrics(value?: CollectMetricsResponse.Payload): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CollectMetricsResponse.AsObject;
  static toObject(includeInstance: boolean, msg: CollectMetricsResponse): CollectMetricsResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: CollectMetricsResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CollectMetricsResponse;
  static deserializeBinaryFromReader(message: CollectMetricsResponse, reader: jspb.BinaryReader): CollectMetricsResponse;
}

export namespace CollectMetricsResponse {
  export type AsObject = {
    metrics?: CollectMetricsResponse.Payload.AsObject,
  }

  export class Payload extends jspb.Message {
    getPrometheus(): Uint8Array | string;
    getPrometheus_asU8(): Uint8Array;
    getPrometheus_asB64(): string;
    setPrometheus(value: Uint8Array | string): void;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Payload.AsObject;
    static toObject(includeInstance: boolean, msg: Payload): Payload.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Payload, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Payload;
    static deserializeBinaryFromReader(message: Payload, reader: jspb.BinaryReader): Payload;
  }

  export namespace Payload {
    export type AsObject = {
      prometheus: Uint8Array | string,
    }
  }
}

export class CheckHealthRequest extends jspb.Message {
  hasPlugincontext(): boolean;
  clearPlugincontext(): void;
  getPlugincontext(): PluginContext | undefined;
  setPlugincontext(value?: PluginContext): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CheckHealthRequest.AsObject;
  static toObject(includeInstance: boolean, msg: CheckHealthRequest): CheckHealthRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: CheckHealthRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CheckHealthRequest;
  static deserializeBinaryFromReader(message: CheckHealthRequest, reader: jspb.BinaryReader): CheckHealthRequest;
}

export namespace CheckHealthRequest {
  export type AsObject = {
    plugincontext?: PluginContext.AsObject,
  }
}

export class CheckHealthResponse extends jspb.Message {
  getStatus(): CheckHealthResponse.HealthStatus;
  setStatus(value: CheckHealthResponse.HealthStatus): void;

  getMessage(): string;
  setMessage(value: string): void;

  getJsondetails(): Uint8Array | string;
  getJsondetails_asU8(): Uint8Array;
  getJsondetails_asB64(): string;
  setJsondetails(value: Uint8Array | string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CheckHealthResponse.AsObject;
  static toObject(includeInstance: boolean, msg: CheckHealthResponse): CheckHealthResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: CheckHealthResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CheckHealthResponse;
  static deserializeBinaryFromReader(message: CheckHealthResponse, reader: jspb.BinaryReader): CheckHealthResponse;
}

export namespace CheckHealthResponse {
  export type AsObject = {
    status: CheckHealthResponse.HealthStatus,
    message: string,
    jsondetails: Uint8Array | string,
  }

  export enum HealthStatus {
    UNKNOWN = 0,
    OK = 1,
    ERROR = 2,
  }
}

export class SubscribeStreamRequest extends jspb.Message {
  hasPlugincontext(): boolean;
  clearPlugincontext(): void;
  getPlugincontext(): PluginContext | undefined;
  setPlugincontext(value?: PluginContext): void;

  getPath(): string;
  setPath(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SubscribeStreamRequest.AsObject;
  static toObject(includeInstance: boolean, msg: SubscribeStreamRequest): SubscribeStreamRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SubscribeStreamRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SubscribeStreamRequest;
  static deserializeBinaryFromReader(message: SubscribeStreamRequest, reader: jspb.BinaryReader): SubscribeStreamRequest;
}

export namespace SubscribeStreamRequest {
  export type AsObject = {
    plugincontext?: PluginContext.AsObject,
    path: string,
  }
}

export class SubscribeStreamResponse extends jspb.Message {
  getStatus(): SubscribeStreamResponse.Status;
  setStatus(value: SubscribeStreamResponse.Status): void;

  getData(): Uint8Array | string;
  getData_asU8(): Uint8Array;
  getData_asB64(): string;
  setData(value: Uint8Array | string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SubscribeStreamResponse.AsObject;
  static toObject(includeInstance: boolean, msg: SubscribeStreamResponse): SubscribeStreamResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SubscribeStreamResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SubscribeStreamResponse;
  static deserializeBinaryFromReader(message: SubscribeStreamResponse, reader: jspb.BinaryReader): SubscribeStreamResponse;
}

export namespace SubscribeStreamResponse {
  export type AsObject = {
    status: SubscribeStreamResponse.Status,
    data: Uint8Array | string,
  }

  export enum Status {
    OK = 0,
    NOT_FOUND = 1,
    PERMISSION_DENIED = 2,
  }
}

export class PublishStreamRequest extends jspb.Message {
  hasPlugincontext(): boolean;
  clearPlugincontext(): void;
  getPlugincontext(): PluginContext | undefined;
  setPlugincontext(value?: PluginContext): void;

  getPath(): string;
  setPath(value: string): void;

  getData(): Uint8Array | string;
  getData_asU8(): Uint8Array;
  getData_asB64(): string;
  setData(value: Uint8Array | string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PublishStreamRequest.AsObject;
  static toObject(includeInstance: boolean, msg: PublishStreamRequest): PublishStreamRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: PublishStreamRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PublishStreamRequest;
  static deserializeBinaryFromReader(message: PublishStreamRequest, reader: jspb.BinaryReader): PublishStreamRequest;
}

export namespace PublishStreamRequest {
  export type AsObject = {
    plugincontext?: PluginContext.AsObject,
    path: string,
    data: Uint8Array | string,
  }
}

export class PublishStreamResponse extends jspb.Message {
  getStatus(): PublishStreamResponse.Status;
  setStatus(value: PublishStreamResponse.Status): void;

  getData(): Uint8Array | string;
  getData_asU8(): Uint8Array;
  getData_asB64(): string;
  setData(value: Uint8Array | string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PublishStreamResponse.AsObject;
  static toObject(includeInstance: boolean, msg: PublishStreamResponse): PublishStreamResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: PublishStreamResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PublishStreamResponse;
  static deserializeBinaryFromReader(message: PublishStreamResponse, reader: jspb.BinaryReader): PublishStreamResponse;
}

export namespace PublishStreamResponse {
  export type AsObject = {
    status: PublishStreamResponse.Status,
    data: Uint8Array | string,
  }

  export enum Status {
    OK = 0,
    NOT_FOUND = 1,
    PERMISSION_DENIED = 2,
  }
}

export class RunStreamRequest extends jspb.Message {
  hasPlugincontext(): boolean;
  clearPlugincontext(): void;
  getPlugincontext(): PluginContext | undefined;
  setPlugincontext(value?: PluginContext): void;

  getPath(): string;
  setPath(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RunStreamRequest.AsObject;
  static toObject(includeInstance: boolean, msg: RunStreamRequest): RunStreamRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: RunStreamRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RunStreamRequest;
  static deserializeBinaryFromReader(message: RunStreamRequest, reader: jspb.BinaryReader): RunStreamRequest;
}

export namespace RunStreamRequest {
  export type AsObject = {
    plugincontext?: PluginContext.AsObject,
    path: string,
  }
}

export class StreamPacket extends jspb.Message {
  getData(): Uint8Array | string;
  getData_asU8(): Uint8Array;
  getData_asB64(): string;
  setData(value: Uint8Array | string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): StreamPacket.AsObject;
  static toObject(includeInstance: boolean, msg: StreamPacket): StreamPacket.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: StreamPacket, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): StreamPacket;
  static deserializeBinaryFromReader(message: StreamPacket, reader: jspb.BinaryReader): StreamPacket;
}

export namespace StreamPacket {
  export type AsObject = {
    data: Uint8Array | string,
  }
}

