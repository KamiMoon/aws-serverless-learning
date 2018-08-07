import { MoviesDao } from "src/dao/MoviesDao";
import { bindRequest } from "src/utils/RequestBinding";

const moviesDao = new MoviesDao();

const requestSchema = {
    year: "int",
    title: "string"
};

export function handleMoviesRequest(event, context?: any) {
    const pathParams = bindRequest(requestSchema, event.pathParameters);
    const body = event.body ? JSON.parse(event.body) : {};
    const queryParams = bindRequest(requestSchema, event.queryStringParameters);

    console.log("method: ", event.httpMethod);
    console.log("pathParams: ", pathParams);
    console.log("queryParams", queryParams);
    console.log("body:", body);

    //TODO: validation and data type conversion
    switch (event.httpMethod) {
        case "GET":
            return handleGet(pathParams, queryParams);
        case "POST":
            return handlePost(body);
        case "PUT":
            return handlePut(body);
        case "DELETE":
            return handleDelete(pathParams);
        default:
            return handleNotMatched();
    }
}

function handleGet(pathParams, queryParams) {
    if (
        pathParams.year &&
        pathParams.title &&
        Object.keys(pathParams).length === 2
    ) {
        return moviesDao.get(pathParams);
    }
    return moviesDao.query(queryParams);
}

function handlePost(body) {
    return moviesDao.create(body);
}

function handlePut(body) {
    return moviesDao.update(body);
}

function handleDelete(pathParams) {
    return moviesDao.remove(pathParams);
}

function handleNotMatched() {
    //TODO: handle this better
    console.log("Not matched");
    return new Promise((resolve, reject) => {
        reject({});
    });
}
