import { allOrders } from '@/lib/data/orders';
import type { Order } from '@/types';

export const fetchLastOrders = async (limit: number = 3): Promise<Order[]> => {
    await new Promise((resolve) => {
        setTimeout(() => resolve(true), 300);
    });
    return allOrders
            .filter(order => order.status === 'new')
            .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
            .slice(0, limit);
}