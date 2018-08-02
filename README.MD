TODO

run local

assumes

docker network create aws-local-network

populate db etc

bash dbstart.sh

Integration tests

npm run integration

TODO:

1.  Finish API
2.  Deploy
    TODO: failed on Cloud Formation


    10:01:50 UTC-0500	CREATE_FAILED	AWS::DynamoDB::Table	DynamoDBTable	Encountered unsupported property KeyType

3.  Tests
4.  Config swtich db local/prod
5.  Data stay/config local
6.  Distrubtion size - don't include dev deps

1) url needs to be decoded: decodeURIComponent("The%20Big%20New%20Movie")

https://dujxlnj50a.execute-api.us-east-2.amazonaws.com/Prod/movies/2015/The%20Big%20New%20Movie

2.
