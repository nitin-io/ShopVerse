const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("./models/users-model");
const Product = require("./models/products-model");
const fs = require("fs");
require("dotenv").config();
const { default: mongoose } = require("mongoose");
const port = process.env.PORT || 5000;
const userRoute = require("./routes/User");

const app = express();
app.use(express.json());
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

app.use("/api", userRoute);

app.get("/", async (req, res) => {
  const count = fs.readFileSync("count.txt", "utf-8");
  const newCount = parseInt(count) + 1;
  fs.writeFileSync("count.txt", `${newCount}`);

  res.status(200).json({ message: "It's working!", serverVisit: newCount });
});

// Product Management

app.post("/add-products", async (req, res) => {
  const { name, price, description, image } = req.body;

  try {
    const newProduct = new Product({
      name,
      price,
      description,
      category,
      quantity,
      image,
    });
    await newProduct.save();
    res.status(200).json({ message: "Product added successfully" });
  } catch (error) {
    console.error(error);
  }
});

app.get("/products", async (req, res) => {
  try {
    const products = await Product.find({});
    res
      .status(200)
      .json({ message: "Product found successfully", products: products });
  } catch (error) {
    console.error(error);
  }
});

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
