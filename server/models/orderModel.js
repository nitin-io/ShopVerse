import mongoose, { Schema } from "mongoose";

const orderSchema = new Schema(
  {
    products: [
      {
        type: mongoose.ObjectId,
        ref: "Product",
      },
    ],
    payment: {},
    buyer: {
      type: mongoose.ObjectId,
      ref: "user",
    },
    status: {
      type: String,
      default: "Not in process",
      enum: [
        "Not in process",
        "In process",
        "Shipped",
        "Delivered",
        "Canceled",
      ],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
