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
    ApiResponse,
    AuthResponse,
} from "@shared/types/apiResponses";
import type { Favorite, FavoritesData } from "@shared/types";
import type { RegisterRequest, LoginRequest } from "@shared/types";
import type { OrderFormData } from "@/hooks";

const API_URL = import.meta.env["VITE_API_URL"] || "http://localhost:5000/api";

export const apiClient = {
    register: async (data: RegisterRequest) => {
        try {
            const response = await genericFetch<AuthResponse>(`${API_URL}/auth/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
            if (!response.success) {
                throw new Error(response.data);
            }

            return response.data;
        } catch (error) {
            console.error("Error registering user:", error);
            throw error;
        }
    },

    login: async (data: LoginRequest) => {
        try {
            const response = await genericFetch<AuthResponse>(`${API_URL}/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
            if (!response.success) {
                throw new Error(response.data);
            }

            return response.data;
        } catch (error) {
            console.error("Error logging in:", error);
            throw error;
        }
    },

    delete: async () => {
        try {
            const rawToken = localStorage.getItem("access-token");
            const token = rawToken ? JSON.parse(rawToken) : null;

            if (!token) {
                throw new Error("Unauthorized");
            }

            const response = await genericFetch<ApiResponse<string>>(`${API_URL}/auth/delete`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` },
            });
            if (!response.success) {
                throw new Error(response.data);
            }

            return response.data;
        } catch (error) {
            console.error("Error deleting user:", error);
            throw error;
        }
    },

    me: async (token: string) => {
        try {
            const response = await genericFetch<AuthResponse>(`${API_URL}/auth/me`, {
                method: "GET",
                headers: { Authorization: `Bearer ${token}` },
            });
            if (!response.success) {
                throw new Error(response.data);
            }

            return response.data;
        } catch (error) {
            console.error("Error loading current user:", error);
            throw error;
        }
    },

    getAllLikesMe: async () => {
        try {
            const rawToken = localStorage.getItem("access-token");
            const token = rawToken ? JSON.parse(rawToken) : null;

            if (!token) {
                throw new Error("Unauthorized");
            }

            const response = await genericFetch<ApiResponse<FavoritesData>>(`${API_URL}/likes/me`, {
                method: "GET",
                headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
            });

            if (!response.success) {
                throw new Error(response.data);
            }

            return response.data;
        } catch (error) {
            console.error("Error loading likes:", error);
            throw error;
        }
    },

    postSingleLike: async (data: Favorite) => {
        try {
            const rawToken = localStorage.getItem("access-token");
            const token = rawToken ? JSON.parse(rawToken) : null;

            if (!token) {
                throw new Error("Unauthorized");
            }

            const response = await genericFetch<ApiResponse<string>>(`${API_URL}/likes`, {
                method: "POST",
                headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
                body: JSON.stringify(data),
            });

            if (!response.success) {
                throw new Error(response.data);
            }

            return response.data;
        } catch (error) {
            console.error("Error posting like:", error);
            throw error;
        }
    },

    deleteSingleLike: async (likedUserId: number) => {
        try {
            const rawToken = localStorage.getItem("access-token");
            const token = rawToken ? JSON.parse(rawToken) : null;

            if (!token) {
                throw new Error("Unauthorized");
            }

            const response = await genericFetch<ApiResponse<string>>(
                `${API_URL}/likes/${likedUserId}`,
                { method: "DELETE", headers: { Authorization: `Bearer ${token}` } },
            );

            if (!response.success) {
                throw new Error(response.data);
            }

            return response.data;
        } catch (error) {
            console.error("Error deleting like:", error);
            throw error;
        }
    },

    getAllOrders: async () => {
        try {
            const response = await genericFetch<OrdersResponse>(`${API_URL}/orders`);
            if (!response.success) {
                throw new Error(response.data);
            }
            return response.data;
        } catch (error) {
            console.error("Error fetching orders:", error);
            throw error;
        }
    },

    postSingleOrder: async (data: OrderFormData, signal: AbortSignal) => {
        try {
            const rawToken = localStorage.getItem("access-token");
            const token = rawToken ? JSON.parse(rawToken) : null;

            if (!token) {
                throw new Error("Unauthorized");
            }

            const response = await genericFetch<ApiResponse<string>>(`${API_URL}/orders`, {
                method: "POST",
                headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
                body: JSON.stringify(data),
                signal,
            });

            if (!response.success) {
                throw new Error(response.data);
            }

            return response.data;
        } catch (error) {
            if (error instanceof DOMException && error.name !== "AbortError") {
                console.error("Error post order:", error);
            }
            throw error;
        }
    },

    getLastOrders: async (limit: number) => {
        try {
            const response = await genericFetch<LastOrdersResponse>(
                `${API_URL}/orders/last?limit=${limit}`,
            );
            if (!response.success) {
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
            const rawToken = localStorage.getItem("access-token");
            const token = rawToken ? JSON.parse(rawToken) : null;

            if (!token) {
                throw new Error("Unauthorized");
            }

            const response = await genericFetch<OrderResponse>(`${API_URL}/orders/${id}`, {
                method: "GET",
                headers: { Authorization: `Bearer ${token}` },
            });

            if (!response.success) {
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
            if (!response.success) {
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
            if (!response.success) {
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
            if (!response.success) {
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
            if (!response.success) {
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
            if (!response.success) {
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
            if (!response.success) {
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
            if (!response.success) {
                throw new Error(response.data);
            }
            return response.data;
        } catch {
            try {
                const response = await genericFetch<ClientResponse>(`${API_URL}/clients/${id}`);
                if (!response.success) {
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
