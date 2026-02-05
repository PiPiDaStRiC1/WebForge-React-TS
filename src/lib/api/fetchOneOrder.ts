import { getAllOrders } from '@/lib/storage/dataStore';
import type {Order} from '@/types';

export const fetchOneOrder = async (orderId: number): Promise<Order | undefined> => {
    await new Promise((resolve) => {
        setTimeout(() => resolve(true), 300)
    });

    const {ordersById, allIds} = getAllOrders();

    return allIds.map(orderId => ordersById[orderId]).find(order => order.id === orderId);
}