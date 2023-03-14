const mongoose = require("mongoose");
const { Schema } = mongoose;

const genders = ["male", "female", "other"];
const roles = ["buyer", "seller"];

const userSchema = new Schema({
  fName: { type: String, required: true },
  lName: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  role: {type: String, default: "buyer", enum: roles, required: true},
  // gender: { type: String, enum: genders, required: true},
  hash: { type: String, required: true }
});

module.exports = new mongoose.model("user", userSchema);
