/**
 * It represents an RPC status code, message, and details.
 *
 * @see https://godoc.org/google.golang.org/grpc/internal/status
 */
export interface Status {
	code: Code;
	details?: string;
}

/**
 * A Code is an unsigned error code as defined in the gRPC spec.
 *
 * @see https://grpc.github.io/grpc/core/md_doc_statuscodes.html
 */
export enum Code {
	OK = 0,
	CANCELLED = 1,
	UNKNOWN = 2,
	INVALID_ARGUMENT = 3,
	DEADLINE_EXCEEDED = 4,
	NOT_FOUND = 5,
	ALREADY_EXISTS = 6,
	PERMISSION_DENIED = 7,
	RESOURCE_EXHAUSTED = 8,
	FAILED_PRECONDITION = 9,
	ABORTED = 10,
	OUT_OF_RANGE = 11,
	UNIMPLEMENTED = 12,
	INTERNAL = 13,
	UNAVAILABLE = 14,
	DATA_LOSS = 15,
	UNAUTHENTICATED = 16,
}
