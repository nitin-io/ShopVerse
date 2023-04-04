import express from "express";
import {
  addProduct,
  allProducts,
  singleProduct,
} from "../controllers/productControllers.js";
import { isAdmin, verifySignIn } from "../service/authMiddleware.js";
import ExpressFormidable from "express-formidable";
const router = express.Router();

router.get("/products", allProducts);
router.get("/products/:slug", singleProduct);
router.post(
  "/add-product",
  verifySignIn,
  isAdmin,
  ExpressFormidable(),
  addProduct
);

export default router;
