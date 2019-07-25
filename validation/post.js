const Validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = function validatePostInput(data) {
  let errors = {};
  let { text } = data;
  // Ensure all values are strings for Validator
  text = !isEmpty(text) ? text : "";

  // Check if text is correct length
  if (!Validator.isLength(text, { min: 12, max: 256 })) {
    errors.text = "Posts be between 12 and 256 characters";
  }

  // Check if text field is empty
  if (Validator.isEmpty(text)) {
    errors.text = "Text field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
