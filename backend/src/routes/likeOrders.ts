import { Router } from "express";
import { verifyJWT } from "@/middleware";
import { getAllLikeOrders, postOneLikeOrder, deleteOneLikeOrder } from "@/services/likeOrders";

const likeOrdersRouter = Router();

likeOrdersRouter
    .get("/me", verifyJWT, getAllLikeOrders)
    .post("/", verifyJWT, postOneLikeOrder)
    .delete("/:likedOrderId", verifyJWT, deleteOneLikeOrder);

export { likeOrdersRouter };
