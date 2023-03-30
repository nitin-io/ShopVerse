import express from "express";
import { addProduct, showAllProducts } from "./../controllers/product.js";
const router = express.Router();

router.get("/all", showAllProducts);
router.post("/add", addProduct);

export default router;
