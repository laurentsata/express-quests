const { body, validationResult } = require('express-validator');

const validateMovie = [
  body("title").isLength({ max: 255 }),
  body("director").isLength({ max: 255 }),
  body("year").isLength({ max: 4, min:4 }),
  body("color").isLength({ max: 10 }),
  body("duration").isLength({ max: 4 }),
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(422).json({ validationErrors: errors.array() });
    } else {
      next();
    }
  },
];

const validateUser = [
  body("email").isEmail(),
  body("firstname").isLength({ min: 5, max: 255 }),
  body("lastname").isLength({ min:5, max: 255 }),
  body("city").isLength({max: 20, min: 3}),
  body("language").isLength({max: 10, min: 2}),
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(422).json({ validationErrors: errors.array() });
    } else {
      next();
    }
  },
];


  module.exports = {
    validateMovie,
    validateUser
  };