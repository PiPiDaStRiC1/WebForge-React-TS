import { Router } from "express";
import { getAllResponses, getOneOrderResponses } from "@/services/responses";

const responsesRouter = Router();

responsesRouter.get("/", getAllResponses).get("/:orderId", getOneOrderResponses);

export { responsesRouter };
