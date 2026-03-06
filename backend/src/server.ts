import express from "express";
import morgan from "morgan";
import cors from "cors";
import { clientsRouter, freelancersRouter, ordersRouter, responsesRouter } from "@/routes/index.ts";

const app = express();
const PORT = 5000;

app.use(morgan("tiny"));
app.use(cors());

app.use("/api/clients", clientsRouter);
app.use("/api/freelancers", freelancersRouter);
app.use("/api/orders", ordersRouter);
app.use("/api/responses", responsesRouter);

app.listen(PORT, () => {
    console.log(`Listening server on port: ${PORT}`);
});
