const Joi = require("joi");
const mongoose = require("mongoose");

const nrlGroupSchema = new mongoose.Schema({
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

const NrlGroup = mongoose.model("NrlGroup", nrlGroupSchema);

function validateNrlGroup(nrlGroup) {
  const schema = {
    heading: Joi.string().allow("").optional(),
    body: Joi.string().allow("").optional(),
    image: Joi.string().allow("").optional(),
    caption: Joi.string().allow("").optional(),
    video: Joi.string().allow("").optional(),
    videoCaption: Joi.string().allow("").optional(),
  };

  return Joi.validate(nrlGroup, schema);
}

exports.nrlGroupSchema = nrlGroupSchema;
exports.NrlGroup = NrlGroup;
exports.validate = validateNrlGroup;
