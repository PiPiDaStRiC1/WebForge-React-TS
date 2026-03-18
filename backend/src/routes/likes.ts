import { Router } from "express";
import { getAllLikes, postOneLike, deleteOneLike } from "@/services/likes";
import { verifyJWT } from "@/middleware";

const likesRouter = Router();

likesRouter
    .get("/me", verifyJWT, getAllLikes)
    .post("/", verifyJWT, postOneLike)
    .delete("/:likedUserId", verifyJWT, deleteOneLike);

export { likesRouter };
