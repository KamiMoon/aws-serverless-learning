export default class DynamoDBUtils {

    buildUpdate(table, keys, object) {
        let result = {
            TableName: table,
            Key: {},
            UpdateExpression: '',
            ExpressionAttributeValues: {},
            ReturnValues: "UPDATED_NEW"
        }

        keys.forEach(k => {
            result.Key[k] = object[k];
            delete object[k];
        });

        let i = 0;
        for (let key in object) {
            let value = object[key];

            if (i === 0) {
                result.UpdateExpression += 'SET ' + key + ' = :' + key
            } else {
                result.UpdateExpression += ', ' + key + ' = :' + key;
            }

            result.ExpressionAttributeValues[':' + key] = value;

            i++;
        }

        return result;
    }
}