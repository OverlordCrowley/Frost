const {Client} = require("pg");
const db = new Client({
        host: "localhost",
        user: "postgres",
        port: "5432",
        password: "postgres",
        database: "frost-db"
    })


module.exports = db;


