const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateExperienceInput(data) {
  //TODO: Make certain fields required based on whether other fields are filled in
  let errors = {};

  // If field is empty make it empty string for testing purposes
  data.title = !isEmpty(data.title) ? data.title : "";
  data.company = !isEmpty(data.company) ? data.company : "";
  //data.location = !isEmpty(data.location) ? data.location : "";
  data.from = !isEmpty(data.from) ? data.from : "";
  // data.to = !isEmpty(data.to) ? data.to : "";
  // data.current = !isEmpty(data.current) ? data.current : "";
  // data.description = !isEmpty(data.description) ? data.description : "";

  if (Validator.isEmpty(data.title)) {
    errors.title = "Title field is required";
  }

  if (Validator.isEmpty(data.company)) {
    errors.company = "Company field is required";
  }

  if (Validator.isEmpty(data.from)) {
    errors.from = "from field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
