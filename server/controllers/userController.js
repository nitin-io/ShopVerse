import usersModel from "../models/usersModel.js";
import {
  generateToken,
  generateHash,
  comparePwd,
} from "../service/userService.js";

export const createNewUser = async (req, res) => {
  const {
    fName,
    lName,
    email,
    password,
    phone,
    addressLine,
    state,
    city,
    zipCode,
  } = req.body;

  try {
    if (!fName) {
      return res.json({ message: "Name not found" });
    }

    if (!lName) {
      return res.json({ message: "Last Name not found." });
    }

    if (!email) {
      return res.json({ message: "Email not found." });
    }

    if (!password) {
      return res.json({ message: "Password not found." });
    }

    if (password.length() < 8) {
      return res.json({ message: "Password must include 8 characters." });
    }

    if (!phone) {
      return res.json({ message: "Phone number not found." });
    }

    if (!state) {
      return res.json({ message: "State not found." });
    }

    if (!city) {
      return res.json({ message: "City not found." });
    }

    if (zipCode) {
      return res.json({ message: "Zip Code not found." });
    }

    if (zipCode.length !== 6) {
      return res.json({ message: "Invalid Zip Code" });
    }

    const existingUser = await usersModel.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User with this email is already exist",
      });
    }
    const hashedPwd = await generateHash(password);

    const newUser = await usersModel.create({
      fName,
      lName,
      email,
      password: hashedPwd,
      phone,
      address: { addressLine, state, city, zipCode },
    });
    if (newUser) {
      return res.status(201).json({
        success: true,
        message: "Successfully created new user",
        newUser,
      }); // Created 201
    }
  } catch (error) {
    return res
      .status(501)
      .json({ success: false, message: "something is wrong", error });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  let user = await usersModel.findOne({ email });

  // Validation
  if (!email || !password) {
    return res
      .status(401)
      .json({ message: "Invalid Email or Password", success: false }); // Unauthorized 401
  }

  // Checking User Exist or not
  if (!user) {
    return res.status(401).json({ message: "user not found", success: false });
  }

  const match = await comparePwd(password, user.password);

  // Password Checking
  if (!match) {
    return res.status(401).json({ message: "Incorrect password." });
  }

  const token = await generateToken(user._id);

  res.status(200).json({
    message: "successfully login",
    token,
    user: {
      fName: user.fName,
      lName: user.lName,
      email: user.email,
      address: user.address,
      phone: user.phone,
    },
  });
};

export const protectedRouteTest = (req, res) => {
  res.json({ message: "Protected Route" });
};
