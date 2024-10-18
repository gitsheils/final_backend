const mongoose = require("mongoose");
const validator = require("validator");

const recipeItemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  ingredients: {
    type: String,
    required: true,
  },
  instruction: { type: String, required: true },
  /*
  image: {
    type: String,
    validate: {
      validator(value) {
        return validator.isURL(value);
      },
      message: "You must enter a valid URL",
    },
  },
*/
  image: { type: String },
  owner: { type: String, required: true },
  shared: { type: Boolean, required: true },
});

module.exports = mongoose.model("recipeItem", recipeItemSchema);
