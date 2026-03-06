import { Router } from "express";
import { getAllOrders, getOneOrder, getLastOrders } from "@/services/orders";

const ordersRouter = Router();

ordersRouter.get("/", getAllOrders).get("/last", getLastOrders).get("/:orderId", getOneOrder);

export { ordersRouter };
