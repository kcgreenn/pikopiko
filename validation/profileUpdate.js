const Validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = function validateProfileUpdate(data) {
  let errors = {};
  let { youtube, instagram, linkedin } = data;

  //   If social links are given, validate they are URLs
  if (!isEmpty(youtube)) {
    if (!Validator.isURL(youtube)) {
      errors.youtube = "Youtube link must be a valid URL";
    }
  }
  if (!isEmpty(instagram)) {
    if (!Validator.isURL(instagram)) {
      errors.instagram = "Instagram link must be a valid URL";
    }
  }
  if (!isEmpty(linkedin)) {
    if (!Validator.isURL(linkedin)) {
      errors.linkedin = "Linkedin link must be a valid URL";
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
