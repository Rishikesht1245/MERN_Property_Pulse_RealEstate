import express from "express";
import { signup, singIn } from "../../controllers/user/auth.controller.js";

const router = express.Router();

router.post("/signup", signup);

router.post("/signin", singIn);

export default router;
