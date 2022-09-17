import * as jspb from 'google-protobuf'



export class ListOrdersRequest extends jspb.Message {
  getPageSize(): number;
  setPageSize(value: number): ListOrdersRequest;

  getPageToken(): string;
  setPageToken(value: string): ListOrdersRequest;

  getQuery(): string;
  setQuery(value: string): ListOrdersRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ListOrdersRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ListOrdersRequest): ListOrdersRequest.AsObject;
  static serializeBinaryToWriter(message: ListOrdersRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ListOrdersRequest;
  static deserializeBinaryFromReader(message: ListOrdersRequest, reader: jspb.BinaryReader): ListOrdersRequest;
}

export namespace ListOrdersRequest {
  export type AsObject = {
    pageSize: number,
    pageToken: string,
    query: string,
  }
}

export class ListOrdersResponse extends jspb.Message {
  getOrdersList(): Array<Order>;
  setOrdersList(value: Array<Order>): ListOrdersResponse;
  clearOrdersList(): ListOrdersResponse;
  addOrders(value?: Order, index?: number): Order;

  getNextPageToken(): string;
  setNextPageToken(value: string): ListOrdersResponse;

  getTotalSize(): number;
  setTotalSize(value: number): ListOrdersResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ListOrdersResponse.AsObject;
  static toObject(includeInstance: boolean, msg: ListOrdersResponse): ListOrdersResponse.AsObject;
  static serializeBinaryToWriter(message: ListOrdersResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ListOrdersResponse;
  static deserializeBinaryFromReader(message: ListOrdersResponse, reader: jspb.BinaryReader): ListOrdersResponse;
}

export namespace ListOrdersResponse {
  export type AsObject = {
    ordersList: Array<Order.AsObject>,
    nextPageToken: string,
    totalSize: number,
  }
}

export class Order extends jspb.Message {
  getId(): string;
  setId(value: string): Order;

  getName(): string;
  setName(value: string): Order;

  getDescription(): string;
  setDescription(value: string): Order;

  getStatus(): string;
  setStatus(value: string): Order;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Order.AsObject;
  static toObject(includeInstance: boolean, msg: Order): Order.AsObject;
  static serializeBinaryToWriter(message: Order, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Order;
  static deserializeBinaryFromReader(message: Order, reader: jspb.BinaryReader): Order;
}

export namespace Order {
  export type AsObject = {
    id: string,
    name: string,
    description: string,
    status: string,
  }
}

