import {orderResponses} from '@/lib/data/orderResponses.json'
import type {OrderResponse} from '@/types'

export const fetchResponses = async (orderId: number): Promise<Array<OrderResponse>> => {
    await new Promise((resolve) => {
        setTimeout(() => resolve(true), 300);
    });

    return orderResponses.filter(response => response.orderId === orderId);
}