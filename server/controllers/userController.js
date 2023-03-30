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
    zipCode,
    state,
    city,
    country,
  } = req.body;

  try {
    const existingUser = await usersModel.findOne({ email });

    if (existingUser) {
      res.status(409).json({ message: "user is already exist" });
    }
    const hashedPwd = await generateHash(password);

    const newUser = await usersModel.create({
      fName,
      lName,
      email,
      password: hashedPwd,
      phone,
      address: { zipCode, state, city, country },
    });
    if (newUser) {
      res.status(201).json({ message: "succefully created user", newUser }); // Created 201
    }
  } catch (error) {
    console.log(`User creating error:${error}`.bgRed.white);
    res.status(501).json({ message: "something is wrong", error });
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
