/**
 * @fileoverview gRPC-Web generated client stub for shopping.v1
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck



const grpc = {};
grpc.web = require('grpc-web');

const proto = {};
proto.shopping = {};
proto.shopping.v1 = require('./orders_service_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.shopping.v1.OrdersServiceClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options.format = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.shopping.v1.OrdersServicePromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options.format = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.shopping.v1.ListOrdersRequest,
 *   !proto.shopping.v1.ListOrdersResponse>}
 */
const methodDescriptor_OrdersService_ListOrders = new grpc.web.MethodDescriptor(
  '/shopping.v1.OrdersService/ListOrders',
  grpc.web.MethodType.UNARY,
  proto.shopping.v1.ListOrdersRequest,
  proto.shopping.v1.ListOrdersResponse,
  /**
   * @param {!proto.shopping.v1.ListOrdersRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.shopping.v1.ListOrdersResponse.deserializeBinary
);


/**
 * @param {!proto.shopping.v1.ListOrdersRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.shopping.v1.ListOrdersResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.shopping.v1.ListOrdersResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.shopping.v1.OrdersServiceClient.prototype.listOrders =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/shopping.v1.OrdersService/ListOrders',
      request,
      metadata || {},
      methodDescriptor_OrdersService_ListOrders,
      callback);
};


/**
 * @param {!proto.shopping.v1.ListOrdersRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.shopping.v1.ListOrdersResponse>}
 *     Promise that resolves to the response
 */
proto.shopping.v1.OrdersServicePromiseClient.prototype.listOrders =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/shopping.v1.OrdersService/ListOrders',
      request,
      metadata || {},
      methodDescriptor_OrdersService_ListOrders);
};


module.exports = proto.shopping.v1;

