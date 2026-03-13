export interface ClientRequest {
    clientId: string;
}

export interface FreelancerRequest {
    freelancerId: string;
}

export interface OrderRequest {
    orderId: string;
    limit?: string;
}

export interface ResponseRequest {
    orderId: string;
}

export interface JWTPayload {
    userId: number;
    role: "freelancer" | "client";
}