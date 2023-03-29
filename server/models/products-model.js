const mongoose = require("mongoose");
const { Schema } = mongoose;

const category = ["accessories", "mobile", "computer", "book", "handmade"];

const productSchema = new Schema({
  name: { type: String, required: true },
  discription: { type: String, required: true },
  price: { type: Number, required: true },
  category: { enum: category, type: String, required: true },
  images: {type: [String], required: true},
  quantity: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = new mongoose.model("product", productSchema);
