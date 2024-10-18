const router = require("express").Router();

const authorization = require("../middleware/auth");

const { validateItem } = require("../middleware/validation");
const {
  getShared,
  addRecipe,
  getMyrecipes,
  deleteRecipe,
} = require("../controllers/recipeItems");

router.get("/shared", getShared);

router.use(authorization);
router.post("/", validateItem, addRecipe);
router.get("/myrecipes", getMyrecipes);
router.delete("/:id", deleteRecipe);

module.exports = router;
