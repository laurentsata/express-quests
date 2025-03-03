/* eslint-disable no-undef */
require("dotenv").config();

const express = require("express");


const app = express();

app.use(express.json()); //**** middleware intégré: express.json()

//const port = 5000; **** definis en dessous ****
const port = process.env.APP_PORT ?? 5000;

const welcome = (req, res) => {
  res.send("Welcome to my favourite movie list !!!");
};

app.get("/", welcome);

//***bien faire un pack (movieHandlers) ***
const movieHandlers = require("./movieHandlers");

app.get("/api/movies", movieHandlers.getMovies);
app.get("/api/movies/:id", movieHandlers.getMovieById);
app.post("/api/movies", movieHandlers.postMovie);
//*** 
const userHandlers = require("./userHandlers");

app.get("/api/users", userHandlers.getUsers);
app.get("/api/users/:id", userHandlers.getUserById);

//***toujours laisser app.listen à la fin ***
app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});
