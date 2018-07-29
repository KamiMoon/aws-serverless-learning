const AWS = require("aws-sdk");

//TODO: Make this more configurable
AWS.config.update({
    region: "us-east-2",
    //endpoint: "http://localhost:8000"
    endpoint: "http://192.168.99.100:8000"
});

const docClient = new AWS.DynamoDB.DocumentClient();

const table = "Movies";

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
        return docClient.update({
            TableName: table,
            Key: {
                "year": movie.year,
                "title": movie.title
            },
            UpdateExpression: "remove info.actors[0]",
            ConditionExpression: "size(info.actors) >= :num",
            ExpressionAttributeValues: {
                ":num": 3
            },
            ReturnValues: "UPDATED_NEW"
        }).promise();
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