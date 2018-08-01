import { handler } from "src/index";

describe("Handler", () => {
    test("handles", async () => {
        const event = {
            httpMethod: "GET",
            pathParameters: {
                year: "1900",
                title: "Some Movie"
            }
        };

        const expected = {
            body:
                '{"TableName":"Movies","Key":{"year":1900,"title":"Some Movie"}}',
            statusCode: 200
        };

        const result = await handler(event);
        expect(result).toEqual(expected);
    });

    //TODO: error case
});
