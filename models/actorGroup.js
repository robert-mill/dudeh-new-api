const Joi = require("joi");
const mongoose = require("mongoose");

const actorGroupSchema = new mongoose.Schema({
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

const ActorGroup = mongoose.model("ActorGroup", actorGroupSchema);

function validateActorGroup(actorGroup) {
  const schema = {
    heading: Joi.string().allow("").optional(),
    body: Joi.string().allow("").optional(),
    image: Joi.string().allow("").optional(),
    caption: Joi.string().allow("").optional(),
    video: Joi.string().allow("").optional(),
    videoCaption: Joi.string().allow("").optional(),
  };

  return Joi.validate(actorGroup, schema);
}

exports.actorGroupSchema = actorGroupSchema;
exports.ActorGroup = ActorGroup;
exports.validate = validateActorGroup;
