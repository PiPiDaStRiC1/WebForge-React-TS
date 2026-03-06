import type {
    UserData,
    OrderWithResponsesCount,
    Client,
    Response,
    FreelancerWithoutCompletedOrders,
    Freelancer,
    Message,
    Favorite,
} from "./index";

export type StoredUsers = Record<string, UserData>;

export interface AuthData {
    isLoggedIn: boolean;
    currentUserId: number | null;
    token: string | null;
}

export interface AllUserData {
    usersById: Record<string, UserData>;
    allIds: number[];
}

export interface OrdersData {
    ordersById: Record<string, OrderWithResponsesCount>;
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
    responsesById: Record<string, Response>;
    allIds: number[];
}

export interface AllUserLSData {
    messages: Record<string, Message[]>;
    favorites: Record<string, Favorite>;
    createdOrders: Record<string, OrderWithResponsesCount>;
}
