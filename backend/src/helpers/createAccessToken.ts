import jwt from "jsonwebtoken";
import type { JWTPayload } from "@/types";

export const createAccessToken = ({ userId, role }: JWTPayload) => {
    try {
        const SECRET_KEY = process.env["SECRET_KEY"];

        if (!SECRET_KEY) {
            throw new Error("SECRET_KEY is not defined in env");
        }

        const token = jwt.sign({ userId, role }, SECRET_KEY, { expiresIn: "5h" });

        return token;
    } catch (error) {
        console.error("JWT signing failed:", error);
        throw new Error("Internal Server Error");
    }
};
