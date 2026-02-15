import { getAllResponses, getAllOrders } from "@/lib/storage/dataStore";
import type { OrdersData } from "@/types";

export const fetchAllOrders = async (): Promise<OrdersData> => {
    await new Promise<boolean>((resolve) => {
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

    return {
        ordersById: Object.fromEntries(ordersWithResponsesCount.map((order) => [order.id, order])),
        allIds,
    };
};
