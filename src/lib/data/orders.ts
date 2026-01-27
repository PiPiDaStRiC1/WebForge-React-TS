import {orders} from './orders.json'
import type {Order} from '@/types';

function isOrder(order: unknown): order is Order {
    if (order === null || typeof order !== 'object') return false;

    const obj = order as Record<string, unknown>;

    return (
        typeof obj.status === 'string' &&
        (
            obj.status === 'new' || 
            obj.status === 'in-progress' || 
            obj.status === 'completed'
        )
    )
}

export const allOrders: Array<Order> = (orders as unknown[]).filter(isOrder)