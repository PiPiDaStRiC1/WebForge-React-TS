import type { Request, Response as ExpressResponse } from "express";
import { prisma } from "@/helpers/prisma";
import type { OrderResponsesResponse, ResponsesResponse } from "@shared/types";
import type { ResponseRequest } from "@/types";

export const getAllResponses = async (_req: Request, res: ExpressResponse<ResponsesResponse>) => {
    try {
        const responses = await prisma.response.findMany({
            include: { freelancer: { select: { userId: true } }, order: { select: { id: true } } },
        });

        const flatResponsesById = Object.fromEntries(
            responses.map((response) => {
                const { freelancer, order, ...rest } = response;
                return [
                    response.id,
                    {
                        ...rest,
                        createdAt: rest.createdAt.toISOString(),
                        freelancerId: freelancer.userId,
                        orderId: order.id,
                    },
                ];
            }),
        );

        const allIds = responses.map((response) => response.id);

        res.status(200).json({ status: true, data: { responsesById: flatResponsesById, allIds } });
    } catch (error) {
        res.status(500).json({ status: false, data: "Internal Server Error" });
    }
};

export const getOneOrderResponses = async (
    req: Request<ResponseRequest>,
    res: ExpressResponse<OrderResponsesResponse>,
) => {
    const orderId = Number(req.params["orderId"]);

    try {
        const responses = await prisma.response.findMany({
            where: { orderId },
            include: { freelancer: { select: { userId: true } }, order: { select: { id: true } } },
        });

        const flatResponses = responses.map((response) => {
            const { freelancer, order, ...rest } = response;
            return {
                ...rest,
                createdAt: rest.createdAt.toISOString(),
                freelancerId: freelancer.userId,
                orderId: order.id,
            };
        });

        res.status(200).json({ status: true, data: flatResponses });
    } catch (error) {
        res.status(404).json({ status: false, data: "Response not found" });
    }
};
