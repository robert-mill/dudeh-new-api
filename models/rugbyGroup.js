const Joi = require("joi");
const mongoose = require("mongoose");

const rugbyGroupSchema = new mongoose.Schema({
  heading: {
    type: String,
  },
  body: {
    type: String,
  },
  image: {
    type: String,
  },
  caption: {
    type: String,
  },
  video: {
    type: String,
  },
  videoCaption: {
    type: String,
  },
});

const RugbyGroup = mongoose.model("RugbyGroup", rugbyGroupSchema);

function validateRugbyGroup(rugbyGroup) {
  const schema = {
    heading: Joi.string().allow("").optional(),
    body: Joi.string().allow("").optional(),
    image: Joi.string().allow("").optional(),
    caption: Joi.string().allow("").optional(),
    video: Joi.string().allow("").optional(),
    videoCaption: Joi.string().allow("").optional(),
  };

  return Joi.validate(rugbyGroup, schema);
}

exports.rugbyGroupSchema = rugbyGroupSchema;
exports.RugbyGroup = RugbyGroup;
exports.validate = validateRugbyGroup;
