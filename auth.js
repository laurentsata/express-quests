const argon2 = require("argon2");

const hashingOptions = {
    type: argon2.argon2id,   //Utiliser Argon2id 
    memoryCost: 2 ** 16,     //configuration minimale de 15 Mio de mémoire, un nombre d'itérations de 2
    timeCost: 5,
    parallelism: 1,          //1 degré de parallélisme
  };

const hashPassword = (req, res, next) => {
   argon2
    .hash(req.body.password, hashingOptions)      //stocker le mot de passe haché dans req.body.hashedPassword
    .then((hashedPassword) => {
      console.log(hashedPassword);

      req.body.hashedPassword = hashedPassword;   //stocker le mot de passe haché dans req.body.hashedPassword
      delete req.body.password;

      next();
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

module.exports = {
  hashPassword,
};