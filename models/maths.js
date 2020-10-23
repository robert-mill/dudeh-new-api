const Joi = require("joi");
const mongoose = require("mongoose");

const mathSchema = new mongoose.Schema({
  heading: {
    type: String,
  },
  body: {
    type: String,
  },
  image: {
    type: String,
  },
  imageId:{
      type: String,
  },
  caption: {
    type: String,
  },
});

const Math = mongoose.model("Math", mathSchema);

function validateMath(math) {
  const schema = {
    heading: Joi.string().allow("").optional(),
    body: Joi.string().allow("").optional(),
    image: Joi.string().allow("").optional(),
    imageId: Joi.string().allow("").optional(),
    caption: Joi.string().allow("").optional(),
  };

  return Joi.validate(math, schema);
}

exports.mathSchema = mathSchema;
exports.Math = Math;
exports.validate = validateMath;
