import { Router } from "express";
import { getAllClients, getOneClient } from "@/services/clients";

const clientsRouter = Router();

clientsRouter.get("/", getAllClients).get("/:clientId", getOneClient);

export { clientsRouter };
