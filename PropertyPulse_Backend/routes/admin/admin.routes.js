import express from "express";
import {
  createAdmin,
  getAllUsers,
  signIn,
} from "../../controllers/admin/admin.controller.js";
import { verifyToken } from "../../utils/verifyAdmin.js";

const router = express.Router();

router.post("/signup", createAdmin);

router.post("/signin", signIn);

router.get("/users", verifyToken, getAllUsers);

export default router;
