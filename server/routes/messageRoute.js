import express from "express";
import {
  getMessages,
  getUserForSidebar,
  markMessagesAsSeen,
  sendMessage,
} from "../controllers/messageController.js";
import { protect } from "../moddleware/auth.js";

const messageRouter = express.Router();

messageRouter.get("/users", protect, getUserForSidebar);
messageRouter.get("/:id", protect, getMessages);
messageRouter.put("/mark/:id", protect, markMessagesAsSeen);
messageRouter.post("/send/:id", protect, sendMessage);

export default messageRouter;
