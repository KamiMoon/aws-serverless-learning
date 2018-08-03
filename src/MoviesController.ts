//import moviesDao from "src/MoviesDao";
import { MoviesDao } from "src/dao/MoviesDao";

const moviesDao = new MoviesDao();

export function handleMoviesRequest(event, context?: any) {
    const params = event.pathParameters || {};
    const body = event.body || {};
    const queryParams = event.queryStringParameters || {};

    console.log("method: ", event.httpMethod);
    console.log("params: ", params);
    console.log("queryParams", queryParams);
    console.log("body:", body);

    //TODO: validation and data type conversion
    switch (event.httpMethod) {
        case "GET":
            if (
                params.year &&
                params.title &&
                Object.keys(params).length === 2
            ) {
                //TODO: Better
                params.year = parseInt(params.year, 10);
                return moviesDao.get(params);
            }

            if (queryParams.year) {
                queryParams.year = parseInt(queryParams.year, 10);
            }
            //TODO year should fail because of type
            return moviesDao.query(queryParams);

        case "POST":
            return moviesDao.create(JSON.parse(body));
        case "PUT":
            return moviesDao.update(JSON.parse(body));
        case "DELETE":
            return moviesDao.remove(JSON.parse(body));
        default:
            //TODO: handle this better
            console.log("Not matched");
            return new Promise((resolve, reject) => {
                reject({});
            });
    }
}
