import express from "express";
import {
  createListing,
  deleteListing,
  updateListing,
  getListing,
} from "../../controllers/user/listing.controller.js";
import { verifyToken } from "../../utils/verifyUser.js";
import { resourceLimits } from "worker_threads";

const router = express.Router();

router.post("/create", verifyToken, createListing);

// delete listing
router.delete("/delete/:id", verifyToken, deleteListing);

// get listing -- no need for verification as only reading is allowed
router.get("/update/:id", getListing);

// edit listing
router.post("/update/:id", verifyToken, updateListing);

export default router;
