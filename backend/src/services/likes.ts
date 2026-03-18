import { prisma } from "@/helpers";
import type { Request, Response } from "express";
import type { Favorite, ApiResponse, FavoritesData } from "@shared/types";

export const getAllLikes = async (
    req: Request<{ currentUserId: string }, {}, {}, {}>,
    res: Response<ApiResponse<FavoritesData>>,
) => {
    try {
        const currentUserId = Number(req.params["currentUserId"]);

        const likes = await prisma.favorite.findMany({ where: { clientId: currentUserId } });

        const favoritesData: FavoritesData = likes.reduce((acc, like) => {
            acc[like.likedUserId.toString()] = like;
            return acc;
        }, {} as FavoritesData);

        res.status(200).json({ success: true, data: favoritesData });
    } catch (error) {
        res.status(500).json({ success: false, data: "Internal Server Error" });
    }
};

export const postOneLike = async (
    req: Request<{}, {}, Favorite, {}>,
    res: Response<ApiResponse<Favorite>>,
) => {
    try {
        const { likedUserId } = req.body;

        const { userId } = req.user!;

        const favorite = await prisma.favorite.create({ data: { likedUserId, clientId: userId } });

        res.status(200).json({ success: true, data: favorite });
    } catch (error) {
        res.status(500).json({ success: false, data: "Internal Server Error" });
    }
};

export const deleteOneLike = async (
    req: Request<{ likedUserId: string }, {}, {}>,
    res: Response<ApiResponse<string>>,
) => {
    try {
        const likedUserId = Number(req.params["likedUserId"]);

        const { userId } = req.user!;

        await prisma.favorite.deleteMany({ where: { likedUserId, clientId: userId } });

        res.status(200).json({ success: true, data: "Like deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, data: "Internal Server Error" });
    }
};
