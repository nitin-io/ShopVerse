const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");
const fileUpload = require("express-fileupload");
require("dotenv").config();
const { default: mongoose } = require("mongoose");
const port = process.env.PORT || 5000;
const userRoute = require("./routes/User");
const productRoute = require("./routes/product");

const app = express();
app.use(express.json());
app.use(cors());
app.use(fileUpload());
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
app.use("/product", productRoute);

app.get("/", async (req, res) => {
  const count = fs.readFileSync("count.txt", "utf-8");
  const newCount = parseInt(count) + 1;
  fs.writeFileSync("count.txt", `${newCount}`);

  res.status(200).json({ message: "It's working!", serverVisit: newCount });
});

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
