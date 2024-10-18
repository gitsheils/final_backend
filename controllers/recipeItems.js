const RecipeItem = require("../models/recipeItem");

const getShared = (req, res, next) => {
  RecipeItem.find({ shared: true })
    .then((recipes) => {
      res.send(recipes);
    })
    .catch((err) => {
      return next(err);
    });
};

const addRecipe = (req, res, next) => {
  //if no image in req then image=undefined. if image=undefined then create() will ignore it
  const { title, ing, ins, image = undefined, shared } = req.body;

  RecipeItem.create({
    title,
    ingredients: ing,
    instruction: ins,
    image,
    owner: req.user,
    shared,
  })
    .then((recipe) => {
      res.send(recipe);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        const error = new Error("Invalid data");
        error.statusCode = 400;
        return next(error);
      }
      return next(err);
    });
};
const getMyrecipes = (req, res, next) => {
  RecipeItem.find({ owner: req.user })
    .then((recipes) => {
      res.send(recipes);
    })
    .catch((err) => {
      return next(err);
    });
};
const deleteRecipe = (req, res, next) => {
  RecipeItem.findById(req.params.id)
    .orFail()
    .then((item) => {
      if (!(item.owner.toString() === req.user._id)) {
        const error = new Error("Item does not belong to user");
        error.statusCode = 403;
        throw error;
      }
      return RecipeItem.findByIdAndDelete(req.params.id).then(() =>
        res.send(item)
      );
    })
    .catch((err) => {
      if (err.name === "CastError") {
        const error = new Error("Invalid data");
        error.statusCode = 400;
        return next(error);
      }
      if (err.name === "DocumentNotFoundError") {
        const error = new Error(err.message);
        error.statusCode = 404;

        return next(error);
      }
      return next(err);
    });
};

module.exports = {
  getShared,
  addRecipe,
  getMyrecipes,
  deleteRecipe,
};
