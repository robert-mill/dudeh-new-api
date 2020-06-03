const Joi = require("joi");
const mongoose = require("mongoose");

const resourceSchema = new mongoose.Schema({
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
});

const Resource = mongoose.model("Resource", resourceSchema);

function validateResource(resource) {
  const schema = {
    heading: Joi.string().allow("").optional(),
    body: Joi.string().allow("").optional(),
    image: Joi.string().allow("").optional(),
    caption: Joi.string().allow("").optional(),
  };

  return Joi.validate(resource, schema);
}

exports.resourceSchema = resourceSchema;
exports.Resource = Resource;
exports.validate = validateResource;
