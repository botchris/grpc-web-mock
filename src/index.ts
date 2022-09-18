import * as jspb from "google-protobuf";
import { Code, Status } from "./status";

/**
 * Response represents an HTTP response coming from a gRPC-web backend.
 *
 * Depending on the protocol being used, the response body may be a binary
 * protocol-buffer message or a base64-encoded protocol buffer message.
 */
export interface Response {
	statusCode?: number;
	statusText?: string;
	headers?: { [key: string]: string };
	body?: Uint8Array | string;
}

/**
 * Takes a Protocol Buffer message and returns a base64-encoded gRPC response
 * as it would be sent by a gRPC-web server using "grpc-web-text" encoding.
 *
 * @param message A Protocol Buffer message.
 * @param status Optional gRPC status response, by default the status code is 0 (OK).
 */
export const ToTextResponse = (message: jspb.Message, status: Status = { code: Code.OK }): Response => {
	const msg = framerBase64(message.serializeBinary(), FrameType.DATA);
	const tail = framerBase64(trailerMessage(status), FrameType.TRAILER);
	const {code, text} = codeToHTTP(status.code);

	return {
		statusCode: code,
		statusText: text,
		headers: {
			"content-type": "application/grpc-web-text",
			"grpc-status": status.code.toString(),
			"grpc-message": status.details || "",
		},
		body: msg + tail,
	};
};

/**
 * Takes a Protocol Buffer message and returns a binary-encoded gRPC response
 * as it would be sent by a gRPC-web server using "grpc-web+proto" encoding.
 *
 * @param message A Protocol Buffer message.
 * @param status Optional gRPC status response, by default the status code is 0 (OK).
 */
export const ToBinaryResponse = (message: jspb.Message, status: Status = { code: Code.OK }): Response => {
	const msg = framerBinary(message.serializeBinary(), FrameType.DATA);
	const tail = framerBinary(trailerMessage(status), FrameType.TRAILER);
	const buffer = new Uint8Array(msg.length + tail.length);
	const {code, text} = codeToHTTP(status.code);

	buffer.set(msg, 0);
	buffer.set(tail, msg.length);

	return {
		statusCode: code,
		statusText: text,
		headers: {
			"content-type": "application/grpc-web+proto",
			"grpc-status": status.code.toString(),
			"grpc-message": status.details || "",
		},
		body: buffer,
	};
};

const trailerMessage = (status: Status): Uint8Array => {
	const code = status.code;
	const details = status.details || "";

	let headers = "grpc-status:" + code + "\r\n";
	headers += "grpc-message:" + details + "\r\n";

	let utf8Encode = new TextEncoder();

	return utf8Encode.encode(headers);
};

const framerBase64 = (message: Uint8Array, type: FrameType): string => {
	const bytes = framerBinary(message, type);
	const writer = new jspb.BinaryWriter();

	writer.writeSerializedMessage(bytes, 0, bytes.length);

	return writer.getResultBase64String();
};

const framerBinary = (message: Uint8Array, type: FrameType): Uint8Array => {
	const prefix = getPrefix(message, type);
	const buffer = new Uint8Array(prefix.length + message.length);

	buffer.set(prefix, 0);
	buffer.set(message, prefix.length);

	return buffer;
};

enum FrameType {
	DATA = 0,
	TRAILER = 1,
}

const getPrefix = (binMessage: Uint8Array, type: FrameType): Uint8Array => {
	const len: number = binMessage.length;
	let kind = type === FrameType.DATA ? 0x00 : 0x80;

	return new Uint8Array([kind, (len >> 24) & 0xff, (len >> 16) & 0xff, (len >> 8) & 0xff, (len >> 0) & 0xff]);
};

const codeToHTTP = (code: Code): {code: number; text: string} => {
	switch (code) {
		case Code.OK:
			return {code: 200, text: "OK"};
		case Code.CANCELLED:
			return {code: 499, text: "Client Closed Request"};
		case Code.UNKNOWN:
			return {code: 500, text: "Internal Server Error"};
		case Code.INVALID_ARGUMENT:
			return {code: 400, text: "Bad Request"};
		case Code.DEADLINE_EXCEEDED:
			return {code: 504, text: "Gateway Timeout"};
		case Code.NOT_FOUND:
			return {code: 404, text: "Not Found"};
		case Code.ALREADY_EXISTS:
			return {code: 409, text: "Conflict"};
		case Code.PERMISSION_DENIED:
			return {code: 403, text: "Forbidden"};
		case Code.RESOURCE_EXHAUSTED:
			return {code: 429, text: "Too Many Requests"};
		case Code.FAILED_PRECONDITION:
			return {code: 400, text: "Bad Request"};
		case Code.ABORTED:
			return {code: 409, text: "Conflict"};
		case Code.OUT_OF_RANGE:
			return {code: 400, text: "Bad Request"};
		case Code.UNIMPLEMENTED:
			return {code: 501, text: "Not Implemented"};
		case Code.INTERNAL:
			return {code: 500, text: "Internal Server Error"};
		case Code.UNAVAILABLE:
			return {code: 503, text: "Service Unavailable"};
		case Code.DATA_LOSS:
			return {code: 500, text: "Internal Server Error"};
		case Code.UNAUTHENTICATED:
			return {code: 401, text: "Unauthorized"};
	}

	return {code: 500, text: "Internal Server Error"};
};
