import {allOrders} from '@/lib/data/orders';
import {allOrderResponses} from '@/lib/data/ordersResponses'
import type {Order} from '@/types'

export const fetchAllOrders = async (): Promise<Array<Order>> => {
    await new Promise<boolean>((resolve) => {
        setTimeout(() => resolve(true), 300);
    })

    const ordersWithResponsesCount = allOrders.map(order => {
        const responsesCount = allOrderResponses.filter(response => response.orderId === order.id).length;

        return {
            ...order,
            responsesCount: responsesCount
        }
    });
    
    return ordersWithResponsesCount
}