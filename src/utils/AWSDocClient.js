const AWS = require("aws-sdk");

//TODO: Make this more configurable
AWS.config.update({
    region: "us-east-2"
    //endpoint: "http://localhost:8000"
    //TODO: how?
    //endpoint: "http://192.168.99.100:8000"
});

const docClient = new AWS.DynamoDB.DocumentClient();

export default docClient;
