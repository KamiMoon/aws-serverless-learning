import { DataMapper } from "@aws/dynamodb-data-mapper";
import DynamoDB = require("aws-sdk/clients/dynamodb");

const config = {
    region: "us-east-2",
    //TODO: Make this more configurable
    //uncomment for local
    //comment out for prod
    endpoint: "http://192.168.99.100:8000"
};

const client = new DynamoDB(config);
const dataMapper = new DataMapper({
    client
    //tableNamePrefix: "dev_" // optionally, you can provide a table prefix to keep your dev and prod tables separate
});

export default dataMapper;
