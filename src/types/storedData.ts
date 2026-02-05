import type { UserData, Order, Client, OrderResponse, FreelancerWithoutCompletedOrders, Freelancer } from '@/types';

export type StoredUsers = Record<string, UserData>;

export interface AuthData {
    isLoggedIn: boolean;
    userId: number | null;
    token?: string;
}

export interface OrdersData {
    ordersById: Record<string, Order>;
    allIds: number[];
}

export interface ClientsData {
    clientsById: Record<string, Client>;
    allIds: number[];
}

export interface FreelancersDataWithoutOrders {
    freelancersById: Record<string, FreelancerWithoutCompletedOrders>;
    allIds: number[];
}

export interface FreelancersData {
    freelancersById: Record<string, Freelancer>;
    allIds: number[];
}

export interface ResponsesData {
    responsesById: Record<string, OrderResponse>;
    allIds: number[];
}