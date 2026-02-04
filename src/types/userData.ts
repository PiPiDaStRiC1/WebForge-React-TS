export interface BaseUserData {
    name: string;
    lastName: string;
    email: string;
    password: string;
    createdAt: string;
    status: 'unverified' | 'verified';
    bio: string;
    location: string;
    website: string;
}

export interface FreelancerData extends BaseUserData {
    role: 'freelancer';
    skills: string[];
    hourlyRate: number | null;
    rating: number;
    completedOrders: number;
    earning: number;
    experience: number;
}

export interface ClientData extends BaseUserData {
    role: 'client';
    placedOrders: number;
    spending: number;
}

export type UserData = FreelancerData | ClientData;