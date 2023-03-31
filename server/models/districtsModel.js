import mongoose, { Schema } from "mongoose";

const districtSchema = new Schema({
  state: String,
  districts: [String],
});

export default new mongoose.model("district", districtSchema);
