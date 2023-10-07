import express from "express";
import {
  createListing,
  deleteListing,
  updateListing,
  getListing,
  getListings,
} from "../../controllers/user/listing.controller.js";
import { verifyToken } from "../../utils/verifyUser.js";

const router = express.Router();

router.post("/create", verifyToken, createListing);

// delete listing
router.delete("/delete/:id", verifyToken, deleteListing);

// get listing -- no need for verification as only reading is allowed
router.get("/view/:id", getListing);

// edit listing
router.post("/update/:id", verifyToken, updateListing);

// search sort and filtering in one api route using query
router.get("/get", getListings);

export default router;
