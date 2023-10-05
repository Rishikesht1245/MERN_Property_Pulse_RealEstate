import express from "express";
import { test, updateUser } from "../../controllers/user/user.controller.js";
import { verifyToken } from "../../utils/verifyUser.js";

const router = express.Router();

router.get("/test", test);

//protected routes --- verify token
router.post("/update/:id", verifyToken, updateUser);

export default router;
