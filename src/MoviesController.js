import moviesDao from "src/MoviesDao";

export default function handleMoviesRequest(event, context) {
    const params = event.pathParameters || {};
    const body = event.body || {};

    console.log("method: ", event.httpMethod);
    console.log("params: ", params);
    console.log("body:", body);

    //TODO: validation and data type conversion
    switch (event.httpMethod) {
        case "GET":
            if (params.year && params.title) {
                //TODO: Better
                params.year = parseInt(params.year, 10);
                return moviesDao.get(params);
            }
            //TODO: more list methods
            break;

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
