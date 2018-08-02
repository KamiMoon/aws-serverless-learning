class DynamoDBUtils {
    buildCreate(table, object) {
        const result = {
            TableName: table,
            Item: object
        };

        return result;
    }

    buildGet(table, keys, object) {
        const result = {
            TableName: table,
            Key: {}
        };

        keys.forEach(k => {
            result.Key[k] = object[k];
        });

        return result;
    }

    buildQuery(table, keys, object) {
        const result = {
            TableName: table,
            KeyConditionExpression: "",
            ExpressionAttributeNames: {},
            ExpressionAttributeValues: {}
        };

        let i = 0;
        for (const key in object) {
            const newKey = "#" + key;
            const value = object[key];
            const placeholder = ":" + key;
            result.ExpressionAttributeNames[newKey] = key;
            result.ExpressionAttributeValues[placeholder] = value;

            if (i !== 0) {
                result.KeyConditionExpression += " and ";
            }

            result.KeyConditionExpression += newKey + " = " + placeholder;

            i++;
        }

        return result;
    }

    buildUpdate(table, keys, object) {
        const result = {
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
        for (const key in object) {
            const value = object[key];

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
        const result = {
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
