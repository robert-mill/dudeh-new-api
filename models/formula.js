const Joi = require("joi");
const mongoose = require("mongoose");

const formulaSchema = new mongoose.Schema({
  articleId: {
    type: String,
  },
  heading:{
    type: String,
  },
  description:{
    type: String,
  },
  formula: {
    type: String,
  }
});

const Formula = mongoose.model("Formula", formulaSchema);

function validateFormula(formula) {
  const schema = {
    articleId: Joi.string().allow("").optional(),
    heading: Joi.string().allow("").optional(),
    description: Joi.string().allow("").optional(),
    formula: Joi.string().allow("").optional(),
  };

  return Joi.validate(formula, schema);
}

exports.formulaSchema = formulaSchema;
exports.Formula = Formula;
exports.validate = validateFormula;
