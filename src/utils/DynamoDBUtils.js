class DynamoDBUtils {
    buildCreate(table, object) {
        let result = {
            TableName: table,
            Item: object
        };

        return result;
    }

    buildGet(table, keys, object) {
        let result = {
            TableName: table,
            Key: {}
        };

        keys.forEach(k => {
            result.Key[k] = object[k];
        });

        return result;
    }

    buildUpdate(table, keys, object) {
        let result = {
            TableName: table,
            Key: {},
            UpdateExpression: "",
            ExpressionAttributeValues: {}
            //ReturnValues: "ALL_NEW"
        };

        keys.forEach(k => {
            result.Key[k] = object[k];
            delete object[k];
        });

        let i = 0;
        for (let key in object) {
            let value = object[key];

            if (i === 0) {
                result.UpdateExpression += "SET " + key + " = :" + key;
            } else {
                result.UpdateExpression += ", " + key + " = :" + key;
            }

            result.ExpressionAttributeValues[":" + key] = value;

            i++;
        }

        return result;
    }

    buildDelete(table, keys, object) {
        let result = {
            TableName: table,
            Key: {}
        };

        keys.forEach(k => {
            result.Key[k] = object[k];
        });

        return result;
    }
}

const dynamoDBUtils = new DynamoDBUtils();

export default dynamoDBUtils;
