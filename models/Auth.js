const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Schema creation
const AuthSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String //fetched from gravatar by email.
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = User = mongoose.model("Auth", AuthSchema);
