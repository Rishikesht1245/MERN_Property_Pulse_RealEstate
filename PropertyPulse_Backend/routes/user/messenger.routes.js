import express from "express";
import { verifyToken } from "../../utils/verifyUser.js";
import {
  createConversation,
  getConversations,
  addMessage,
  getMessages,
} from "../../controllers/user/messenger.controller.js";

const router = express.Router();

// new conversation
router.post("/create", verifyToken, createConversation);

// get conversation of user
router.get("/:userId", verifyToken, getConversations);

// add message
router.post("/message", verifyToken, addMessage);

// get messages
router.get("/messages/:conversationId", verifyToken, getMessages);

export default router;
