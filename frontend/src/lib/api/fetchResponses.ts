import { getAllResponses } from "@/lib/storage/dataStore";
import type { OrderResponse } from "@/types";

export const fetchResponses = async (orderId: number): Promise<OrderResponse[]> => {
    await new Promise((resolve) => {
        setTimeout(() => resolve(true), 300);
    });

    const { responsesById, allIds } = getAllResponses();

    return allIds
        .map((responseId) => responsesById[responseId])
        .filter((response) => response.orderId === orderId);
};
