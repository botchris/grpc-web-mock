import * as jspb from "google-protobuf";
import { Code, Status } from "./status";

/**
 * Takes a Protocol Buffer message and returns a base64-encoded gRPC response
 * as it would be sent by a gRPC-web server using "grpc-web-text" encoding.
 *
 * @param message A Protocol Buffer message
 * @param status Optional gRPC status response, by default the status code is 0 (OK)
 */
export const ToTextResponse = (message: jspb.Message, status: Status = { code: Code.OK }): string => {
	const msg = framerBase64(message.serializeBinary(), FrameType.DATA);
	const tail = framerBase64(trailerMessage(status), FrameType.TRAILER);

	return msg + tail;
};

/**
 * Takes a Protocol Buffer message and returns a binary-encoded gRPC response
 * as it would be sent by a gRPC-web server using "grpc-web+proto" encoding.
 *
 * @param message A Protocol Buffer message
 * @param status Optional gRPC status response, by default the status code is 0 (OK)
 */
export const ToBinaryResponse = (message: jspb.Message, status: Status = { code: Code.OK }): Uint8Array => {
	const msg = framerBinary(message.serializeBinary(), FrameType.DATA);
	const tail = framerBinary(trailerMessage(status), FrameType.TRAILER);
	const buffer = new Uint8Array(msg.length + tail.length);

	buffer.set(msg, 0);
	buffer.set(tail, msg.length);

	return buffer;
};

const trailerMessage = (status: Status | null): Uint8Array => {
	const code = status ? status.code : 0;
	const details = status ? status.details : "";

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
