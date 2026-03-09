export interface Freelancer {
    gender: "male" | "female";
    email: string;
    login: string;
    password: string | null;
    phone: string;
    picture: { large: string; medium: string; thumbnail: string } | null;
    id: number;
    name: string;
    lastName: string;
    role: "freelancer";
    rating: number;
    completedOrders: number;
    skills: string[];
    pricePerHour: number;
    bio: string | null;
    location: string;
    experience: number;
    status: "verified" | "unverified" | "free" | "busy";
    statusChat: "offline" | "online";
    category: "web-dev" | "design" | "marketing" | "mobile" | "seo" | "data";
    registeredAt: string;
    earning: number;
}

export type FreelancerWithoutCompletedOrders = Omit<Freelancer, "completedOrders">;

export interface Client {
    gender: "male" | "female";
    email: string;
    login: string;
    password: string | null;
    phone: string;
    picture: { large: string; medium: string; thumbnail: string } | null;
    id: number;
    name: string;
    lastName: string;
    role: "client";
    rating: number;
    bio: string | null;
    location: string;
    status: "verified" | "unverified" | "busy";
    statusChat: "offline" | "online";
    registeredAt: string;
    spending: number;
}
