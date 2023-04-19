import orderModel from "../models/orderModel.js";
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
    answer,
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

    if (password.length < 8) {
      return res.json({ message: "Password must include 8 characters." });
    }

    if (!phone) {
      return res.json({ message: "Phone number not found." });
    }
    if (!answer) {
      return res.json({ message: "Answer is required" });
    }

    if (!state) {
      return res.json({ message: "State not found." });
    }

    if (!city) {
      return res.json({ message: "City not found." });
    }

    if (!zipCode) {
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
      answer,
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
    console.log(error);
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
      role: user.role,
    },
  });
};

export const protectedRouteTest = (req, res) => {
  res.json({ message: "Protected Route" });
};

export const forgetPasswordController = async (req, res) => {
  const { email, newPassword, answer } = req.body;

  try {
    if (!email) {
      return res.status(422).json({ message: "Email Not Found" });
    }
    if (!newPassword) {
      return res.status(422).json({ message: "New Password Not Found" });
    }
    if (newPassword.length < 8) {
      return res
        .status(422)
        .json({ message: "Password length must be atleast 8 character long" });
    }
    if (!answer) {
      return res.status(422).json({ message: "Answer Not Found" });
    }

    const user = await usersModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.answer !== answer) {
      return res.status(401).json({ message: "Wrong answer" });
    }
    const hash = await generateHash(newPassword);
    await usersModel.findByIdAndUpdate(user._id, { password: hash });
    return res
      .status(200)
      .json({ success: true, message: "Password Changed Successfully." });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal server error, please try again later" });
  }
};

export const updateUserController = async (req, res) => {
  try {
    const { fName, lName, password, phone, address } = req.body;
    const { addressLine, state, city, zipCode } = address;
    const user = await usersModel.findById(req.user.id);
    if (password && password.length < 8) {
      return res
        .status(301)
        .json({ message: "Password must be 8 character long." });
    }
    const updatedUser = await usersModel.findByIdAndUpdate(
      req.user.id,
      {
        fName: fName || user.fName,
        lName: lName || user.lName,
        phone: phone || user.phone,
        address: {
          addressLine: addressLine || user.address?.addressLine,
          state: state || user.address?.state,
          city: city || user.address?.city,
          zipCode: zipCode || user.address?.zipCode,
        },
      },
      { new: true }
    );

    console.log(updatedUser.phone);
    return res.status(200).json({
      success: true,
      message: "Successfully updated information",
      user: {
        fName: updatedUser.fName,
        lName: updatedUser.lName,
        email: updatedUser.email,
        address: updatedUser.address,
        phone: updatedUser.phone,
        role: updatedUser.role,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Something is wrong" });
  }
};

export const fetchOrdersController = async (req, res) => {
  try {
    console.log("Orders Fetching...");
    const orders = await orderModel
      .find({ buyer: req.user.id })
      .populate("products", "-images")
      .populate("buyer", "name");
    console.log(orders);
    return res.status(200).json({ orders });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error while fetching orders" });
  }
};
