import {orderResponses} from '@/lib/data/orderResponses.json'
import type {OrderResponse} from '@/types'

export const fetchAllResponses = async (): Promise<Array<OrderResponse>> => {
    await new Promise((resolve) => {
        setTimeout(() => resolve(true), 300);
    });

    return orderResponses
}