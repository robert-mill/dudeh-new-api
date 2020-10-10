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

const Actor = mongoose.model("Actor", actorSchema);

function validateActor(actor) {
  const schema = {
   
    image: Joi.string().allow("").optional(),
    caption: Joi.string().allow("").optional(),
  };

  return Joi.validate(actor, schema);
}

exports.actorSchema = actorSchema;
exports.Actor = Actor;
exports.validate = validateActor;
