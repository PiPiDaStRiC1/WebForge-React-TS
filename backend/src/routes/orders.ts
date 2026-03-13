import { Router } from "express";
import { getAllOrders, getOneOrder, getLastOrders, postOneOrder } from "@/services/orders";
import { verifyJWT } from "@/middleware";

const ordersRouter = Router();

ordersRouter
    .get("/", getAllOrders)
    .post("/", verifyJWT, postOneOrder)
    .get("/last", getLastOrders)
    .get<{ orderId: string }>("/:orderId", verifyJWT, getOneOrder);

export { ordersRouter };
