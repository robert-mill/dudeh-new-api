const Joi = require("joi");
const mongoose = require("mongoose");

const actorSchema = new mongoose.Schema({
  image: {
    type: String,
  },
  caption: {
    type: String,
  },
});

const actor = mongoose.model("actor", actorSchema);

function validateactor(actor) {
  const schema = {
    image: Joi.string().allow("").optional(),
    caption: Joi.string().allow("").optional(),
  };

  return Joi.validate(actor, schema);
}

exports.actorSchema = actorSchema;
exports.actor = actor;
exports.validate = validateactor;
