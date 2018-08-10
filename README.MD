# Example Serverless Lambda DynamoDB REST API

Uses

-   [AWS Lambda](https://aws.amazon.com/lambda/)
-   [DynamoDB](https://aws.amazon.com/dynamodb/)
-   [Node.js](https://nodejs.org/en/) 8.11
-   [Typescript](https://github.com/awslabs/dynamodb-data-mapper-js)

-   [DynamoDB Data Mapper](https://github.com/awslabs/dynamodb-data-mapper-js)
-   [Jest](https://jestjs.io/) for unit and integration tests
-   [Webpack](https://webpack.js.org/)

## Running locally

Requires:

-   Everything needed to run AWS SAM locally as described [here](https://docs.aws.amazon.com/lambda/latest/dg/test-sam-cli.html).
-   Also that requires [docker](https://www.docker.com/).
-   Install and run this [DynamoDB](https://hub.docker.com/r/cnadiminti/dynamodb-local/) image.
-   Create a docker network:

```sh
docker network create aws-local-network
```

The scripts use that network to connect the lambda docker container that SAM uses and DynamoDB container locally.

# Start DynamoDB and populate it

```sh
bash dbstart.sh
```

See script that starts docker, starts already installed DynamoDB container, and runs node script to create table and populate it with data.

# Run webpack

```sh
npm watch
```

# Run Lambda locally

```sh
npm api
```

## Running Unit Tests

```sh
npm test
```

## Integration Tests

Requires that a local server running with DynamoDB up and populated. See above.

```sh
npm integration
```

## Run proxy for mobile

```sh
npm proxy
```

Then use that IP address. Docker has problems using an IP address locally, so throw a proxy server up locally in front for things like testing locally with your [React Native App](https://github.com/KamiMoon/react-native-movie).

## Deploy lambda service

Use Code Pipeline etc as described [here](https://docs.aws.amazon.com/lambda/latest/dg/automating-deployment.html) to automate depoyement when you push to a branch in GitHub/your repo.

## TODOS

-   Config swtich db local/prod using like environmental variables.
-   Security and Auth/authorization.
