const Validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = function validateExpInput(data) {
  let errors = {};

  let { title, company, from } = data;
  title = !isEmpty(title) ? title : "";
  company = !isEmpty(company) ? company : "";
  from = !isEmpty(from) ? from : "";

  if (Validator.isEmpty(title)) {
    errors.title = "Job title is required";
  }
  if (Validator.isEmpty(company)) {
    errors.company = "Company field is required";
  }
  if (Validator.isEmpty(from)) {
    errors.from = "From date field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
