const isEmpty = require("./isEmpty");
const Validator = require("validator");

module.exports = function validateCommentInput(data) {
  let errors = {};
  let { text } = data;
  text = !isEmpty(text) ? text : "";
  if (!Validator.isLength(text, { min: 12, max: 256 })) {
    errors.text = "Comments must be between 12 and 256 characters";
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
