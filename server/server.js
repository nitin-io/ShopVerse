import express from "express";
import cors from "cors";
import fs from "fs";
import colors from "colors";
import dotenv from "dotenv";
import userRoute from "./routes/userRoutes.js";
import productRoute from "./routes/product.js";
import connectDB from "./config/db.js";
// const fileUpload = require("express-fileupload");

// Config

dotenv.config();
const app = express();
connectDB();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
// app.use(fileUpload());

app.use("/api/v1/auth", userRoute);
app.use("/product", productRoute);

app.get("/", async (req, res) => {
  const count = fs.readFileSync("count.txt", "utf-8");
  const newCount = parseInt(count) + 1;
  fs.writeFileSync("count.txt", `${newCount}`);

  res.status(200).json({ message: "It's working!", serverVisit: newCount });
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on ${process.env.PORT}`.bgCyan.white);
});
