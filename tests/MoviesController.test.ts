import { handleMoviesRequest } from "src/MoviesController";

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

        const expected = { title: "Some Movie", year: 1900 };

        return handleMoviesRequest(event).then(result => {
            expect(result).toEqual(expected);
        });
    });

    test("handles get request for list", () => {
        const event = {
            httpMethod: "GET"
        };

        return handleMoviesRequest(event).then(result => {
            expect(result).toEqual([{}]);
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

        return handleMoviesRequest(event).then(result => {
            expect(result).toEqual(movie);
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

        return handleMoviesRequest(event).then(result => {
            expect(result).toEqual(movie);
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

        return handleMoviesRequest(event).then(result => {
            expect(result).toEqual(movie);
        });
    });

    //TODO: other cases
});
