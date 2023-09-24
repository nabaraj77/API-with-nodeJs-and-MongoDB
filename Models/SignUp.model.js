const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SignUpSchmena = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});
const SignUpUsers = mongoose.model("signUpUsers", SignUpSchmena);
module.exports = SignUpUsers;
