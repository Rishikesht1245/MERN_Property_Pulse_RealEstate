import express from "express";
import {
  createAdmin,
  getAllUsers,
  blockOrUnblockUser,
  signIn,
  getAllListings,
  blockOrUnblockListing,
} from "../../controllers/admin/admin.controller.js";
import { verifyToken } from "../../utils/verifyAdmin.js";

const router = express.Router();

router.post("/signup", createAdmin);

router.post("/signin", signIn);

router.get("/users", verifyToken, getAllUsers);

router.put("/users/:userId/:action", verifyToken, blockOrUnblockUser);

router.get("/listings", verifyToken, getAllListings);

router.put("/listings/:listingId/:action", verifyToken, blockOrUnblockListing);

export default router;
