import type {
    UserData,
    Order,
    Client,
    OrderResponse,
    FreelancerWithoutCompletedOrders,
    Freelancer,
    Message,
    Favorite,
} from "@/types";

export type StoredUsers = Record<string, UserData>;

export interface AuthData {
    isLoggedIn: boolean;
    currentUserId: number | null;
    token?: string;
}

export interface AllUserData {
    usersById: Record<string, UserData>;
    allIds: number[];
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

export interface AllUserLSData {
    messages: Record<string, Message[]>;
    favorites: Record<string, Favorite>;
    createdOrders: Record<string, Order>;
}
