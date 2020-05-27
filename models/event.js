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
  caption: {
    type: String,
  },
});

const Event = mongoose.model("Event", eventSchema);

function validateEvent(event) {
  const schema = {
    heading: Joi.string().allow("").optional(),
    body: Joi.string().allow("").optional(),
    image: Joi.string().allow("").optional(),
    caption: Joi.string().allow("").optional(),
  };

  return Joi.validate(event, schema);
}

exports.eventSchema = eventSchema;
exports.Event = Event;
exports.validate = validateEvent;
