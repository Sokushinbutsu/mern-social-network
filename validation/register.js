const Validator = require("validator");
const isEmpty = require("./is-empty");

//TODO: fix issue where errors.x is overwritten in case of multiple errors.

module.exports = function validateRegisterInput(data) {
  let errors = {};

  // If field is empty make it empty string for testing purposes
  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";

  if (!Validator.isEmail(data.email)) {
    errors.email = "Invalid Email";
  }

  if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = "Name must be between 2 and 30 characters";
  }

  if (!Validator.isLength(data.password, { min: 10 })) {
    errors.password = "Password must be at least 10 characters";
  }

  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "Passwords do not match";
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = "Name field is required";
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  if (Validator.isEmpty(data.password2)) {
    errors.password2 = "Confirm password field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
