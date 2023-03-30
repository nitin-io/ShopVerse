import { Router } from "express";
import {
  createNewUser,
  loginUser,
  protectedRouteTest,
} from "../controllers/userController.js";
import { isAdmin, verifySignIn } from "../service/authMiddleware.js";

const router = Router();

router.post("/register", createNewUser);
router.post("/login", loginUser);
router.get("/test", verifySignIn, isAdmin, protectedRouteTest);

export default router;
