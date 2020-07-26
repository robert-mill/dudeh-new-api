const Joi = require("joi");
const mongoose = require("mongoose");
const bgSchema = new mongoose.Schema({
  image: {
    type: String,
  },
});
const Bg = mongoose.model("Bg", bgSchema);
function validateBg(bg) {
  const schema = {
    image: Joi.string().allow("").optional(),
  };
  return Joi.validate(bg, schema);
}
exports.bgSchema = bgSchema;
exports.Bg = Bg;
exports.validate = validateBg;
