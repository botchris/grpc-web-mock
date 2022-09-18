import {ToTextResponse} from "../src";
import {ListOrdersResponse, Order} from "../proto/orders_service_pb";
import {Code} from "../src/status";
import {ToBinaryResponse} from "../dist";

describe("GIVEN a ListOrdersResponse with 10 orders", () => {
    const res = new ListOrdersResponse();
    const orders = [] as Order[];

    for (let i = 0; i < 10; i++) {
        const order = new Order();
        order.setId("order:"+i.toString());
        order.setName("Order_ " + i);
        order.setDescription("Description " + i);
        order.setStatus("pending");
        orders.push(order);
    }

    res.setTotalSize(10);
    res.setOrdersList(orders);
    res.setNextPageToken("");

    describe("WHEN encoding as grpc-web-text response with status OK", () => {
        const htr = ToTextResponse(res, {code: 0});

        test("THEN http-status is 200 AND body is a non-empty string AND content-type is application/grpc-web-text", () => {
            expect(typeof htr.body).toBe("string");
            expect(htr.body).not.toBe("");
            expect(htr.statusCode).toBe(200);
            expect(htr.statusText).toBe("OK");
            expect(htr.headers["content-type"]).toBe("application/grpc-web-text");
        });
    });

    describe("WHEN encoding as grpc-web-text response with status INTERNAL", () => {
        const htr = ToTextResponse(res, {code: Code.INTERNAL});

        test("THEN http-status is 500 AND body an empty string AND content-type is application/grpc-web-text", () => {
            expect(typeof htr.body).toBe("string");
            expect(htr.body).not.toBe("");
            expect(htr.statusCode).toBe(500);
            expect(htr.statusText).toBe("Internal Server Error");
            expect(htr.headers["content-type"]).toBe("application/grpc-web-text");
        });
    });

    describe("WHEN encoding as grpc-web-binary response with status OK", () => {
        const htr = ToBinaryResponse(res, {code: 0});

        test("THEN http-status is 200 AND body is a non-empty binary array AND content-type is application/grpc-web+proto", () => {
            expect(htr.body.length).toBeGreaterThan(0);
            expect(htr.body instanceof Uint8Array).toBeTruthy();
            expect(htr.statusCode).toBe(200);
            expect(htr.statusText).toBe("OK");
            expect(htr.headers["content-type"]).toBe("application/grpc-web+proto");
        });
    });
});