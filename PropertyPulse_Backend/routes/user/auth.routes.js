import express from "express";
import {
  google,
  signOut,
  signup,
  singIn,
} from "../../controllers/user/auth.controller.js";

const router = express.Router();

router.post("/signup", signup);

router.post("/signin", singIn);

router.post("/google", google);

router.get("/signout", signOut);

export default router;
