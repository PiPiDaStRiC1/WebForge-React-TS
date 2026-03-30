import express from "express";
import morgan from "morgan";
import cors from "cors";
import {
    clientsRouter,
    freelancersRouter,
    ordersRouter,
    responsesRouter,
    authRouter,
    likesRouter,
    chatsRouter,
    likeOrdersRouter,
} from "@/routes/index.ts";

const app = express();
const PORT = process.env["PORT"];
const origin =
    process.env["NODE_ENV"] === "production" ? process.env["CORS_ORIGIN"] : "http://localhost:5173";

app.use(morgan("tiny"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: origin }));

app.use("/api/clients", clientsRouter);
app.use("/api/freelancers", freelancersRouter);
app.use("/api/orders", ordersRouter);
app.use("/api/responses", responsesRouter);
app.use("/api/likes", likesRouter);
app.use("/api/auth", authRouter);
app.use("/api/chats", chatsRouter);
app.use("/api/like-orders", likeOrdersRouter);

app.listen(Number(PORT), "0.0.0.0", () => {
    console.log(`Listening server on port: ${PORT}`);
});
