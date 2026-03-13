import jwt from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";
import type { JWTPayload } from "@/types";
import type { ApiResponse } from "@shared/types";

export const verifyJWT = (req: Request, res: Response<ApiResponse<string>>, next: NextFunction) => {
    try {
        const token = req.headers["authorization"]?.split(" ")[1];

        if (!token) {
            throw new Error("Unauthorized");
        }

        const SECRET_KEY = process.env["SECRET_KEY"]!;

        const payload = jwt.verify(token, SECRET_KEY) as JWTPayload;

        req.user = payload;

        next();
    } catch (error) {
        console.error("JWT verification failed:", error);
        res.status(401).json({ success: false, data: "Unauthorized" });
    }
};
