import { handler } from "src/index";

describe("Handler", () => {
    test("handles get", async () => {
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

    // test("handles create", async () => {
    //     const movie = {
    //         year: 2015,
    //         title: "The Big New Movie",
    //         info: {
    //             plot: "Nothing happens at all.",
    //             rating: 0
    //         }
    //     };

    //     const event = {
    //         httpMethod: "POST",
    //         body: movie
    //     };

    //     const expected = {};

    //     const result = await handler(event);
    //     expect(result).toEqual(expected);
    // });

    //TODO: error case
});
