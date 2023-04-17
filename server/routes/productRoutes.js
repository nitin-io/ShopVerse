import express from "express";
import {
  addProduct,
  allProducts,
  imageController,
  singleProduct,
  updateProduct,
  deleteProduct,
  filterProductController,
  braintreeTokenController,
  braintreePaymentController,
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

// Product Delete Route
router.delete("/delete/:id", verifySignIn, isAdmin, deleteProduct);

// Product filtering route
router.post("/filter", filterProductController);

// Payment Token Route
router.get("/braintree/token", braintreeTokenController);

// Payment Route
router.post("/braintree/payment", verifySignIn, braintreePaymentController);

export default router;
