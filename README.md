# Typescript GRPC-Web Response Mocking

Allows to mock GRPC-Web responses in pure Typescript. Useful for mocking
GRPC-Web APIs in tests.

## Example Usage in Cypress

```typescript
import * as grpcMock from "grpc-web-mock";

describe("Orders Service", () => {
    it("should returns a list of orders", () => {
        cy.intercept(
            {
                method: "POST",
                pathname: "/shopping.api.v1.OrdersService/ListOrders",
            },
            (req) => {
                // Import your Protobuf definitions.
                const res = new LisOrdersResponse();

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
