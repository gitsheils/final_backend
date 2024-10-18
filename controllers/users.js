const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const signup = (req, res, next) => {
  const { email, password } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({ email, password: hash }))
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === "MongoServerError") {
        const error = new Error("This email is already taken");
        error.statusCode = 409;
        return next(error);
      }
      if (err.name === "ValidationError") {
        const error = new Error("Invalid data");
        error.statusCode = 400;
        return next(error);
      }
      return next(err);
    });
};

const signin = (req, res, next) => {
  const { email, password } = req.body;

  const { JWT_SECRET = "dev-key" } = process.env;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      res.send({ token });
    })
    .catch((err) => {
      if (err.message === "Incorrect email or password") {
        const error = new Error(err.message);
        error.statusCode = 401;
        return next(error);
      }

      return next(err);
    });
};
const getUser = (req, res, next) => {
  User.find({ _id: req.user })
    .then((user) => {
      res.send(user[0]);
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = {
  signup,
  signin,
  getUser,
};
