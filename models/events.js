const Joi = require("joi");
const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
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

const Events = mongoose.model("Events", eventSchema);

function validateEvent(event) {
  const schema = {
    heading: Joi.string().allow("").optional(),
    body: Joi.string().allow("").optional(),
    image: Joi.string().allow("").optional(),
    imageID: Joi.string().allow("").optional(),
  };
  ID;

  return Joi.validate(event, schema);
}

exports.eventSchema = eventSchema;
exports.Events = Events;
exports.validate = validateEvent;
