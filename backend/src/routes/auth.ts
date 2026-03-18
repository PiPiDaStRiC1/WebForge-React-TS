import { Router } from "express";
import { registerUser, loginUser, autoLogin, deleteUser } from "@/services/auth";

const authRouter = Router();

authRouter
    .post("/login", loginUser)
    .post("/register", registerUser)
    .get("/me", autoLogin)
    .delete("/delete/:currentUserId", deleteUser);

export { authRouter };
