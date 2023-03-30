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
    password: { type: String, required: true },
    address: {
      zipCode: { type: Number, required: true },
      state: { type: String, required: true },
      city: { type: String, required: true },
      country: { type: String, required: true },
    },
    role: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default new mongoose.model("user", userSchema);
