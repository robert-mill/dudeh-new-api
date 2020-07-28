const Joi = require("joi");
const mongoose = require("mongoose");

const swimmingGroupSchema = new mongoose.Schema({
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

const SwimmingGroup = mongoose.model("SwimmingGroup", swimmingGroupSchema);

function validateSwimmingGroup(swimmingGroup) {
  const schema = {
    heading: Joi.string().allow("").optional(),
    body: Joi.string().allow("").optional(),
    image: Joi.string().allow("").optional(),
    caption: Joi.string().allow("").optional(),
    video: Joi.string().allow("").optional(),
    videoCaption: Joi.string().allow("").optional(),
  };

  return Joi.validate(swimmingGroup, schema);
}

exports.swimmingGroupSchema = swimmingGroupSchema;
exports.SwimmingGroup = SwimmingGroup;
exports.validate = validateSwimmingGroup;
