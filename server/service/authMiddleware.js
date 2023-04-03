import jwt from "jsonwebtoken";
import usersModel from "../models/usersModel.js";

export const verifySignIn = async (req, res, next) => {
  try {
    const decoded = await jwt.verify(
      req.headers.authorization, //Authorization
      process.env.JWT_SECRET
    );
    req.user = decoded;
    next();
  } catch (error) {
    console.log(error);
  }
};

export const isAdmin = async (req, res, next) => {
  try {
    const user = await usersModel.findById(req.user.id);
    if (!user) {
      res.status(401).json({ message: "user not found" });
    }

    if (user.role !== 1) {
      return res.status(401).json({ message: "UnAuthorized Access" });
    } else {
      next();
    }
  } catch (error) {
    console.log(`Error in Admin middleware ${error}`);
    res.json({ message: "UnAuthorized" });
  }
};
