import DyanmoDBDao from "src/utils/DynamoDBDao";

const table = "Movies";
const keys = ["year", "title"];

class MovieDao extends DyanmoDBDao {}

const movieDao = new MovieDao(table, keys);

export default movieDao;
