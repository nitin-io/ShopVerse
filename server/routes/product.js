const express = require("express");
const router = express.Router();
const {addProduct, showAllProducts} = require("./../controllers/product");

router.get("/all", showAllProducts)
router.post("/add", addProduct)

module.exports = router;