const router = require("express").Router();
const recipeItemRouter = require("./recipeItem");
const userRouter = require("./user");
const User = require("../models/user");

const { validateSignup, validateSignin } = require("../middleware/validation");
const { signup, signin } = require("../controllers/users");

router.post("/signup", validateSignup, signup);
router.post("/signin", validateSignin, signin);

router.use("/items", recipeItemRouter);
router.use("/user", userRouter);

router.use((req, res, next) => {
  const error = new Error("Requested resource not found");
  error.statusCode = 404;
  next(error);
});

module.exports = router;
