const Joi = require("joi");
const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  heading: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  body: {
    type: String,
    required: true,
    minlength: 5
  }
});

const Events = mongoose.model("Events", eventSchema);

function validateEvent(event) {
  const schema = {
    heading: Joi.string()
      .min(5)
      .max(50)
      .required(),
    body: Joi.string()
      .min(5)
      .required()
  };

  return Joi.validate(event, schema);
}

exports.eventSchema = eventSchema;
exports.Events = Events;
exports.validate = validateEvent;
