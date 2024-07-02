// package: pluginv2
// file: backend.proto

import * as grpc from '@grpc/grpc-js';
import * as backend_pb from './backend_pb';

interface IResourceService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
  callResource: IResourceService_ICallResource;
}

interface IResourceService_ICallResource extends grpc.MethodDefinition<backend_pb.CallResourceRequest, backend_pb.CallResourceResponse> {
  path: '/pluginv2.Resource/CallResource'
  requestStream: false
  responseStream: true
  requestSerialize: grpc.serialize<backend_pb.CallResourceRequest>;
  requestDeserialize: grpc.deserialize<backend_pb.CallResourceRequest>;
  responseSerialize: grpc.serialize<backend_pb.CallResourceResponse>;
  responseDeserialize: grpc.deserialize<backend_pb.CallResourceResponse>;
}

export const ResourceService: IResourceService;
export interface IResourceServer extends grpc.UntypedServiceImplementation {
  callResource: grpc.handleServerStreamingCall<backend_pb.CallResourceRequest, backend_pb.CallResourceResponse>;
}

export interface IResourceClient {
  callResource(request: backend_pb.CallResourceRequest, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<backend_pb.CallResourceResponse>;
  callResource(request: backend_pb.CallResourceRequest, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<backend_pb.CallResourceResponse>;
}

export class ResourceClient extends grpc.Client implements IResourceClient {
  constructor(address: string, credentials: grpc.ChannelCredentials, options?: Partial<grpc.ClientOptions>);
  public callResource(request: backend_pb.CallResourceRequest, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<backend_pb.CallResourceResponse>;
  public callResource(request: backend_pb.CallResourceRequest, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<backend_pb.CallResourceResponse>;
}

interface IDataService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
  queryData: IDataService_IQueryData;
}

interface IDataService_IQueryData extends grpc.MethodDefinition<backend_pb.QueryDataRequest, backend_pb.QueryDataResponse> {
  path: '/pluginv2.Data/QueryData'
  requestStream: false
  responseStream: false
  requestSerialize: grpc.serialize<backend_pb.QueryDataRequest>;
  requestDeserialize: grpc.deserialize<backend_pb.QueryDataRequest>;
  responseSerialize: grpc.serialize<backend_pb.QueryDataResponse>;
  responseDeserialize: grpc.deserialize<backend_pb.QueryDataResponse>;
}

export const DataService: IDataService;
export interface IDataServer extends grpc.UntypedServiceImplementation {
  queryData: grpc.handleUnaryCall<backend_pb.QueryDataRequest, backend_pb.QueryDataResponse>;
}

export interface IDataClient {
  queryData(request: backend_pb.QueryDataRequest, callback: (error: grpc.ServiceError | null, response: backend_pb.QueryDataResponse) => void): grpc.ClientUnaryCall;
  queryData(request: backend_pb.QueryDataRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: backend_pb.QueryDataResponse) => void): grpc.ClientUnaryCall;
  queryData(request: backend_pb.QueryDataRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: backend_pb.QueryDataResponse) => void): grpc.ClientUnaryCall;
}

export class DataClient extends grpc.Client implements IDataClient {
  constructor(address: string, credentials: grpc.ChannelCredentials, options?: Partial<grpc.ClientOptions>);
  public queryData(request: backend_pb.QueryDataRequest, callback: (error: grpc.ServiceError | null, response: backend_pb.QueryDataResponse) => void): grpc.ClientUnaryCall;
  public queryData(request: backend_pb.QueryDataRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: backend_pb.QueryDataResponse) => void): grpc.ClientUnaryCall;
  public queryData(request: backend_pb.QueryDataRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: backend_pb.QueryDataResponse) => void): grpc.ClientUnaryCall;
}

interface IDiagnosticsService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
  checkHealth: IDiagnosticsService_ICheckHealth;
  collectMetrics: IDiagnosticsService_ICollectMetrics;
}

interface IDiagnosticsService_ICheckHealth extends grpc.MethodDefinition<backend_pb.CheckHealthRequest, backend_pb.CheckHealthResponse> {
  path: '/pluginv2.Diagnostics/CheckHealth'
  requestStream: false
  responseStream: false
  requestSerialize: grpc.serialize<backend_pb.CheckHealthRequest>;
  requestDeserialize: grpc.deserialize<backend_pb.CheckHealthRequest>;
  responseSerialize: grpc.serialize<backend_pb.CheckHealthResponse>;
  responseDeserialize: grpc.deserialize<backend_pb.CheckHealthResponse>;
}

interface IDiagnosticsService_ICollectMetrics extends grpc.MethodDefinition<backend_pb.CollectMetricsRequest, backend_pb.CollectMetricsResponse> {
  path: '/pluginv2.Diagnostics/CollectMetrics'
  requestStream: false
  responseStream: false
  requestSerialize: grpc.serialize<backend_pb.CollectMetricsRequest>;
  requestDeserialize: grpc.deserialize<backend_pb.CollectMetricsRequest>;
  responseSerialize: grpc.serialize<backend_pb.CollectMetricsResponse>;
  responseDeserialize: grpc.deserialize<backend_pb.CollectMetricsResponse>;
}

export const DiagnosticsService: IDiagnosticsService;
export interface IDiagnosticsServer extends grpc.UntypedServiceImplementation {
  checkHealth: grpc.handleUnaryCall<backend_pb.CheckHealthRequest, backend_pb.CheckHealthResponse>;
  collectMetrics: grpc.handleUnaryCall<backend_pb.CollectMetricsRequest, backend_pb.CollectMetricsResponse>;
}

export interface IDiagnosticsClient {
  checkHealth(request: backend_pb.CheckHealthRequest, callback: (error: grpc.ServiceError | null, response: backend_pb.CheckHealthResponse) => void): grpc.ClientUnaryCall;
  checkHealth(request: backend_pb.CheckHealthRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: backend_pb.CheckHealthResponse) => void): grpc.ClientUnaryCall;
  checkHealth(request: backend_pb.CheckHealthRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: backend_pb.CheckHealthResponse) => void): grpc.ClientUnaryCall;
  collectMetrics(request: backend_pb.CollectMetricsRequest, callback: (error: grpc.ServiceError | null, response: backend_pb.CollectMetricsResponse) => void): grpc.ClientUnaryCall;
  collectMetrics(request: backend_pb.CollectMetricsRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: backend_pb.CollectMetricsResponse) => void): grpc.ClientUnaryCall;
  collectMetrics(request: backend_pb.CollectMetricsRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: backend_pb.CollectMetricsResponse) => void): grpc.ClientUnaryCall;
}

export class DiagnosticsClient extends grpc.Client implements IDiagnosticsClient {
  constructor(address: string, credentials: grpc.ChannelCredentials, options?: Partial<grpc.ClientOptions>);
  public checkHealth(request: backend_pb.CheckHealthRequest, callback: (error: grpc.ServiceError | null, response: backend_pb.CheckHealthResponse) => void): grpc.ClientUnaryCall;
  public checkHealth(request: backend_pb.CheckHealthRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: backend_pb.CheckHealthResponse) => void): grpc.ClientUnaryCall;
  public checkHealth(request: backend_pb.CheckHealthRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: backend_pb.CheckHealthResponse) => void): grpc.ClientUnaryCall;
  public collectMetrics(request: backend_pb.CollectMetricsRequest, callback: (error: grpc.ServiceError | null, response: backend_pb.CollectMetricsResponse) => void): grpc.ClientUnaryCall;
  public collectMetrics(request: backend_pb.CollectMetricsRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: backend_pb.CollectMetricsResponse) => void): grpc.ClientUnaryCall;
  public collectMetrics(request: backend_pb.CollectMetricsRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: backend_pb.CollectMetricsResponse) => void): grpc.ClientUnaryCall;
}

interface IStreamService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
  subscribeStream: IStreamService_ISubscribeStream;
  runStream: IStreamService_IRunStream;
  publishStream: IStreamService_IPublishStream;
}

interface IStreamService_ISubscribeStream extends grpc.MethodDefinition<backend_pb.SubscribeStreamRequest, backend_pb.SubscribeStreamResponse> {
  path: '/pluginv2.Stream/SubscribeStream'
  requestStream: false
  responseStream: false
  requestSerialize: grpc.serialize<backend_pb.SubscribeStreamRequest>;
  requestDeserialize: grpc.deserialize<backend_pb.SubscribeStreamRequest>;
  responseSerialize: grpc.serialize<backend_pb.SubscribeStreamResponse>;
  responseDeserialize: grpc.deserialize<backend_pb.SubscribeStreamResponse>;
}

interface IStreamService_IRunStream extends grpc.MethodDefinition<backend_pb.RunStreamRequest, backend_pb.StreamPacket> {
  path: '/pluginv2.Stream/RunStream'
  requestStream: false
  responseStream: true
  requestSerialize: grpc.serialize<backend_pb.RunStreamRequest>;
  requestDeserialize: grpc.deserialize<backend_pb.RunStreamRequest>;
  responseSerialize: grpc.serialize<backend_pb.StreamPacket>;
  responseDeserialize: grpc.deserialize<backend_pb.StreamPacket>;
}

interface IStreamService_IPublishStream extends grpc.MethodDefinition<backend_pb.PublishStreamRequest, backend_pb.PublishStreamResponse> {
  path: '/pluginv2.Stream/PublishStream'
  requestStream: false
  responseStream: false
  requestSerialize: grpc.serialize<backend_pb.PublishStreamRequest>;
  requestDeserialize: grpc.deserialize<backend_pb.PublishStreamRequest>;
  responseSerialize: grpc.serialize<backend_pb.PublishStreamResponse>;
  responseDeserialize: grpc.deserialize<backend_pb.PublishStreamResponse>;
}

export const StreamService: IStreamService;
export interface IStreamServer extends grpc.UntypedServiceImplementation {
  subscribeStream: grpc.handleUnaryCall<backend_pb.SubscribeStreamRequest, backend_pb.SubscribeStreamResponse>;
  runStream: grpc.handleServerStreamingCall<backend_pb.RunStreamRequest, backend_pb.StreamPacket>;
  publishStream: grpc.handleUnaryCall<backend_pb.PublishStreamRequest, backend_pb.PublishStreamResponse>;
}

export interface IStreamClient {
  subscribeStream(request: backend_pb.SubscribeStreamRequest, callback: (error: grpc.ServiceError | null, response: backend_pb.SubscribeStreamResponse) => void): grpc.ClientUnaryCall;
  subscribeStream(request: backend_pb.SubscribeStreamRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: backend_pb.SubscribeStreamResponse) => void): grpc.ClientUnaryCall;
  subscribeStream(request: backend_pb.SubscribeStreamRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: backend_pb.SubscribeStreamResponse) => void): grpc.ClientUnaryCall;
  runStream(request: backend_pb.RunStreamRequest, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<backend_pb.StreamPacket>;
  runStream(request: backend_pb.RunStreamRequest, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<backend_pb.StreamPacket>;
  publishStream(request: backend_pb.PublishStreamRequest, callback: (error: grpc.ServiceError | null, response: backend_pb.PublishStreamResponse) => void): grpc.ClientUnaryCall;
  publishStream(request: backend_pb.PublishStreamRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: backend_pb.PublishStreamResponse) => void): grpc.ClientUnaryCall;
  publishStream(request: backend_pb.PublishStreamRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: backend_pb.PublishStreamResponse) => void): grpc.ClientUnaryCall;
}

export class StreamClient extends grpc.Client implements IStreamClient {
  constructor(address: string, credentials: grpc.ChannelCredentials, options?: Partial<grpc.ClientOptions>);
  public subscribeStream(request: backend_pb.SubscribeStreamRequest, callback: (error: grpc.ServiceError | null, response: backend_pb.SubscribeStreamResponse) => void): grpc.ClientUnaryCall;
  public subscribeStream(request: backend_pb.SubscribeStreamRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: backend_pb.SubscribeStreamResponse) => void): grpc.ClientUnaryCall;
  public subscribeStream(request: backend_pb.SubscribeStreamRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: backend_pb.SubscribeStreamResponse) => void): grpc.ClientUnaryCall;
  public runStream(request: backend_pb.RunStreamRequest, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<backend_pb.StreamPacket>;
  public runStream(request: backend_pb.RunStreamRequest, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<backend_pb.StreamPacket>;
  public publishStream(request: backend_pb.PublishStreamRequest, callback: (error: grpc.ServiceError | null, response: backend_pb.PublishStreamResponse) => void): grpc.ClientUnaryCall;
  public publishStream(request: backend_pb.PublishStreamRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: backend_pb.PublishStreamResponse) => void): grpc.ClientUnaryCall;
  public publishStream(request: backend_pb.PublishStreamRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: backend_pb.PublishStreamResponse) => void): grpc.ClientUnaryCall;
}

