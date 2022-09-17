# Typescript GRPC-Web Response Mocking

Allows to mock GRPC-Web responses in pure Typescript. Useful for mocking
GRPC-Web APIs in tests.

## Example Usage in Cypress

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
                // Import your Protobuf definitions.
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

                // Mock response data.
                req.reply({
                    statusCode: 200,
                    headers: {
                        "content-type": "application/grpc-web-text",
                    },
                    body: grpcMock.ToTextResponse(res),
                });
            }
        ).as("@listOrders");

        cy.visit("/orders/list");
        cy.wait("@listOrders")
        cy.get("[data-cy=orders-table]").find("tr").should("have.length", 10);
    });
});
```
