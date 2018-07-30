const AWS = require("aws-sdk");

import DynamoDBUtils from './utils/DynamoDBUtils'

const dynamoDBUtils = new DynamoDBUtils()

//TODO: Make this more configurable
AWS.config.update({
    region: "us-east-2",
    //endpoint: "http://localhost:8000"
    endpoint: "http://192.168.99.100:8000"
});

const docClient = new AWS.DynamoDB.DocumentClient();

const table = "Movies";
const keys = ["year", "title"];

export default class MoviesDao {

    create(movie) {
        return docClient.put({
            TableName: table,
            Item: movie
        }).promise();
    }

    get(movie) {
        return docClient.get({
            TableName: table,
            Key: {
                "year": movie.year,
                "title": movie.title
            }
        }).promise();
    }

    //TODO: by genre
    //TODO: paging

    update(movie) {
        const updateExpr = dynamoDBUtils.buildUpdate(table, keys, movie);
        return docClient.update(updateExpr).promise();
    }

    remove(movie) {
        return docClient.delete({
            TableName: table,
            Key: {
                "year": movie.year,
                "title": movie.title
            },
            // ConditionExpression: "info.rating <= :val",
            // ExpressionAttributeValues: {
            //     ":val": 5.0
            // }
        }).promise();
    }

}