import dynamoDBUtils from "src/utils/DynamoDBUtils";

describe("DynamoDBUtils", () => {
    test("builds create", () => {
        const table = "SomeTable";

        const obj = {
            name: "Eric",
            age: 31,
            colors: ["red", "blue"],
            info: {
                plot: "Nothing happens at all. again",
                rating: 1
            }
        };

        const result = dynamoDBUtils.buildCreate(table, obj);
        const expected = {
            TableName: "SomeTable",
            Item: {
                name: "Eric",
                age: 31,
                colors: ["red", "blue"],
                info: {
                    plot: "Nothing happens at all. again",
                    rating: 1
                }
            }
        };

        expect(result).toEqual(expected);
    });

    test("builds get", () => {
        const table = "SomeTable";
        const keys = ["name"];

        const obj = {
            name: "Eric"
        };

        const result = dynamoDBUtils.buildGet(table, keys, obj);
        const expected = {
            TableName: "SomeTable",
            Key: {
                name: "Eric"
            }
        };

        expect(result).toEqual(expected);
    });

    test("builds update", () => {
        const table = "SomeTable";
        const keys = ["name"];

        const obj = {
            name: "Eric",
            age: 31,
            colors: ["red", "blue"],
            info: {
                plot: "Nothing happens at all. again",
                rating: 1
            }
        };

        const result = dynamoDBUtils.buildUpdate(table, keys, obj);
        const expected = {
            TableName: "SomeTable",
            Key: {
                name: "Eric"
            },
            UpdateExpression: "SET age = :age, colors = :colors, info = :info",
            ExpressionAttributeValues: {
                ":age": 31,
                ":colors": ["red", "blue"],
                ":info": {
                    plot: "Nothing happens at all. again",
                    rating: 1
                }
            }
            //ReturnValues: "UPDATED_NEW"
        };

        expect(result).toEqual(expected);
    });

    test("builds delete", () => {
        const table = "SomeTable";
        const keys = ["name"];

        const obj = {
            name: "Eric"
        };

        const result = dynamoDBUtils.buildDelete(table, keys, obj);
        const expected = {
            TableName: "SomeTable",
            Key: {
                name: "Eric"
            }
        };

        expect(result).toEqual(expected);
    });
});
