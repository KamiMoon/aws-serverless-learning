import dataMapper from "src/dao/DataMapper";
import { Movies } from "src/model/Movies";

export class MoviesDao {
    create(obj) {
        const movie = Object.assign(new Movies(), obj);
        return dataMapper.put(movie);
    }

    get(obj) {
        const movie = Object.assign(new Movies(), obj);
        return dataMapper.get(movie);
    }

    async query(obj) {
        const results: any[] = [];

        for await (const movieResult of dataMapper.query(Movies, obj)) {
            console.log(movieResult);
            results.push(movieResult);
        }

        return results;
    }

    update(obj) {
        const movie = Object.assign(new Movies(), obj);
        return dataMapper.update(movie);
    }

    remove(obj) {
        const movie = Object.assign(new Movies(), obj);
        return dataMapper.delete(movie);
    }
}
