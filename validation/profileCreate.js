const Validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = function validateProfileInput(data) {
  let errors = {};
  let { handle, status, interests, youtube, instagram, linkedin } = data;

  // Ensure all values are strings for Validator
  handle = !isEmpty(handle) ? handle : "";
  status = !isEmpty(status) ? status : "";
  interests = !isEmpty(interests) ? interests : "";

  if (!Validator.isLength(handle, { min: 2, max: 32 })) {
    errors.handle = "Handle must be between 2 and 32 characters in length";
  }
  //   Validate required fields are given
  if (Validator.isEmpty(handle)) {
    errors.handle = "Handle is required";
  }
  if (Validator.isEmpty(status)) {
    errors.Status = "Status is required";
  }
  if (Validator.isEmpty(interests)) {
    errors.interests = "Interests is required";
  }
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
