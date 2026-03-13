import type {
    OrdersData,
    OrderWithResponsesCount,
    ResponsesData,
    Response,
    FreelancersData,
    Freelancer,
    ClientsData,
    Client,
} from "./index";

export type AuthResult = { token: string; user: Freelancer | Client };

export type ApiSuccess<T> = { success: true; data: T };

export type ApiError = { success: false; data: string };

export type ApiResponse<T> = ApiSuccess<T> | ApiError;

export type OrdersResponse = ApiResponse<OrdersData>;

export type LastOrdersResponse = ApiResponse<OrderWithResponsesCount[]>;

export type OrderResponse = ApiResponse<OrderWithResponsesCount>;

export type ResponsesResponse = ApiResponse<ResponsesData>;

export type OrderResponsesResponse = ApiResponse<Response[]>;

export type FreelancersResponse = ApiResponse<FreelancersData>;

export type FreelancerResponse = ApiResponse<Freelancer>;

export type ClientsResponse = ApiResponse<ClientsData>;

export type ClientResponse = ApiResponse<Client>;

export type UserResponse = ApiResponse<Freelancer | Client>;

export type AuthResponse = ApiResponse<AuthResult>;
