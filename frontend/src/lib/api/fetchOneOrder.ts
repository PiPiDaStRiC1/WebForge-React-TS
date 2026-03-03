import { getAllOrders, getAllResponses } from "@/lib/storage/dataStore";
import type { Order } from "@/types";

export const fetchOneOrder = async (orderId: number): Promise<Order | undefined> => {
    await new Promise((resolve) => {
        setTimeout(() => resolve(true), 300);
    });

    const { ordersById, allIds } = getAllOrders();
    const { responsesById } = getAllResponses();

    const ordersWithResponsesCount = allIds.map((orderId) => {
        const order = ordersById[orderId];
        const responsesCount = Object.values(responsesById).filter(
            (response) => response.orderId === order.id,
        ).length;

        return { ...order, responsesCount: responsesCount };
    });

    return ordersWithResponsesCount.find((order) => order.id === orderId);
};
