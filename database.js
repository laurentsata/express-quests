 //**** importe le package dotenv et exécute config(). Cela définira pour nous toutes les variables d'environnement que nous avons décrites dans le fichier .env. ****
require("dotenv").config();
//**** importe le package mysql2 ****
const mysql = require("mysql2/promise");

const database = mysql.createPool({
  host: process.env.DB_HOST, // address of the server
  port: process.env.DB_PORT, // port of the DB server (mysql), not to be confused with the APP_PORT !
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});
/*
database
  .getConnection()
  .then(() => {
    console.log("Can reach database");
  })
  .catch((err) => {
    console.error(err);
  });
*/

/*
database
  .query("select * from movies")
  .then((result) => {
    console.log(result);
  })
  .catch((err) => {
    console.error(err);
  });
  */
//**** destructuration de tableau ****
/* **** mis dans movieHandlers.js ****
  database
  .query("select * from movies")
  .then(([movies]) => {
    console.log(movies);
  })
  .catch((err) => {
    console.error(err);
  });
*/
  module.exports = database;