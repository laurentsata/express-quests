/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/*const users = [
    {  
        id: 1,
        firstname: 'John',
        lastname: 'Doe',
        email: 'john.doe@example.com',
        city: 'Paris',
        language: 'English',
    },
    {
        id: 2,
        firstname: 'Valeriy',
        lastname: 'Appius',
        email: 'valeriy.appius@example.com',
        city: 'Moscow',
        language: 'Russian',
    },
    {
        id: 3,
        firstname: 'Ralf',
        lastname: 'Geronimo',
        email: 'ralf.geronimo@example.com',
        city: 'New York',
        language: 'Italian',
    },
    {
        id: 4,
        firstname: 'Maria',
        lastname: 'Iskandar',
        email: 'maria.iskandar@example.com',
        city: 'New York',
        language: 'German',
    },
    {
        id: 5,
        firstname:'Jane',
        lastname: 'Doe',
        email: 'jane.doe@example.com',
        city: 'London',
        language: 'English',
    },
    {
        id: 6,
        firstname: 'Johanna',
        lastname:'Martino',
        email: 'johanna.martino@example.com',
        city: 'Milan',
        language: 'Spanish',
    },
]; */

const database = require("./database");

const getUsers = (req, res) => {
  database
    .query("select * from users")
    .then(([users]) => {
      res.json(users);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
};



const getUserById = (req, res) => {
  const id = parseInt(req.params.id);

  database
    .query("select * from users where id = ?", [id])
    .then(([users]) => {
      if (users[0] != null) {
        res.json(users[0]);
      } else {
        res.status(404).send("Not Found, oh my god !!!"); // *** status 404 si non trouvé
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database"); // *** status 500 si erreur
    });
};

//*************création route POST (ne pas oublier l'export)
const postUser = (req, res) => {
  //res.send("Post route is working 🎉");
  const { firstname, lastname, email, city, language } = req.body; //extrait toutes les variables pour envoyer que les informations que nous souhaitons INSERER
  //***utilise database.query pour écrire la requête INSERT ***
  database
    .query(
      "INSERT INTO users (firstname, lastname, email, city, language) VALUES (?, ?, ?, ?, ?)", //**les ? seront remplacés par le module mysql2 avant que la requête ne soit envoyée à la base de données**
      [firstname, lastname, email, city, language]
    )
    .then(([result]) => {
      res.location(`/api/users/${result.insertId}`).sendStatus(201); //***https://www.restapitutorial.com/lessons/httpmethods.html ***
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error saving the user");
    });
};


module.exports = {
  getUsers,
  getUserById,
  postUser, //********export de la fonction postUser
};