import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    fName: { type: String, required: true, trim: true },
    lName: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    phone: { type: Number, required: true, trim: true },
    password: { type: String, required: true },
    answer: { type: String, required: true, trim: true },
    address: {
      addressLine: { type: String, required: true },
      state: { type: String, required: true },
      city: { type: String, required: true },
      country: { type: String, default: "India" },
      zipCode: { type: Number, required: true },
    },
    wishlist: [
      {
        type: mongoose.ObjectId,
        ref: "Product",
      },
    ],
    role: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default new mongoose.model("user", userSchema);
