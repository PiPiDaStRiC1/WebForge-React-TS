import { prisma } from "@/helpers";
import type { Request, Response } from "express";
import type { ApiResponse, MessagesData, Message } from "@shared/types";

export const getAllMessages = async (req: Request, res: Response<ApiResponse<MessagesData>>) => {
    try {
        const { userId } = req.user!;

        const chats = await prisma.chat.findMany({
            where: { userId },
            select: { id: true, messages: true },
        });

        const data = Object.fromEntries(chats.map((chat) => [chat.id, chat.messages]));

        res.status(200).json({ success: true, data });
    } catch (error) {
        res.status(500).json({ success: false, data: "Internal server error" });
    }
};

export const getMessagesByChatId = async (
    req: Request<{ chatId: string }, {}, {}, {}>,
    res: Response<ApiResponse<MessagesData>>,
) => {
    try {
        const { userId } = req.user!;
        const chatId = Number(req.params["chatId"]);

        const chat = await prisma.chat.findFirst({
            where: { id: chatId, userId },
            select: { messages: true },
        });

        if (!chat) {
            return res.status(404).json({ success: false, data: "Chat not found" });
        }

        return res.status(200).json({ success: true, data: { [chatId]: chat.messages } });
    } catch (error) {
        return res.status(500).json({ success: false, data: "Internal server error" });
    }
};

export const postMessageByChatId = async (
    req: Request<{ chatId: string }, {}, Message, {}>,
    res: Response<ApiResponse<string>>,
) => {
    try {
        const { userId } = req.user!;
        const chatId = Number(req.params["chatId"]);

        const { text } = req.body;

        await prisma.message.create({ data: { senderId: userId, text, chatId } });

        return res.status(200).json({ success: true, data: "Post message" });
    } catch (error) {
        return res.status(500).json({ success: false, data: "Internal server error" });
    }
};
