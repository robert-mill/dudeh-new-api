const Joi = require("joi");
const mongoose = require("mongoose");

const navintroSchema = new mongoose.Schema({
  heading: {
    type: String,
  },
  body: {
    type: String,
  },
  image: {
    type: String,
  },
  imageID: {
    type: String,
  },
});

const NavIntros = mongoose.model("NavIntros", navintroSchema);

function validateAbout(navintro) {
  const schema = {
    heading: Joi.string().allow("").optional(),
    body: Joi.string().allow("").optional(),
    image: Joi.string().allow("").optional(),
    imageID: Joi.string().allow("").optional(),
  };

  return Joi.validate(navintro, schema);
}

exports.navintroSchema = navintroSchema;
exports.NavIntros = NavIntros;
exports.validate = validateAbout;
