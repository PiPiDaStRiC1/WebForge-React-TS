import { Router } from "express";
import { getAllOrders, getOneOrder, getLastOrders, postOneOrder } from "@/services/orders";

const ordersRouter = Router();

ordersRouter
    .get("/", getAllOrders)
    .post("/", postOneOrder)
    .get("/last", getLastOrders)
    .get("/:orderId", getOneOrder);

export { ordersRouter };
