import docClient from "src/utils/AWSDocClient";
import dynamoDBUtils from "src/utils/DynamoDBUtils";

export default class DyanmoDBDao {
    table;
    keys;

    constructor(table, keys) {
        this.table = table;
        this.keys = keys;
    }

    create(obj) {
        const expr = dynamoDBUtils.buildCreate(this.table, obj);
        return docClient.put(expr).promise();
    }

    get(obj) {
        const expr = dynamoDBUtils.buildGet(this.table, this.keys, obj);
        return docClient.get(expr).promise();
    }

    query(obj) {
        const expr = dynamoDBUtils.buildQuery(this.table, this.keys, obj);

        console.log(expr);
        return docClient.query(expr).promise();
    }

    update(obj) {
        const expr = dynamoDBUtils.buildUpdate(this.table, this.keys, obj);
        return docClient.update(expr).promise();
    }

    remove(obj) {
        const expr = dynamoDBUtils.buildDelete(this.table, this.keys, obj);
        return docClient.delete(expr).promise();
    }
}
