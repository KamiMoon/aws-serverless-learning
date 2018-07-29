//import axios from 'axios'
//const url = 'http://checkip.amazonaws.com/';

import MoviesDao from './MoviesDao'
import { resolve } from 'url';


const moviesDao = new MoviesDao()

function handleRequest(event, context) {
    const params = event.pathParameters || {};
    const body = event.body || {};

    console.log('method: ', event.httpMethod)
    console.log('params: ', params);
    console.log('body:', body)

    //TODO: validation and data type conversion


    switch (event.httpMethod) {

        case "GET":
            if (params.year && params.title) {

                //TODO: Better 
                params.year = parseInt(params.year, 10)
                return moviesDao.get(params)
            }
            //TODO: more list methods

            break;

        case "POST":
            return moviesDao.create(JSON.parse(body));
        case "PUT":
            return moviesDao.update(body);
        case "DELETE":
            return moviesDao.remove(body);
        default:
            //TODO: handle this better
            console.log('Not matched')
            return new Promise((resolve, reject) => { reject({}) })

    }

}



export const handler = async (event, context) => {

    let response = null;

    try {
        response = await handleRequest(event, context)
    }
    catch (err) {
        console.log(err);
        return { statusCode: 400, body: JSON.stringify(err) };
    }
    return { statusCode: 200, body: JSON.stringify(response) };

};


