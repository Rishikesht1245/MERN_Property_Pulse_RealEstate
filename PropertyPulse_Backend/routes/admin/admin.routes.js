import express from "express";
import {
  createAdmin,
  getAllUsers,
  blockOrUnblockUser,
  signIn,
} from "../../controllers/admin/admin.controller.js";
import { verifyToken } from "../../utils/verifyAdmin.js";

const router = express.Router();

router.post("/signup", createAdmin);

router.post("/signin", signIn);

router.get("/users", verifyToken, getAllUsers);

router.put("/users/:userId/:action", verifyToken, blockOrUnblockUser);

export default router;
