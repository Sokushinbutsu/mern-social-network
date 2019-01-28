const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateLoginInput(data) {
  let errors = {};

  // If field is empty make it empty string for testing purposes
  data.username = !isEmpty(data.username) ? data.username : "";
  data.status = !isEmpty(data.status) ? data.status : "";
  data.skills = !isEmpty(data.skills) ? data.skills : "";

  if (!Validator.isLength(data.username, { min: 2, max: 40 })) {
    errors.username = "Username must be between 2 and 40 characters";
  }

  if (Validator.isEmpty(data.username, { min: 2, max: 40 })) {
    errors.username = "Username is required";
  }

  if (Validator.isEmpty(data.status, { min: 2, max: 40 })) {
    errors.status = "Status is required";
  }

  if (Validator.isEmpty(data.skills, { min: 2, max: 40 })) {
    errors.skills = "Skills field is required";
  }

  // Check to see if empty before validating.
  if (!isEmpty(data.website)) {
    if (!Validator.isURL(data.website)) {
      errors.website = "URL invalid";
    }
  }

  if (!isEmpty(data.youtube)) {
    if (!Validator.isURL(data.youtube)) {
      errors.youtube = "URL invalid";
    }
  }

  if (!isEmpty(data.twitter)) {
    if (!Validator.isURL(data.twitter)) {
      errors.twitter = "URL invalid";
    }
  }

  if (!isEmpty(data.facebook)) {
    if (!Validator.isURL(data.facebook)) {
      errors.facebook = "URL invalid";
    }
  }

  if (!isEmpty(data.linkedin)) {
    if (!Validator.isURL(data.linkedin)) {
      errors.linkedin = "URL invalid";
    }
  }

  if (!isEmpty(data.instagram)) {
    if (!Validator.isURL(data.instagram)) {
      errors.instagram = "URL invalid";
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
