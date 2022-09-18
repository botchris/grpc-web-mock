# GRPC-Web Mock

Allows to mock GRPC-Web responses in pure Typescript. Useful for mocking
GRPC-Web APIs in E2E tests.

## Motivation

GRPC-Web is a protocol that allows to use GRPC services in the browser. It is
implemented in many languages, including Typescript. However, testing GRPC-Web
services is not as easy as testing REST APIs (you usually mock a bunch of JSON
responses, and you are ready to go).

This library aims to make E2E tests easier by simulating the part of the
GRPC-Web server that is responsible for sending responses to a web-client
(see [wiring format](https://github.com/grpc/grpc-web#wire-format-mode) for
further details). It allows to mock GRPC-Web responses in pure Typescript,
without the need to run a real GRPC server. Simply create a new ProtocolBuffer
message, and pass it to one of the mocking functions to get a valid GRPC-Web
response as it would be sent by a real GRPC server.

However, this library does not mock the GRPC-Web client or server interfaces,
so you still need to simulate HTTP networking. Below you can find an example of
how to use this library with [Cypress](https://www.cypress.io/), which provides
a nice API for intercepting HTTP requests and mocking responses.

## Cypress Example

```typescript
import * as grpcMock from "grpc-web-mock";
import { ListOrdersResponse, Order } from "./gen/protos/orders_pb";

describe("Orders Service", () => {
    it("should returns a list of orders", () => {
        // Intercept Backend request and inject a mocked grpc-web response.
        cy.intercept(
            {
                method: "POST",
                pathname: "/shopping.api.v1.OrdersService/ListOrders",
            },
            (req) => {
                // 1. Mock a Protobuffer response object as it would be 
                // returned by the real GRPC server.
                const res = new ListOrdersResponse();
                const orders = [] as Order[];
                
                for (let i = 0; i < 10; i++) {
                    const order = new Order();
                    order.setId(i);
                    order.setPrice(1000);
                    order.setQuantity(1);
                    orders.push(order);
                }
                
                res.setOrdersList(orders);

                // 2. Change response for a mocked "grpc-web-text" response.
                req.reply(grpcMock.ToTextResponse(res));
            }
        ).as("@listOrders");

        cy.visit("/orders/list");
        cy.wait("@listOrders")
        cy.get("[data-cy=orders-table]").find("tr").should("have.length", 10);
    });
});
```
