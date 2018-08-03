const AWS = require("aws-sdk");

AWS.config.update({
    region: "us-east-2",
    //TODO: Make this more configurable
    //uncomment for local
    //comment out for prod
    endpoint: "http://192.168.99.100:8000"
});

const docClient = new AWS.DynamoDB.DocumentClient();

export default docClient;
