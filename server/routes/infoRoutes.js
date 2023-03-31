import { Router } from "express";
import {
  districtController,
  stateController,
} from "../controllers/infoControllers.js";

const router = Router();

router.get("/:state/districts", districtController);
router.get("/states", stateController);

export default router;
