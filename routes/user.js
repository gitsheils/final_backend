const router = require("express").Router();
const User = require("../models/user");

const authorization = require("../middleware/auth");
const { getUser } = require("../controllers/users");

router.use(authorization);
router.get("/getuser", getUser);

module.exports = router;
