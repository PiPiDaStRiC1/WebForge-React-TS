import type { Request, Response } from "express";

export const getAllMessages = (req: Request<{ currentUserId: string }>, res: Response) => {
    const currentUserId = req.params["currentUserId"];
};
