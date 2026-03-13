import jwt from "jsonwebtoken";

interface CreateAccessTokenParams {
    userId: number;
    role: "freelancer" | "client";
}

export const createAccessToken = ({ userId, role }: CreateAccessTokenParams) => {
    try {
        const SECRET_KEY = process.env["SECRET_KEY"];

        if (!SECRET_KEY) {
            throw new Error("SECRET_KEY is not defined in env");
        }

        const token = jwt.sign({ userId, role }, SECRET_KEY, { expiresIn: "7d" });

        return token;
    } catch (error) {
        console.error("JWT signing failed:", error);
        throw new Error("Internal Server Error");
    }
};
