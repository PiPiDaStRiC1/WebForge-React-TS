import {orderResponses} from './orderResponses.json';
import type {OrderResponse} from '@/types';

function isResponse(response: unknown): response is OrderResponse {
    return response !== null && typeof response === 'object' && 'freelancerId' in response;
}

export const allOrderResponses: Array<OrderResponse> = orderResponses.filter(isResponse);
