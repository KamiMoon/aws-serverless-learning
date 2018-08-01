import handleMoviesRequest from "src/MoviesController";

//TODO: mock out moviesDao - this is wrong

describe("handleMoviesRequest", () => {
    test("handles get request", () => {
        const event = {
            httpMethod: "GET",
            pathParameters: {
                year: "1900",
                title: "Some Movie"
            }
        };

        const expected = {
            Key: { title: "Some Movie", year: 1900 },
            TableName: "Movies"
        };

        return handleMoviesRequest(event).then(result => {
            expect(result).toEqual(expected);
        });
    });

    test("handles get request for list", () => {
        const event = {
            httpMethod: "GET"
        };

        const expected = {
            ExpressionAttributeNames: {},
            ExpressionAttributeValues: {},
            KeyConditionExpression: "",
            TableName: "Movies"
        };

        return handleMoviesRequest(event).then(result => {
            expect(result).toEqual(expected);
        });
    });

    test("handles post request", () => {
        const movie = {
            year: 2015,
            title: "The Big New Movie",
            info: {
                plot: "Nothing happens at all.",
                rating: 0
            }
        };

        const event = {
            httpMethod: "POST",
            body: JSON.stringify(movie)
        };

        const expected = {
            Item: {
                info: { plot: "Nothing happens at all.", rating: 0 },
                title: "The Big New Movie",
                year: 2015
            },
            TableName: "Movies"
        };

        return handleMoviesRequest(event).then(result => {
            expect(result).toEqual(expected);
        });
    });

    test("handles put request", () => {
        const movie = {
            year: 2015,
            title: "The Big New Movie",
            info: {
                plot: "Nothing happens at all.",
                rating: 0
            }
        };

        const event = {
            httpMethod: "PUT",
            body: JSON.stringify(movie)
        };

        const expected = {
            ExpressionAttributeValues: {
                ":info": { plot: "Nothing happens at all.", rating: 0 }
            },
            Key: { title: "The Big New Movie", year: 2015 },
            TableName: "Movies",
            UpdateExpression: "SET info = :info"
        };

        return handleMoviesRequest(event).then(result => {
            expect(result).toEqual(expected);
        });
    });

    test("handles delete request", () => {
        const movie = {
            year: 2015,
            title: "The Big New Movie"
        };

        const event = {
            httpMethod: "DELETE",
            body: JSON.stringify(movie)
        };

        const expected = {
            Key: { title: "The Big New Movie", year: 2015 },
            TableName: "Movies"
        };

        return handleMoviesRequest(event).then(result => {
            expect(result).toEqual(expected);
        });
    });

    //TODO: other cases
});
