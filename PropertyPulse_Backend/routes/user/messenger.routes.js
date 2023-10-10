import express from "express";
import { verifyToken } from "../../utils/verifyUser.js";
import {
  createConversation,
  getConversations,
} from "../../controllers/user/messenger.controller.js";

const router = express.Router();

// new conversation
router.post("/create", verifyToken, createConversation);

// get conversation of user
router.get("/:userId", verifyToken, getConversations);

export default router;
