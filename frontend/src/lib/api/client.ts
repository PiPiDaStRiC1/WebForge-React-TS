import { genericFetch } from "@/lib/utils";
import type {
    OrderResponse,
    LastOrdersResponse,
    ClientsResponse,
    ClientResponse,
    FreelancerResponse,
    FreelancersResponse,
    OrdersResponse,
    OrderResponsesResponse,
    ResponsesResponse,
    UserResponse,
} from "@shared/types/apiResponses";

const API_URL = import.meta.env["VITE_API_URL"] || "http://localhost:5000/api";

export const apiClient = {
    getAllOrders: async () => {
        try {
            const response = await genericFetch<OrdersResponse>(`${API_URL}/orders`);
            if (!response.status) {
                throw new Error(response.data);
            }
            return response.data;
        } catch (error) {
            console.error("Error fetching orders:", error);
            throw error;
        }
    },

    getLastOrders: async (limit: number) => {
        try {
            const response = await genericFetch<LastOrdersResponse>(
                `${API_URL}/orders/last?limit=${limit}`,
            );
            if (!response.status) {
                throw new Error(response.data);
            }
            return response.data;
        } catch (error) {
            console.error("Error fetching orders:", error);
            throw error;
        }
    },

    getSingleOrder: async (id: string) => {
        try {
            const response = await genericFetch<OrderResponse>(`${API_URL}/orders/${id}`);
            if (!response.status) {
                throw new Error(response.data);
            }
            return response.data;
        } catch (error) {
            console.error("Error fetching order:", error);
            throw error;
        }
    },

    getAllClients: async () => {
        try {
            const response = await genericFetch<ClientsResponse>(`${API_URL}/clients`);
            if (!response.status) {
                throw new Error(response.data);
            }
            return response.data;
        } catch (error) {
            console.error("Error fetching clients:", error);
            throw error;
        }
    },

    getSingleClient: async (id: string) => {
        try {
            const response = await genericFetch<ClientResponse>(`${API_URL}/clients/${id}`);
            if (!response.status) {
                throw new Error(response.data);
            }
            return response.data;
        } catch (error) {
            console.error("Error fetching client:", error);
            throw error;
        }
    },

    getAllFreelancers: async () => {
        try {
            const response = await genericFetch<FreelancersResponse>(`${API_URL}/freelancers`);
            if (!response.status) {
                throw new Error(response.data);
            }
            return response.data;
        } catch (error) {
            console.error("Error fetching freelancers:", error);
            throw error;
        }
    },

    getSingleFreelancer: async (id: string) => {
        try {
            const response = await genericFetch<FreelancerResponse>(`${API_URL}/freelancers/${id}`);
            if (!response.status) {
                throw new Error(response.data);
            }
            return response.data;
        } catch (error) {
            console.error("Error fetching freelancers:", error);
            throw error;
        }
    },

    getAllResponses: async () => {
        try {
            const response = await genericFetch<ResponsesResponse>(`${API_URL}/responses`);
            if (!response.status) {
                throw new Error(response.data);
            }
            return response.data;
        } catch (error) {
            console.error("Error fetching responses:", error);
            throw error;
        }
    },

    getSingleOrderResponses: async (id: string) => {
        try {
            const response = await genericFetch<OrderResponsesResponse>(
                `${API_URL}/responses/${id}`,
            );
            if (!response.status) {
                throw new Error(response.data);
            }
            return response.data;
        } catch (error) {
            console.error("Error fetching response:", error);
            throw error;
        }
    },

    getSingleUser: async (id: string | number) => {
        try {
            const response = await genericFetch<FreelancerResponse>(`${API_URL}/freelancers/${id}`);
            if (!response.status) {
                throw new Error(response.data);
            }
            return response.data;
        } catch {
            try {
                const response = await genericFetch<ClientResponse>(`${API_URL}/clients/${id}`);
                if (!response.status) {
                    throw new Error(response.data);
                }
                return response.data;
            } catch (error) {
                console.error("Error fetching user:", error);
                throw error;
            }
        }
    },
};
