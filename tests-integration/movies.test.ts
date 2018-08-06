//Requires that API is running locally via npm run api

const request = require("supertest");

//TODO configurable
//const url = "http://127.0.0.1:3000";
//const url = "https://dujxlnj50a.execute-api.us-east-2.amazonaws.com/Prod"

const url = "http://192.168.0.8:8000";

describe("Movies API integration test", () => {
    test("should get a movie", () => {
        const expected = {
            title: "Hotaru no haka",
            year: 1988,
            info: {
                actors: [
                    "Tsutomu Tatsumi",
                    "Ayano Shiraishi",
                    "Akemi Yamaguchi"
                ],
                release_date: "1988-04-16T00:00:00Z",
                plot:
                    "A tragic film covering a young boy and his little sister's struggle to survive in Japan during World War II.",
                genres: ["Animation", "Drama", "War"],
                image_url:
                    "http://ia.media-imdb.com/images/M/MV5BMjA0MzgwMTU4MV5BMl5BanBnXkFtZTcwODYxNjEzMQ@@._V1_SX400_.jpg",
                directors: ["Isao Takahata"],
                rating: 8.4,
                rank: 1867,
                running_time_secs: 5340
            }
        };

        return request(url)
            .get("/movies/1988/Hotaru%20no%20haka")
            .set("Accept", "application/json")
            .expect(200)
            .then(response => {
                expect(response.body).toEqual(expected);
            });
    });

    test("should return a list of movies", () => {
        const expected = [];

        //Query condition missed key schema element

        return request(url)
            .get("/movies?year=1988")
            .set("Accept", "application/json")
            .expect(200)
            .then(response => {
                expect(response.body.length > 0).toEqual(true);
            });
    });

    test("create/replace a  movie", () => {
        const movie = {
            year: 2015,
            title: "The Big New Movie",
            info: {
                plot: "Nothing happens at all.",
                rating: 0
            }
        };

        return request(url)
            .post("/movies")
            .send(movie) // sends a JSON post body
            .set("Accept", "application/json")
            .expect(200)
            .then(response => {
                expect(response.body).toEqual(movie);
            });
    });

    test("updates a movie", () => {
        const movie = {
            year: 2015,
            title: "The Big New Movie",
            info: {
                plot: "Nothing happens at all. again",
                rating: 2
            }
        };

        return request(url)
            .put("/movies/2015/The Big New Movie")
            .send(movie) // sends a JSON post body
            .set("Accept", "application/json")
            .expect(200)
            .then(response => {
                expect(response.body).toEqual(movie);
            });
    });

    test("deletes a movie", () => {
        const expected = {
            info: { plot: "Nothing happens at all. again", rating: 2 },
            title: "The Big New Movie",
            year: 2015
        };

        return request(url)
            .delete("/movies/2015/The Big New Movie")
            .set("Accept", "application/json")
            .expect(200)
            .then(response => {
                expect(response.body).toEqual(expected);
            });
    });
});
