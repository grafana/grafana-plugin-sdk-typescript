// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var backend_pb = require('./backend_pb.js');

function serialize_pluginv2_CallResourceRequest(arg) {
  if (!(arg instanceof backend_pb.CallResourceRequest)) {
    throw new Error('Expected argument of type pluginv2.CallResourceRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_pluginv2_CallResourceRequest(buffer_arg) {
  return backend_pb.CallResourceRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_pluginv2_CallResourceResponse(arg) {
  if (!(arg instanceof backend_pb.CallResourceResponse)) {
    throw new Error('Expected argument of type pluginv2.CallResourceResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_pluginv2_CallResourceResponse(buffer_arg) {
  return backend_pb.CallResourceResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_pluginv2_CheckHealthRequest(arg) {
  if (!(arg instanceof backend_pb.CheckHealthRequest)) {
    throw new Error('Expected argument of type pluginv2.CheckHealthRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_pluginv2_CheckHealthRequest(buffer_arg) {
  return backend_pb.CheckHealthRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_pluginv2_CheckHealthResponse(arg) {
  if (!(arg instanceof backend_pb.CheckHealthResponse)) {
    throw new Error('Expected argument of type pluginv2.CheckHealthResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_pluginv2_CheckHealthResponse(buffer_arg) {
  return backend_pb.CheckHealthResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_pluginv2_CollectMetricsRequest(arg) {
  if (!(arg instanceof backend_pb.CollectMetricsRequest)) {
    throw new Error('Expected argument of type pluginv2.CollectMetricsRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_pluginv2_CollectMetricsRequest(buffer_arg) {
  return backend_pb.CollectMetricsRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_pluginv2_CollectMetricsResponse(arg) {
  if (!(arg instanceof backend_pb.CollectMetricsResponse)) {
    throw new Error('Expected argument of type pluginv2.CollectMetricsResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_pluginv2_CollectMetricsResponse(buffer_arg) {
  return backend_pb.CollectMetricsResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_pluginv2_PublishStreamRequest(arg) {
  if (!(arg instanceof backend_pb.PublishStreamRequest)) {
    throw new Error('Expected argument of type pluginv2.PublishStreamRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_pluginv2_PublishStreamRequest(buffer_arg) {
  return backend_pb.PublishStreamRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_pluginv2_PublishStreamResponse(arg) {
  if (!(arg instanceof backend_pb.PublishStreamResponse)) {
    throw new Error('Expected argument of type pluginv2.PublishStreamResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_pluginv2_PublishStreamResponse(buffer_arg) {
  return backend_pb.PublishStreamResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_pluginv2_QueryDataRequest(arg) {
  if (!(arg instanceof backend_pb.QueryDataRequest)) {
    throw new Error('Expected argument of type pluginv2.QueryDataRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_pluginv2_QueryDataRequest(buffer_arg) {
  return backend_pb.QueryDataRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_pluginv2_QueryDataResponse(arg) {
  if (!(arg instanceof backend_pb.QueryDataResponse)) {
    throw new Error('Expected argument of type pluginv2.QueryDataResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_pluginv2_QueryDataResponse(buffer_arg) {
  return backend_pb.QueryDataResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_pluginv2_RunStreamRequest(arg) {
  if (!(arg instanceof backend_pb.RunStreamRequest)) {
    throw new Error('Expected argument of type pluginv2.RunStreamRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_pluginv2_RunStreamRequest(buffer_arg) {
  return backend_pb.RunStreamRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_pluginv2_StreamPacket(arg) {
  if (!(arg instanceof backend_pb.StreamPacket)) {
    throw new Error('Expected argument of type pluginv2.StreamPacket');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_pluginv2_StreamPacket(buffer_arg) {
  return backend_pb.StreamPacket.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_pluginv2_SubscribeStreamRequest(arg) {
  if (!(arg instanceof backend_pb.SubscribeStreamRequest)) {
    throw new Error('Expected argument of type pluginv2.SubscribeStreamRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_pluginv2_SubscribeStreamRequest(buffer_arg) {
  return backend_pb.SubscribeStreamRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_pluginv2_SubscribeStreamResponse(arg) {
  if (!(arg instanceof backend_pb.SubscribeStreamResponse)) {
    throw new Error('Expected argument of type pluginv2.SubscribeStreamResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_pluginv2_SubscribeStreamResponse(buffer_arg) {
  return backend_pb.SubscribeStreamResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


// ---------------------------------------------------------
// Resource service enables HTTP-style requests over gRPC.
// ---------------------------------------------------------
//
var ResourceService = exports.ResourceService = {
  callResource: {
    path: '/pluginv2.Resource/CallResource',
    requestStream: false,
    responseStream: true,
    requestType: backend_pb.CallResourceRequest,
    responseType: backend_pb.CallResourceResponse,
    requestSerialize: serialize_pluginv2_CallResourceRequest,
    requestDeserialize: deserialize_pluginv2_CallResourceRequest,
    responseSerialize: serialize_pluginv2_CallResourceResponse,
    responseDeserialize: deserialize_pluginv2_CallResourceResponse,
  },
};

exports.ResourceClient = grpc.makeGenericClientConstructor(ResourceService);
// -----------------------------------------------
// Data
// -----------------------------------------------
//
var DataService = exports.DataService = {
  queryData: {
    path: '/pluginv2.Data/QueryData',
    requestStream: false,
    responseStream: false,
    requestType: backend_pb.QueryDataRequest,
    responseType: backend_pb.QueryDataResponse,
    requestSerialize: serialize_pluginv2_QueryDataRequest,
    requestDeserialize: deserialize_pluginv2_QueryDataRequest,
    responseSerialize: serialize_pluginv2_QueryDataResponse,
    responseDeserialize: deserialize_pluginv2_QueryDataResponse,
  },
};

exports.DataClient = grpc.makeGenericClientConstructor(DataService);
// -----------------------------------------------
// Diagnostics
// -----------------------------------------------
//
var DiagnosticsService = exports.DiagnosticsService = {
  checkHealth: {
    path: '/pluginv2.Diagnostics/CheckHealth',
    requestStream: false,
    responseStream: false,
    requestType: backend_pb.CheckHealthRequest,
    responseType: backend_pb.CheckHealthResponse,
    requestSerialize: serialize_pluginv2_CheckHealthRequest,
    requestDeserialize: deserialize_pluginv2_CheckHealthRequest,
    responseSerialize: serialize_pluginv2_CheckHealthResponse,
    responseDeserialize: deserialize_pluginv2_CheckHealthResponse,
  },
  collectMetrics: {
    path: '/pluginv2.Diagnostics/CollectMetrics',
    requestStream: false,
    responseStream: false,
    requestType: backend_pb.CollectMetricsRequest,
    responseType: backend_pb.CollectMetricsResponse,
    requestSerialize: serialize_pluginv2_CollectMetricsRequest,
    requestDeserialize: deserialize_pluginv2_CollectMetricsRequest,
    responseSerialize: serialize_pluginv2_CollectMetricsResponse,
    responseDeserialize: deserialize_pluginv2_CollectMetricsResponse,
  },
};

exports.DiagnosticsClient = grpc.makeGenericClientConstructor(DiagnosticsService);
// -----------------------------------------------------------------
// Stream -- EXPERIMENTAL and is subject to change until 8.0
// -----------------------------------------------------------------
//
var StreamService = exports.StreamService = {
  // SubscribeStream called when a user tries to subscribe to a plugin/datasource
  // managed channel path – thus plugin can check subscribe permissions and communicate
  // options with Grafana Core. When the first subscriber joins a channel, RunStream
  // will be called. 
  subscribeStream: {
    path: '/pluginv2.Stream/SubscribeStream',
    requestStream: false,
    responseStream: false,
    requestType: backend_pb.SubscribeStreamRequest,
    responseType: backend_pb.SubscribeStreamResponse,
    requestSerialize: serialize_pluginv2_SubscribeStreamRequest,
    requestDeserialize: deserialize_pluginv2_SubscribeStreamRequest,
    responseSerialize: serialize_pluginv2_SubscribeStreamResponse,
    responseDeserialize: deserialize_pluginv2_SubscribeStreamResponse,
  },
  // RunStream will be initiated by Grafana to consume a stream. RunStream will be
  // called once for the first client successfully subscribed to a channel path.
  // When Grafana detects that there are no longer any subscribers inside a channel,
  // the call will be terminated until next active subscriber appears. Call termination
  // can happen with a delay.
  runStream: {
    path: '/pluginv2.Stream/RunStream',
    requestStream: false,
    responseStream: true,
    requestType: backend_pb.RunStreamRequest,
    responseType: backend_pb.StreamPacket,
    requestSerialize: serialize_pluginv2_RunStreamRequest,
    requestDeserialize: deserialize_pluginv2_RunStreamRequest,
    responseSerialize: serialize_pluginv2_StreamPacket,
    responseDeserialize: deserialize_pluginv2_StreamPacket,
  },
  // PublishStream called when a user tries to publish to a plugin/datasource
  // managed channel path. Here plugin can check publish permissions and
  // modify publication data if required.
  publishStream: {
    path: '/pluginv2.Stream/PublishStream',
    requestStream: false,
    responseStream: false,
    requestType: backend_pb.PublishStreamRequest,
    responseType: backend_pb.PublishStreamResponse,
    requestSerialize: serialize_pluginv2_PublishStreamRequest,
    requestDeserialize: deserialize_pluginv2_PublishStreamRequest,
    responseSerialize: serialize_pluginv2_PublishStreamResponse,
    responseDeserialize: deserialize_pluginv2_PublishStreamResponse,
  },
};

exports.StreamClient = grpc.makeGenericClientConstructor(StreamService);
