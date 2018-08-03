import { MoviesDao } from "src/dao/MoviesDao";

describe("MoviesDao", () => {
    test("it creates an object", () => {
        const dao = new MoviesDao();

        const obj = {
            name: "Eric"
        };

        return dao.create(obj).then(result => {
            expect(result).toEqual(obj);
        });
    });

    test("it queries for objects", async () => {
        const dao = new MoviesDao();

        const obj = {
            id: 1,
            name: "Eric"
        };

        const result = await dao.query(obj);
        expect(result).toEqual([obj]);
    });

    test("it updates an object", () => {
        const dao = new MoviesDao();

        const obj = {
            id: 1,
            name: "Eric"
        };

        return dao.update(obj).then(result => {
            expect(result).toEqual(obj);
        });
    });

    test("it deletes an object", () => {
        const dao = new MoviesDao();

        const obj = {
            id: 1,
            name: "Eric"
        };

        return dao.remove(obj).then(result => {
            expect(result).toEqual(obj);
        });
    });
});
