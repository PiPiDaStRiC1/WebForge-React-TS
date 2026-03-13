import type { Request, Response } from "express";
import { prisma } from "@/helpers/prisma";
import type {
    OrdersResponse,
    OrderResponse,
    LastOrdersResponse,
    ApiResponse,
    OrderFormData,
} from "@shared/types";

export const getAllOrders = async (_req: Request, res: Response<OrdersResponse>) => {
    try {
        const orders = await prisma.order.findMany({
            include: {
                client: { select: { userId: true } },
                freelancer: { select: { userId: true } },
                _count: { select: { orderResponses: true } },
                skills: true,
            },
        });

        const flatOrdersById = Object.fromEntries(
            orders.map((order) => {
                const { client, freelancer, _count, skills, ...rest } = order;
                return [
                    order.id,
                    {
                        ...rest,
                        status: rest.status as "new" | "in-progress" | "completed",
                        createdAt: rest.createdAt.toISOString(),
                        clientId: client.userId,
                        completedById: freelancer ? freelancer.userId : null,
                        responsesCount: _count.orderResponses,
                        skills: skills.map((skill) => skill.name),
                    },
                ];
            }),
        );

        const allIds = orders.map((order) => order.id);

        res.status(200).json({ success: true, data: { ordersById: flatOrdersById, allIds } });
    } catch (error) {
        res.status(500).json({ success: false, data: "Internal Server Error" });
    }
};

export const postOneOrder = async (
    req: Request<{}, {}, OrderFormData, {}>,
    res: Response<ApiResponse<string>>,
) => {
    const { title, description, category, budgetMin, budgetMax, deadlineDays, skills } = req.body;

    const { userId } = (req as Request & { user: { userId: number; role: string } }).user;

    try {
        await prisma.order.create({
            data: {
                title,
                description,
                category,
                budgetMin,
                budgetMax,
                deadlineDays,
                skills: { create: skills.map((name) => ({ name })) },
                status: "new",
                createdAt: new Date().toISOString(),
                completedById: null,
                clientId: userId,
            },
        });

        res.status(201).json({ success: true, data: "Order created" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, data: "Failed to create order" });
    }
};

export const getLastOrders = async (
    req: Request<{}, {}, {}, { limit?: string }>,
    res: Response<LastOrdersResponse>,
) => {
    const limit = req.query.limit ? parseInt(req.query.limit, 10) : 3;

    try {
        const orders = await prisma.order.findMany({
            include: {
                client: { select: { userId: true } },
                freelancer: { select: { userId: true } },
                _count: { select: { orderResponses: true } },
                skills: true,
            },
            take: limit,
            orderBy: { createdAt: "desc" },
        });

        const flatOrders = orders.map((order) => {
            const { client, freelancer, _count, skills, ...rest } = order;
            return {
                ...rest,
                status: rest.status as "new" | "in-progress" | "completed",
                createdAt: rest.createdAt.toISOString(),
                clientId: client.userId,
                completedById: freelancer?.userId ?? null,
                responsesCount: _count.orderResponses,
                skills: skills.map((skill) => skill.name),
            };
        });

        res.status(200).json({ success: true, data: flatOrders });
    } catch (error) {
        res.status(500).json({ success: false, data: "Internal Server Error" });
    }
};

export const getOneOrder = async (
    req: Request<{ orderId: string }>,
    res: Response<OrderResponse>,
) => {
    const orderId = req.params["orderId"];

    try {
        const order = await prisma.order.findFirstOrThrow({
            where: { id: Number(orderId) },
            include: {
                client: { select: { userId: true } },
                freelancer: { select: { userId: true } },
                _count: { select: { orderResponses: true } },
                skills: true,
            },
        });

        const { client, freelancer, _count, skills, ...rest } = order;

        const flatOrder = {
            ...rest,
            status: rest.status as "new" | "in-progress" | "completed",
            createdAt: rest.createdAt.toISOString(),
            clientId: client.userId,
            completedById: freelancer?.userId ?? null,
            responsesCount: _count.orderResponses,
            skills: skills.map((skill) => skill.name),
        };

        res.status(200).json({ success: true, data: flatOrder });
    } catch (error) {
        res.status(404).json({ success: false, data: "Order not found" });
    }
};
