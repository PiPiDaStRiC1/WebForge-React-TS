export interface BaseUser {
    gender: "male" | "female";
    email: string;
    login: string;
    phone: string;
    picture: { large: string; medium: string; thumbnail: string } | null;
    id: number;
    name: string;
    lastName: string;
    rating: number;
    bio: string;
    location: string;
    status: "verified" | "unverified" | "free" | "busy";
    statusChat: "offline" | "online";
    registeredAt: string;
}

export interface Freelancer extends BaseUser {
    role: "freelancer";
    rating: number;
    completedOrders: number;
    skills: string[];
    pricePerHour: number;
    experience: number;
    category: "web-dev" | "design" | "marketing" | "mobile" | "seo" | "data";
    earning: number;
}

export type FreelancerWithoutCompletedOrders = Omit<Freelancer, "completedOrders">;

export interface Client extends BaseUser {
    role: "client";
    rating: number;
    spending: number;
}
