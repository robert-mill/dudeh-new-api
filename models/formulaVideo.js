const Joi = require("joi");
const mongoose = require("mongoose");

const formulaVideoSchema = new mongoose.Schema({
articleId: {
    type: String,
},
heading: {
    type: String,
},
body: {
    type: String,
},
video:{
    type: String,
  },
videoCaption:{
    type: String,
}, 

});

const FormulaVideo = mongoose.model("FormulaVideo", formulaVideoSchema);

function validateFormulaVideo(formuleaVideo) {
  const schema = {
    articleId: Joi.string().allow("").optional(),
    heading: Joi.string().allow("").optional(),
    body: Joi.string().allow("").optional(),
    video: Joi.string().required(),
    videoCaption: Joi.string().required(),
  };

  return Joi.validate(formuleaVideo, schema);
}

exports.formulaVideoSchema = formulaVideoSchema;
exports.FormulaVideo = FormulaVideo;
exports.validate = validateFormulaVideo;
