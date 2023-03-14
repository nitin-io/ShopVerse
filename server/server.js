const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("./models/users-model");
const Product = require("./models/products-model");
require("dotenv").config();
const { default: mongoose } = require("mongoose");
const port = process.env.PORT || 8080;

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose
  .connect(process.env.MONGO_CONNECT_URL)
  .then(() => {
    console.log("Connected with MongoDB server");
  })
  .catch((err) => {
    console.error(err);
  });

app.get("/", async (req, res) => {
  res.status(200).json({ message: "It's working send more!" });
});

app.route("/register").post(async (req, res) => {
  const { fName, lName, email, password } = req.body;
  console.log(req.body);
  try {
    const user = await User.findOne({ email });

    if (user) {
      res.status(401).json({ message: "User Already Exits" });
    }
    const hash = await bcrypt.hash(password, 10);

    const newUser = new User({ fName, lName, email, hash });
    await newUser.save();

    res.status(200).json({ message: "Successfully Registered" });
  } catch (error) {
    console.error(error);
  }
});

// Login Routes

app.route("/login").post(async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      res.status(401).json({ message: "User not found." });
    }

    const isPassword = await bcrypt.compare(password, user.hash);

    if (!isPassword) {
      res.status(401).json({ message: "Incorrect password." });
    }

    const token = await jwt.sign(
      {
        name: user.name,
        email: user.email,
      },
      process.env.JWT_SECRET
    );
    res.status(200).json({ message: "Successfully login.", token: token });
  } catch (error) {
    console.error(error);
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://127.0.0.1:${port}`);
});
