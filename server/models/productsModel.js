import mongoose, { Schema } from "mongoose";

const category = ["accessories", "mobile", "computer", "book", "handmade"];

const productSchema = new Schema({
  name: { type: String, required: true },
  discription: { type: String, required: true },
  price: { type: Number, required: true },
  category: { enum: category, type: String, required: true },
  images: { type: [String], required: true },
  quantity: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default new mongoose.model("product", productSchema);
