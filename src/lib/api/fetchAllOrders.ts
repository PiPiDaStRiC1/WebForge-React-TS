import {allOrders} from '@/lib/data/orders'
import type {Order} from '@/types'

export const fetchAllOrders = async (): Promise<Array<Order>> => {
    await new Promise<boolean>((resolve) => {
        setTimeout(() => resolve(true), 300);
    })

    return allOrders
}