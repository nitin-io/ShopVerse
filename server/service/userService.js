import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const generateToken = (id) => {
  try {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
  } catch (error) {
    console.log(`JTW Token Error: ${error}`.bgRed.white);
  }
  return jwt.sign({ email }, process.env.JWT_SECRET);
};

export const generateHash = async (password) => {
  try {
    return await bcrypt.hash(password, 10);
  } catch (error) {
    console.log(`Password Encryption Error: ${error}`.bgRed.white);
  }
};

export const comparePwd = async (password, hash) => {
  try {
    return await bcrypt.compare(password, hash);
  } catch (error) {
    console.log(`Password Comparing Error: ${error}`.bgRed.white);
  }
};

// Get a user
