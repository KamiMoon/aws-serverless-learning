const AWS = require("aws-sdk");

import DynamoDBUtils from './DynamoDBUtils'
const utils = new DynamoDBUtils()

//TODO: Make this more configurable
AWS.config.update({
    region: "us-east-2",
    //endpoint: "http://localhost:8000"
    endpoint: "http://192.168.99.100:8000"
});

const docClient = new AWS.DynamoDB.DocumentClient();

export default class DyanmoDBDao {
    constructor(table, keys) {
        this.table = table;
        this.keys = keys
    }

    create(obj) {
        const expr = utils.buildCreate(this.table, obj);
        return docClient.put(expr).promise();
    }

    get(obj) {
        const expr = utils.buildGet(this.table, this.keys, obj);
        return docClient.get(expr).promise();
    }

    update(obj) {
        const expr = utils.buildUpdate(this.table, this.keys, obj);
        return docClient.update(expr).promise();
    }

    remove(obj) {
        const expr = utils.buildDelete(this.table, this.keys, obj);
        return docClient.delete(expr).promise();
    }
}