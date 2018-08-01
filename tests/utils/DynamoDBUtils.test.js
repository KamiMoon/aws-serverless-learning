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

    test("builds a query", () => {
        const table = "SomeTable";
        const keys = ["name"];

        let obj = {
            name: "Eric"
        };

        let expected = {
            TableName: "SomeTable",
            KeyConditionExpression: "#name = :name",
            ExpressionAttributeNames: {
                "#name": "name"
            },
            ExpressionAttributeValues: {
                ":name": "Eric"
            }
        };

        let result = dynamoDBUtils.buildQuery(table, keys, obj);

        obj = {
            name: "Eric",
            age: 31
        };

        expected = {
            TableName: "SomeTable",
            KeyConditionExpression: "#name = :name and #age = :age",
            ExpressionAttributeNames: {
                "#name": "name",
                "#age": "age"
            },
            ExpressionAttributeValues: {
                ":name": "Eric",
                ":age": 31
            }
        };

        result = dynamoDBUtils.buildQuery(table, keys, obj);

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
