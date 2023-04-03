import { Router } from "express";
import {
  createNewUser,
  loginUser,
  protectedRouteTest,
} from "../controllers/userController.js";
import { isAdmin, verifySignIn } from "../service/authMiddleware.js";

const router = Router();

// Add new user to database
router.post("/register", createNewUser);

// Sends back user details and jwt token
router.post("/login", loginUser);

// testing route for protected routes
router.get("/test", verifySignIn, isAdmin, protectedRouteTest);

// protect route verification for normal user
router.get("/user-auth", verifySignIn, (req, res) => {
  res.status(200).json({ ok: true });
});

export default router;
