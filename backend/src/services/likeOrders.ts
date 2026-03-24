import { prisma } from "@/helpers";
import { Prisma } from "@prisma/client";
import type { Request, Response } from "express";
import type { FavoriteOrder, ApiResponse, FavoriteOrdersData } from "@shared/types";

export const getAllLikeOrders = async (
    req: Request,
    res: Response<ApiResponse<FavoriteOrdersData>>,
) => {
    try {
        const { userId } = req.user!;

        const likes = await prisma.favoriteOrder.findMany({ where: { freelancerId: userId } });

        const favoritesData: FavoriteOrdersData = likes.reduce((acc, like) => {
            acc[like.likedOrderId.toString()] = like;
            return acc;
        }, {} as FavoriteOrdersData);

        res.status(200).json({ success: true, data: favoritesData });
    } catch (error) {
        res.status(500).json({ success: false, data: "Internal Server Error" });
    }
};

export const postOneLikeOrder = async (
    req: Request<{}, {}, FavoriteOrder, {}>,
    res: Response<ApiResponse<FavoriteOrder>>,
) => {
    try {
        const { likedOrderId } = req.body;

        const { userId } = req.user!;

        const favorite = await prisma.favoriteOrder.create({
            data: { likedOrderId, freelancerId: userId },
        });

        return res.status(200).json({ success: true, data: favorite });
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
            return res.status(409).json({ success: false, data: "Like is already existed" });
        }
        return res.status(500).json({ success: false, data: "Internal Server Error" });
    }
};

export const deleteOneLikeOrder = async (
    req: Request<{ likedOrderId: string }, {}, {}>,
    res: Response<ApiResponse<string>>,
) => {
    try {
        const likedOrderId = Number(req.params["likedOrderId"]);

        const { userId } = req.user!;

        await prisma.favoriteOrder.deleteMany({ where: { likedOrderId, freelancerId: userId } });

        res.status(200).json({ success: true, data: "Like deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, data: "Internal Server Error" });
    }
};
