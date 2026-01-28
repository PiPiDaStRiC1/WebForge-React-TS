import {allOrders} from '@/lib/data/orders'
import type {Order} from '@/types';

export const fetchOneOrder = async (orderId: number): Promise<Order | undefined> => {
    await new Promise((resolve) => {
        setTimeout(() => resolve(true), 300)
    });

    return allOrders.find(order => order.id === orderId);
}