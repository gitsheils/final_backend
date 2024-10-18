const { Joi, celebrate } = require("celebrate");
const validator = require("validator");

const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error("string.uri");
};

const validateSignup = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().messages({
      "string.empty": 'The "email" field must be filled in',
    }),
    password: Joi.string().required().messages({
      "string.empty": 'The "password" field must be filled in',
    }),
  }),
});

const validateSignin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().messages({
      "string.empty": 'The "email" field must be filled in',
    }),
    password: Joi.string().required().messages({
      "string.empty": 'The "password" field must be filled in',
    }),
  }),
});

//validate required input are present in req before
//Mongo executes its create(). image is not required so
//don't need to celebrate/joi validate it
const validateItem = celebrate({
  body: Joi.object().keys({
    title: Joi.string().required().messages({
      "string.empty": 'The "title" field must be filled in',
    }),
    ing: Joi.string().required().messages({
      "string.empty": 'The "ing" field must be filled in',
    }),
    ins: Joi.string().required().messages({
      "string.empty": 'The "ins" field must be filled in',
    }),
    shared: Joi.boolean().required().messages({
      "string.empty": 'The "shared" field must be filled in',
    }),
    image: Joi.string(),
    /*
    image: Joi.string().custom(validateURL).messages({
      "string.uri": 'the "image" field must be a valid url',
    }),
    */
  }),
});

module.exports = {
  validateSignup,
  validateSignin,
  validateItem,
};
