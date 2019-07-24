const Validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  if (!Validator.isLength(data.name, { min: 4, max: 32 })) {
    errors.name = "Name must be between 4 and 32 characters in length";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
