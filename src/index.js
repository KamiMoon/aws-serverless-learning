import handleMoviesRequest from "src/MoviesController";

export const handler = async (event, context) => {
    let response = null;

    try {
        response = await handleMoviesRequest(event, context);
    } catch (err) {
        console.error(err);
        return { statusCode: 400, body: JSON.stringify(err) };
    }
    return { statusCode: 200, body: JSON.stringify(response) };
};
