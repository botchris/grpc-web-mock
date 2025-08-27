import {Playwright} from "../src/helpers";
import {ListOrdersResponse, Order} from "../proto/orders_service_pb";
import {Code} from "../src/status";

describe("GIVEN a ListOrdersResponse with 10 orders AND a Playwright Helper", () => {
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

    describe("WHEN encoding as grpc-web-text response with status OK for Playwright", () => {
        const htr = Playwright.ToTextResponse(res, {code: 0});

        test("THEN http-status is 200 AND body is a non-empty string AND content-type is application/grpc-web-text", () => {
            expect(typeof htr.body).toBe("string");
            expect(htr.body).not.toBe("");
            expect(htr.status).toBe(200);
            expect(htr.contentType).toBe("application/grpc-web-text");
        });
    });

    describe("WHEN encoding as grpc-web-text response with status INTERNAL for Playwright", () => {
        const htr = Playwright.ToTextResponse(res, {code: Code.INTERNAL});

        test("THEN http-status is 500 AND body an empty string AND content-type is application/grpc-web-text", () => {
            expect(typeof htr.body).toBe("string");
            expect(htr.body).not.toBe("");
            expect(htr.status).toBe(500);
            expect(htr.contentType).toBe("application/grpc-web-text");
        });
    });

    describe("WHEN encoding as grpc-web-binary response with status OK", () => {
        const htr = Playwright.ToBinaryResponse(res, {code: 0});

        test("THEN http-status is 200 AND body is a non-empty binary array AND content-type is application/grpc-web+proto", () => {
            expect(htr.body.length).toBeGreaterThan(0);
            expect(htr.body instanceof Uint8Array).toBeTruthy();
            expect(htr.status).toBe(200);
            expect(htr.contentType).toBe("application/grpc-web+proto");
        });
    });
});
