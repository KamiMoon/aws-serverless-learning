import DyanmoDBDao from "src/utils/DynamoDBDao";
jest.mock("src/utils/AWSDocClient", () => {
    function buildPromiseObj(obj) {
        return {
            promise: () => {
                return new Promise((resolve, reject) => {
                    resolve(obj);
                });
            }
        };
    }

    return {
        put: obj => {
            return buildPromiseObj(obj);
        },
        get: obj => {
            return buildPromiseObj(obj);
        },
        update: obj => {
            return buildPromiseObj(obj);
        },
        delete: obj => {
            return buildPromiseObj(obj);
        }
    };
});

describe("DyanmoDBDao", () => {
    function setup() {
        const table = "FakeTable";
        const keys = ["id"];
        const dynamo = new DyanmoDBDao(table, keys);

        const obj = {};

        return { dynamo };
    }

    test("it creates an object", () => {
        const { dynamo } = setup();

        const obj = {
            name: "Eric"
        };

        const expected = {
            Item: { name: "Eric" },
            TableName: "FakeTable"
        };

        return dynamo.create(obj).then(result => {
            expect(result).toEqual(expected);
        });
    });

    test("it gets an object", () => {
        const { dynamo } = setup();

        const obj = {
            id: 1,
            name: "Eric"
        };

        const expected = {
            Key: { id: 1 },
            TableName: "FakeTable"
        };

        return dynamo.get(obj).then(result => {
            expect(result).toEqual(expected);
        });
    });

    test("it updates an object", () => {
        const { dynamo } = setup();

        const obj = {
            id: 1,
            name: "Eric"
        };

        const expected = {
            ExpressionAttributeValues: { ":name": "Eric" },
            Key: { id: 1 },
            ReturnValues: "UPDATED_NEW",
            TableName: "FakeTable",
            UpdateExpression: "SET name = :name"
        };

        return dynamo.update(obj).then(result => {
            expect(result).toEqual(expected);
        });
    });

    test("it deletes an object", () => {
        const { dynamo } = setup();

        const obj = {
            id: 1,
            name: "Eric"
        };

        const expected = { Key: { id: 1 }, TableName: "FakeTable" };

        return dynamo.remove(obj).then(result => {
            expect(result).toEqual(expected);
        });
    });
});
