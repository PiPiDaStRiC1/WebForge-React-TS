import { Router } from "express";
import { registerUser, loginUser, autoLogin } from "@/services/auth";

const authRouter = Router();

authRouter.post("/login", loginUser);
authRouter.post("/register", registerUser);
authRouter.get("/me", autoLogin);

export { authRouter };
