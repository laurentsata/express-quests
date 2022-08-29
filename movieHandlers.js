/* eslint-disable no-undef */
/*const movies = [
  {
    id: 1,
    title: "Citizen Kane",
    director: "Orson Wells",
    year: "1941",
    colors: false,
    duration: 120,
  },
  {
    id: 2,
    title: "The Godfather",
    director: "Francis Ford Coppola",
    year: "1972",
    colors: true,
    duration: 180,
  },
  {
    id: 3,
    title: "Pulp Fiction",
    director: "Quentin Tarantino",
    year: "1994",
    color: true,
    duration: 180,
  },
]; */

const database = require("./database");

/*const getMovies = (req, res) => {
  database
    .query("select * from movies")
    .then(([movies]) => {
      res.json(movies);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
}; */

const getMovies = (req, res) => {
  let sql = "select * from movies";
  const sqlValues = [];

  if (req.query.color != null) {//***contiendra la couleur ***
    sql += " where color = ?";
    sqlValues.push(req.query.color);//*******et **************
    if (req.query.max_duration != null) {
      sql += " and duration <= ?";//***contiendra la durée ***
      sqlValues.push(req.query.max_duration);
    }
  } else if (req.query.max_duration != null) {
    sql += " where duration <= ?";
    sqlValues.push(req.query.max_duration);
  }

  database
    .query(sql, sqlValues)
    .then(([movies]) => {
      res.json(movies);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
};
/*
const getMovies = (req, res) => {
  const initialSql = "select * from movies";
  const where = [];

  if (req.query.color != null) {
    where.push({
      column: "color",
      value: req.query.color,
      operator: "=",
    });
  }
  if (req.query.max_duration != null) {
    where.push({
      column: "duration",
      value: req.query.max_duration,
      operator: "<=",
    });
  }

  database
    .query(
      where.reduce(
        (sql, { column, operator }, index) =>
          `${sql} ${index === 0 ? "where" : "and"} ${column} ${operator} ?`,
        initialSql
      ),
      where.map(({ value }) => value)
    )
    .then(([movies]) => {
      res.json(movies);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
}; */

const getMovieById = (req, res) => {
  const id = parseInt(req.params.id);

  database
    .query("select * from movies where id = ?", [id])
    .then(([movies]) => {
      if (movies[0] != null) {
        res.json(movies[0]);
      } else {
        res.status(404).send("Not Found, oh my god !!!"); // *** status 404 si non trouvé
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database"); // *** status 500 si erreur
    });
};
//*************création route POST (ne pas oublier l'export- line 68 ainsi que line 25 dans app.js)
const postMovie = (req, res) => {
  //res.send("Post route is working 🎉");
  const { title, director, year, color, duration } = req.body; //extrait toutes les variables pour envoyer que les informations que nous souhaitons INSERER
  //***utilise database.query pour écrire la requête INSERT ***
  database
    .query(
      "INSERT INTO movies(title, director, year, color, duration) VALUES (?, ?, ?, ?, ?)", //**les ? seront remplacés par le module mysql2 avant que la requête ne soit envoyée à la base de données**
      [title, director, year, color, duration]
    )
    .then(([result]) => {
      res.location(`/api/movies/${result.insertId}`).sendStatus(201); //***https://www.restapitutorial.com/lessons/httpmethods.html ***
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error saving the movie");
    });
};

//***création d'une route PUT (ne pas oublier l'export en bas de pag et app.put dans app.js)***
const updateMovie = (req, res) => {
  const id = parseInt(req.params.id);
  const { title, director, year, color, duration } = req.body;

  database
    .query(
      "update movies set title = ?, director = ?, year = ?, color = ?, duration = ? where id = ?",
      [title, director, year, color, duration, id]
    )
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.status(404).send("Not Found");
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error editing the movie");
    });
};

//***création d'une route DELETE (ne pas oublier l'export en bas de pag et app.put dans app.js)***
const deleteMovie = (req, res) => {
  const id = parseInt(req.params.id);

  database
    .query("delete from movies where id = ?", [id])
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.status(404).send("Not Found");
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error deleting the movie");
    });
};

module.exports = {
  getMovies,
  getMovieById,
  postMovie, //********export de la fonction postMovie********
  updateMovie, //******export de la fonction updateMovie******
  deleteMovie, //******export de la fonction deleteMovie******
};
