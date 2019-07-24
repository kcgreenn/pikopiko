const Validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = function validateEduInput(data) {
  let errors = {};

  let { school, degree, fieldOfStudy, from } = data;
  school = !isEmpty(school) ? school : "";
  degree = !isEmpty(degree) ? degree : "";
  fieldOfStudy = !isEmpty(fieldOfStudy) ? fieldOfStudy : "";
  from = !isEmpty(from) ? from : "";

  if (Validator.isEmpty(school)) {
    errors.school = "School field is required";
  }
  if (Validator.isEmpty(degree)) {
    errors.degree = "Degree field is required";
  }
  if (Validator.isEmpty(fieldOfStudy)) {
    errors.fieldOfStudy = "Field Of Study field is required";
  }
  if (Validator.isEmpty(from)) {
    errors.from = "From date field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
