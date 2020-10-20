const Joi = require("joi");
const mongoose = require("mongoose");

const actorGallerySchema = new mongoose.Schema({
  image: {
    type: String,
  },
  caption: {
    type: String,
  },
});

const ActorGallery = mongoose.model("ActorGallery", actorGallerySchema);

function validateActorGallery(actorGallery) {
  const schema = {
    image: Joi.string().allow("").optional(),
    caption: Joi.string().allow("").optional(),
  };

  return Joi.validate(actorGallery, schema);
}

exports.actorGallerySchema = actorGallerySchema;
exports.ActorGallery = ActorGallery;
exports.validate = validateActorGallery;
