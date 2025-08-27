import * as grpcWeb from 'grpc-web';

import * as orders_service_pb from './orders_service_pb'; // proto import: "orders_service.proto"


export class OrdersServiceClient {
  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; });

  listOrders(
    request: orders_service_pb.ListOrdersRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: orders_service_pb.ListOrdersResponse) => void
  ): grpcWeb.ClientReadableStream<orders_service_pb.ListOrdersResponse>;

}

export class OrdersServicePromiseClient {
  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; });

  listOrders(
    request: orders_service_pb.ListOrdersRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<orders_service_pb.ListOrdersResponse>;

}

