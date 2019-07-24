const Validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = function validateProfileUpdate(data) {
  let errors = {};
  let {
    handle,
    occupation,
    bio,
    location,
    status,
    interests,
    expreience,
    education,
    instagram,
    linkedin,
    youtube
  } = data;

  // Validate data if given
  if (!isEmpty(handle)) {
    if (!Validator.isLength(handle, { min: 2, max: 32 })) {
      errors.handle = "Handle must be between 2 and 32 characters";
    }
  }
  if (!isEmpty(occupation)) {
    if (!Validator.isLength(occupation, { max: 32 })) {
      errors.handle = "Occupation must be less than 32 characters";
    }
  }
  if (!isEmpty(bio)) {
    if (!Validator.isLength(bio, { max: 256 })) {
      errors.handle = "Bio must be less than 256 characters";
    }
  }
  if (!isEmpty(location)) {
    if (!Validator.isLength(location, { max: 64 })) {
      errors.handle = "Location must be less than 64 characters";
    }
  }

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
