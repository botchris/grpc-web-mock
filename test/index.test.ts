import {ToTextResponse} from "../src";
import {ListOrdersResponse, Order} from "../proto/orders_service_pb";
import {Code} from "../src/status";

describe("text encoder", () => {
    it("should return a non-empty HTTP response with status 200 WHEN encoding a ListOrdersResponse using status OK", () => {
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

        const htr = ToTextResponse(res, {code: 0});

        expect(htr.body).not.toBe("");
        expect(htr.status).toBe(200);
        expect(htr.statusText).toBe("OK");
        expect(htr.headers["content-type"]).toBe("application/grpc-web-text");
    });

    it("should return a non-empty HTTP response with status 500 WHEN encoding a ListOrdersResponse using status INTERNAL", () => {
        const res = new ListOrdersResponse();

        res.setTotalSize(10);
        res.setNextPageToken("");

        const htr = ToTextResponse(res, {code: Code.INTERNAL});

        expect(htr.body).not.toBe("");
        expect(htr.status).toBe(500);
        expect(htr.statusText).toBe("Internal Server Error");
        expect(htr.headers["content-type"]).toBe("application/grpc-web-text");
    });
});