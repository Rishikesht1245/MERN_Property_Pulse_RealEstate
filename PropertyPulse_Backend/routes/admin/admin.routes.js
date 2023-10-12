import express from "express";
import {
  createAdmin,
  signIn,
} from "../../controllers/admin/admin.controller.js";

const router = express.Router();

router.post("/signup", createAdmin);

router.post("/signin", signIn);

export default router;
