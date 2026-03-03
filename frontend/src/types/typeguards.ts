import type { Order, Client, FreelancerWithoutCompletedOrders, OrderResponse } from '@/types'

export function isOrder(order: unknown): order is Order {
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

export function isClient(user: unknown): user is Client {
    return  user !== null && 
            typeof user === 'object' && 
            'role' in user && 
            user.role === 'client'
}

export function isFreelancer(user: unknown): user is FreelancerWithoutCompletedOrders {
    return  user !== null && 
            typeof user === 'object' && 
            'role' in user && 
            user.role === 'freelancer'
}

export function isResponse(response: unknown): response is OrderResponse {
    return response !== null && typeof response === 'object' && 'freelancerId' in response;
}