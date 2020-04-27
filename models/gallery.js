const Joi = require("joi");
const mongoose = require("mongoose");

const gallerySchema = new mongoose.Schema({
  heading: {
    type: String,
    minlength: 5,
    maxlength: 50,
  },
  body: {
    type: String,
    minlength: 5,
  },
  image: {
    type: String,
  },
  imageID: {
    type: String,
  },
});

const Gallerys = mongoose.model("Gallerys", gallerySchema);

function validateAbout(gallery) {
  const schema = {
    heading: Joi.string().min(5).required(),
    body: Joi.string().min(5).required(),
    image: Joi.string().allow("").optional(),
    imageID: Joi.string().allow("").optional(),
  };

  return Joi.validate(gallery, schema);
}

exports.gallerySchema = gallerySchema;
exports.Gallerys = Gallerys;
exports.validate = validateAbout;
