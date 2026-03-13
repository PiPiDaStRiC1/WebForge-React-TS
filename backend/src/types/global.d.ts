import type { JWTPayload } from "./api";

declare global {
    namespace Express {
        interface Request {
            user?: JWTPayload;
        }
    }
}

export {};
