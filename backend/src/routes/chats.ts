import { Router } from "express";
import { getAllMessages, getMessagesByChatId, postMessageByChatId } from "@/services/chats";
import { verifyJWT } from "@/middleware";

const chatsRouter = Router();

chatsRouter
    .get("/me", verifyJWT, getAllMessages)
    .get("/:chatId/messages", verifyJWT, getMessagesByChatId)
    .post("/:chatId/messages", verifyJWT, postMessageByChatId);

export { chatsRouter };
