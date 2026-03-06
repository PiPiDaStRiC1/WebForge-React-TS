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

export type ApiSuccess<T> = { status: true; data: T };

export type ApiError = { status: false; data: string };

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
