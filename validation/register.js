const Validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = function validateRegisterInput(data) {
  let errors = {};
  let { name, email, password, password2 } = data;
  // Ensure all values are strings for Validator
  name = !isEmpty(name) ? name : "";
  email = !isEmpty(email) ? email : "";
  password = !isEmpty(password) ? password : "";
  password2 = !isEmpty(password2) ? password2 : "";

  // Check if name and password are correct length
  if (!Validator.isLength(name, { min: 4, max: 32 })) {
    errors.name = "Name must be between 4 and 32 characters in length";
  }
  if (!Validator.isLength(password, { min: 6, max: 32 })) {
    errors.password = "Password must be between 6 and 32 characters in length";
  }

  // Check if email is correct format
  if (!Validator.isEmail(email)) {
    errors.email = "Email is invalid";
  }

  // Check if passwords match
  if (!Validator.equals(password, password2)) {
    errors.password2 = "Passwords must match";
  }

  // Check if any fields are empty
  if (Validator.isEmpty(name)) {
    errors.name = "Name field is required";
  }
  if (Validator.isEmpty(email)) {
    errors.email = "Email field is required";
  }
  if (Validator.isEmpty(password)) {
    errors.password = "Password field is required";
  }
  if (Validator.isEmpty(password2)) {
    errors.password2 = "Confirm Password field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
