import { Router } from "express";
import {
    getAllMessages,
    getMessagesByCollId,
    postMessageByCollId,
    deleteMessagesByCollId,
    getAllCollocutors,
} from "@/services/chats";
import { verifyJWT } from "@/middleware";

const chatsRouter = Router();

chatsRouter
    .get("/me", verifyJWT, getAllMessages)
    .get("/colls", verifyJWT, getAllCollocutors)
    .get("/by-coll/:collId/messages", verifyJWT, getMessagesByCollId)
    .post("/by-coll/:collId/messages", verifyJWT, postMessageByCollId)
    .delete("/by-coll/:collId/messages", verifyJWT, deleteMessagesByCollId);

export { chatsRouter };
