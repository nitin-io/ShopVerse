import { Router } from "express";
import { isAdmin, verifySignIn } from "../service/authMiddleware.js";
import {
  createCategory,
  readCategories,
  updateCategory,
  deleteCategory,
  singleCategory,
} from "../controllers/categoryController.js";

const router = Router();

router.post("/create", verifySignIn, isAdmin, createCategory);

router.get("/all", readCategories);

router.get("/single-category/:slug", singleCategory);

router.put("/update/:id", verifySignIn, isAdmin, updateCategory);

router.delete("/delete/:id", verifySignIn, isAdmin, deleteCategory);

export default router;
