import * as jspb from "google-protobuf";
import {Response, ToBinaryResponse, ToTextResponse} from "./index";
import {Code, Status} from "./status";

/**
 * Interface representing a response compatible with Playwright's route.fulfill method.
 */
export interface PlaywrightResponse {
    status: number;
    contentType?: string;
    headers?: { [key: string]: string };
    body?: string | Buffer;
}

/**
 * Convert a Response object to a format compatible with Playwright's route.fulfill method.
 */
export const ResponseForPlaywright = (r: Response) : PlaywrightResponse => {
    let body: string | Buffer | undefined = undefined;

    if (r.body instanceof Uint8Array) {
        body = Buffer.from(r.body);
    } else if (typeof r.body === "string") {
        body = r.body;
    }

    return {
        status: r.statusCode,
        contentType: r.headers["content-type"],
        headers: r.headers,
        body: body,
    };
}

/**
 * Helper functions to create Playwright-compatible responses from Protocol Buffer messages.
 */
export var Playwright = {
    ToTextResponse : (message: jspb.Message, status: Status = { code: Code.OK }): PlaywrightResponse => {
        const res = ToTextResponse(message, status);

        return ResponseForPlaywright(res);
    },

    ToBinaryResponse : (message: jspb.Message, status: Status = { code: Code.OK }): PlaywrightResponse => {
        const res = ToBinaryResponse(message, status);

        return ResponseForPlaywright(res);
    }
}
