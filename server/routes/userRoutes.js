import { Router } from "express";
import {
  createNewUser,
  loginUser,
  protectedRouteTest,
  forgetPasswordController,
  updateUserController,
  fetchOrdersController,
  fetchAllOrdersController,
  updateOrderStatusController,
  addToWishlist,
  fetchWishlist,
  removeFromWishlist,
} from "../controllers/userController.js";
import { isAdmin, verifySignIn } from "../service/authMiddleware.js";

const router = Router();

// Add new user
router.post("/register", createNewUser);

// Update user
router.put("/profile", verifySignIn, updateUserController);

// Sends back user details and jwt token
router.post("/login", loginUser);

// testing route for protected routes
router.get("/test", verifySignIn, isAdmin, protectedRouteTest);

// protect route verification for user
router.get("/user-auth", verifySignIn, (req, res) => {
  res.status(200).json({ ok: true });
});

// protect route verification for admin
router.get("/admin-auth", verifySignIn, isAdmin, (req, res) => {
  res.status(200).json({ ok: true });
});

// Route to update password in case user forget their password
router.post("/forget-password", forgetPasswordController);

// Orders route
router.get("/orders", verifySignIn, fetchOrdersController);

// Admin Orders
router.get("/admin-orders", verifySignIn, isAdmin, fetchAllOrdersController);

// Update Order Status
router.put(
  "/update-status/:orderId",
  verifySignIn,
  isAdmin,
  updateOrderStatusController
);

// Wishlist Add, Fetch, and Remove
router.put("/add-to-wishlist/:productId", verifySignIn, addToWishlist);

router.get("/wishlist", verifySignIn, fetchWishlist);

router.put(
  "/remove-from-wishlist/:productId",
  verifySignIn,
  removeFromWishlist
);

export default router;
