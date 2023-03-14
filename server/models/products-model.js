const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema({
    name: {type: String, required: true},
    discription: {type: String, required: true},
    price: {type: Number, required: true},
    category: {type: String, required: true},
    quantity: {type: Number, required: true},
    createdAt: {type: Date, default: Date.now}
});

module.exports = new mongoose.model("product", productSchema);