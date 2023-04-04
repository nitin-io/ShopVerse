import mongoose, { Schema } from "mongoose";

const productSchema = new Schema(
  {
    name: { type: String, required: true },
    discription: { type: String, required: true },
    price: { type: Number, required: true },

    category: {
      type: mongoose.ObjectId,
      ref: "Category",
      required: true,
    },

    slug: {
      type: String,
      lowercase: true,
    },

    images: {
      data: Buffer,
      contentType: String,
    },

    quantity: { type: Number, required: true },
  },
  { timestamps: true }
);

export default new mongoose.model("Product", productSchema);
