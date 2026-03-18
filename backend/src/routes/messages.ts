import { Router } from "express";
import { getAllMessages } from "@/services/messages";

const messagesRouter = Router();

messagesRouter.get("/", getAllMessages);

export { messagesRouter };
