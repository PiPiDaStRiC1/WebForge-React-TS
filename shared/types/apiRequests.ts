export interface AuthUserPayload {
    userId: string;
}

export interface RegisterRequest {
    name: string;
    lastName: string;
    email: string;
    password: string;
    role: "freelancer" | "client";
}

export interface LoginRequest {
    email: string;
    password: string;
}
