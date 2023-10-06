import express from "express";
import {
  deleteUser,
  getUserListings,
  test,
  updateUser,
} from "../../controllers/user/user.controller.js";
import { verifyToken } from "../../utils/verifyUser.js";

const router = express.Router();

router.get("/test", test);

//protected routes --- verify token
router.post("/update/:id", verifyToken, updateUser);

router.delete("/delete/:id", verifyToken, deleteUser);

// get all user listings , : id is users _id
router.get("/listings/:id", verifyToken, getUserListings);

export default router;
