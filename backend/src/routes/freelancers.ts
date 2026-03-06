import { Router } from "express";
import { getAllFreelancers, getOneFreelancer } from "@/services/freelancers";

const freelancersRouter = Router();

freelancersRouter.get("/", getAllFreelancers).get("/:freelancerId", getOneFreelancer);

export { freelancersRouter };
