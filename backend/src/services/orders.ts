import { ordersById, allIds as allOrderIds } from "@/data/orders.json";
import { responsesById } from "@/data/orderResponses.json";
import { getIdOrThrow } from "@/helpers";
import { isOrder } from "@shared/types/typeguards";
import type { Request, Response } from "express";
import type {
    Order,
    OrderWithResponsesCount,
    OrdersResponse,
    OrderResponse,
    LastOrdersResponse,
} from "@shared/types/index";
import type { OrderRequest } from "@/types";

const basedOrders: Record<string, Order> = Object.fromEntries(
    (Object.values(ordersById) as Array<unknown>).filter(isOrder).map((order) => [order.id, order]),
);

const buildOrdersWithResponsesCount = (ids: number[]): Record<string, OrderWithResponsesCount> =>
    Object.fromEntries(
        ids.map((orderId) => {
            const order = getIdOrThrow(orderId, basedOrders);
            const responsesCount = Object.values(responsesById).filter(
                (response) => response.orderId === order.id,
            ).length;
            return [order.id, { ...order, responsesCount }];
        }),
    );

export const getAllOrders = (_req: Request, res: Response<OrdersResponse>) => {
    try {
        const ordersWithResponsesCount = buildOrdersWithResponsesCount(allOrderIds);
        res.status(200).json({
            status: true,
            data: { ordersById: ordersWithResponsesCount, allIds: allOrderIds },
        });
    } catch (error) {
        res.status(500).json({ status: false, data: "Internal Server Error" });
    }
};

export const getLastOrders = (
    req: Request<{}, {}, {}, { limit?: string }>,
    res: Response<LastOrdersResponse>,
) => {
    const limit = req.query.limit ? parseInt(req.query.limit, 10) : 3;

    try {
        const lastOrders = Object.values(buildOrdersWithResponsesCount(allOrderIds))
            .filter((order) => order.status === "new")
            .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
            .slice(0, limit);

        res.status(200).json({ status: true, data: lastOrders });
    } catch (error) {
        res.status(500).json({ status: false, data: "Internal Server Error" });
    }
};

export const getOneOrder = (req: Request<OrderRequest>, res: Response<OrderResponse>) => {
    const orderId = req.params["orderId"];

    try {
        const order = getIdOrThrow(orderId, basedOrders);
        const responsesCount = Object.values(responsesById).filter(
            (response) => response.orderId === order.id,
        ).length;
        const orderWithCount: OrderWithResponsesCount = { ...order, responsesCount };

        res.status(200).json({ status: true, data: orderWithCount });
    } catch (error) {
        res.status(404).json({ status: false, data: "Order not found" });
    }
};
