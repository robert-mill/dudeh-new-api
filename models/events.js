const Joi = require("joi");
const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  headingtxt: {
    type: String,
  },
  bodytxt: {
    type: String,
  },
  imagemain: {
    type: String,
  },
  imagemainID: {
    type: String,
  },
});

const Events = mongoose.model("Events", eventSchema);

function validateEvent(event) {
  const schema = {
    headingtxt: Joi.string().allow("").optional(),
    bodytxt: Joi.string().allow("").optional(),
    imagemain: Joi.string().allow("").optional(),
    imagemainID: Joi.string().allow("").optional(),
  };
  ID;

  return Joi.validate(event, schema);
}

exports.eventSchema = eventSchema;
exports.Events = Events;
exports.validate = validateEvent;
