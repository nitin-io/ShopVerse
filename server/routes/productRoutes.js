import express from "express";
import {
  addProduct,
  allProducts,
  imageController,
  singleProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productControllers.js";
import { isAdmin, verifySignIn } from "../service/authMiddleware.js";
import ExpressFormidable from "express-formidable";
const router = express.Router();

// Public Product Routes
router.get("/products", allProducts);
router.get("/products/:slug", singleProduct);
router.get("/images/:pid", imageController);

// Private Post and Put Route to create and
// update procuts using ExprssFomidable Middleware;
router.post(
  "/add-product",
  verifySignIn,
  isAdmin,
  ExpressFormidable(),
  addProduct
);

router.put(
  "/update-product/:pid",
  verifySignIn,
  isAdmin,
  ExpressFormidable(),
  updateProduct
);

router.delete("/delete/:id", verifySignIn, isAdmin, deleteProduct);

export default router;
