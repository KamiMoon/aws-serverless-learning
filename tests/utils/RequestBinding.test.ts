import { bindRequest } from "src/utils/RequestBinding";

describe("RequestBinding", () => {
    test("decodes based on schema", () => {
        const input = {
            title: "The%20Big%20New%20Movie",
            year: "2015",
            pay: "20.56",
            isFun: "true",
            isDead: "false"
        };

        const schema = {
            title: "string",
            year: "int",
            pay: "float",
            isFun: "boolean",
            isDead: "boolean"
        };

        const result = bindRequest(schema, input);

        const expected = {
            title: "The Big New Movie",
            year: 2015,
            pay: 20.56,
            isFun: true,
            isDead: false
        };

        expect(result).toEqual(expected);
    });
});
