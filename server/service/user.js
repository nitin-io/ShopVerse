const User = require("./../models/users-model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// Add a user

const isUserAlreadyExist = async (email) => {
  const user = await User.findOne({ email: email });
  if (user) {
    return user;
  } else {
    return false;
  }
};

const addUser = async (fName, lName, email, password) => {
  const hash = await bcrypt.hash(password, 10);

  const newUser = new User({ fName, lName, email, hash });
  await newUser.save();
};

const generateToken = email => {
  return jwt.sign({ email: email }, process.env.JWT_SECRET);
};

const comparePwd = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};

// Get a user

module.exports = { addUser, isUserAlreadyExist, generateToken, comparePwd };
