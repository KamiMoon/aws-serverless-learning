import DynamoDBUtils from './DynamoDBUtils'


describe('DynamoDBUtils', () => {

    test('builds create', () => {
        const utils = new DynamoDBUtils()

        const table = 'SomeTable'

        const obj = {
            'name': 'Eric',
            'age': 31,
            'colors': ['red', 'blue'],
            'info': {
                "plot": "Nothing happens at all. again",
                "rating": 1
            }
        }

        const result = utils.buildCreate(table, obj);
        const expected = {
            TableName: 'SomeTable',
            Item: {
                'name': 'Eric',
                'age': 31,
                'colors': ['red', 'blue'],
                'info': {
                    "plot": "Nothing happens at all. again",
                    "rating": 1
                }
            }
        }

        expect(result).toEqual(expected);
    });

    test('builds get', () => {
        const utils = new DynamoDBUtils()

        const table = 'SomeTable'
        const keys = ['name']

        const obj = {
            'name': 'Eric'
        }

        const result = utils.buildGet(table, keys, obj);
        const expected = {
            TableName: 'SomeTable',
            Key: {
                "name": 'Eric',
            }
        }

        expect(result).toEqual(expected);
    });

    test('builds update', () => {
        const utils = new DynamoDBUtils()

        const table = 'SomeTable'
        const keys = ['name']

        const obj = {
            'name': 'Eric',
            'age': 31,
            'colors': ['red', 'blue'],
            'info': {
                "plot": "Nothing happens at all. again",
                "rating": 1
            }
        }

        const result = utils.buildUpdate(table, keys, obj);
        const expected = {
            TableName: 'SomeTable',
            Key: {
                "name": 'Eric',
            },
            UpdateExpression: 'SET age = :age, colors = :colors, info = :info',
            ExpressionAttributeValues: {
                ':age': 31,
                ':colors': ['red', 'blue'],
                ':info': {
                    "plot": "Nothing happens at all. again",
                    "rating": 1
                }
            },
            ReturnValues: "UPDATED_NEW",
        }

        expect(result).toEqual(expected);
    });

    test('builds delete', () => {
        const utils = new DynamoDBUtils()

        const table = 'SomeTable'
        const keys = ['name']

        const obj = {
            'name': 'Eric'
        }

        const result = utils.buildDelete(table, keys, obj);
        const expected = {
            TableName: 'SomeTable',
            Key: {
                "name": 'Eric',
            }
        }

        expect(result).toEqual(expected);
    });
})

