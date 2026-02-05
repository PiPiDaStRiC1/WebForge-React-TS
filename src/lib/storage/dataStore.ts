import { ordersById, allIds } from '@/lib/data/orders.json';
import { freelancersById, clientsById } from '@/lib/data/users.json';
import { responsesById } from '@/lib/data/orderResponses.json';
import { isClient, isFreelancer, isOrder, isResponse } from '@/types/typeguards';
import type { Order, Client, FreelancerWithoutCompletedOrders, OrderResponse, OrdersData, ClientsData, FreelancersDataWithoutOrders, ResponsesData } from '@/types';

const basedOrders: Record<string, Order> = Object.fromEntries((Object.values(ordersById) as Array<unknown>).filter(isOrder).map(order => [order.id, order]));
const basedFreelancers: Record<string, FreelancerWithoutCompletedOrders> = Object.fromEntries((Object.values(freelancersById) as Array<unknown>).filter(isFreelancer).map(user => [user.id, user]));
const basedClients: Record<string, Client> = Object.fromEntries((Object.values(clientsById) as Array<unknown>).filter(isClient).map(user => [user.id, user]));
const basedResponses: Record<string, OrderResponse> = Object.fromEntries((Object.values(responsesById) as Array<unknown>).filter(isResponse).map(response => [response.id, response]));

export const getAllOrders = (): OrdersData => {
    const raw = localStorage.getItem('custom-orders');
    const customOrders: Record<string, Order> = raw ? JSON.parse(raw) : {};
    const actualIds = Array.from(new Set([...allIds, ...Object.keys(customOrders)]));
    return { ordersById: { ...basedOrders, ...customOrders }, allIds: actualIds } as OrdersData;
}

export const getAllFreelancers = (): FreelancersDataWithoutOrders => {
    const raw = localStorage.getItem('users');
    const customUsers: Record<string, FreelancerWithoutCompletedOrders | Client> = raw ? JSON.parse(raw) : {};
    const customFreelancers = Object.fromEntries(
        // eslint-disable-next-line
        Object.entries(customUsers).filter(([_, user]) => isFreelancer(user))
    ) as Record<string, FreelancerWithoutCompletedOrders>;

    const mergedFreelancers = { ...basedFreelancers, ...customFreelancers };
    const actualIds = Object.keys(mergedFreelancers).map(Number);
    return { freelancersById: mergedFreelancers, allIds: actualIds };
}

export const getAllClients = (): ClientsData => {
    const raw = localStorage.getItem('users');
    const customUsers: Record<string, Client> = raw ? JSON.parse(raw) : {};
    const actualIds = Array.from(new Set([...allIds, ...Object.keys(customUsers)]));
    return { clientsById: { ...basedClients, ...customUsers }, allIds: actualIds } as ClientsData;
}

export const getAllResponses = (): ResponsesData => {
    const raw = localStorage.getItem('custom-responses');
    const customUsers: Record<string, OrderResponse> = raw ? JSON.parse(raw) : {};
    const actualIds = Array.from(new Set([...allIds, ...Object.keys(customUsers)]));
    return { responsesById: { ...basedResponses, ...customUsers }, allIds: actualIds } as ResponsesData;
}