import { Router } from "express";
import {
  createNewUser,
  loginUser,
  protectedRouteTest,
  forgetPasswordController,
  updateUserController,
  fetchOrdersController,
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

export default router;
