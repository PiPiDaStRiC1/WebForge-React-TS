import { Router } from "express";
import { registerUser, loginUser, autoLogin, deleteUser } from "@/services/auth";
import { verifyJWT } from "@/middleware";

const authRouter = Router();

authRouter
    .post("/login", loginUser)
    .post("/register", registerUser)
    .get("/me", autoLogin)
    .delete("/delete", verifyJWT, deleteUser);

export { authRouter };
