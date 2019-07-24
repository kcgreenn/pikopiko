const Validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = function validateLoginInput(data) {
  let errors = {};
  let { email, password } = data;
  // Ensure all values are strings for Validator
  email = !isEmpty(email) ? email : "";
  password = !isEmpty(password) ? password : "";

  // Check if email is correct format
  if (!Validator.isEmail(email)) {
    errors.email = "Email is invalid";
  }

  // Check if any fields are empty
  if (Validator.isEmpty(email)) {
    errors.email = "Email field is required";
  }
  if (Validator.isEmpty(password)) {
    errors.password = "Password field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
