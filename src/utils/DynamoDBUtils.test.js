import DynamoDBUtils from './DynamoDBUtils'


test('builds necessary things', () => {
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