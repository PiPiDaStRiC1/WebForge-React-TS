export interface Freelancer {
    gender: 'male' | 'female',
    email: string,
    login: string,
    password: string | null,
    phone: string,
    picture: {
        large: string,
        medium: string,
        thumbnail: string
    } | null,
    id: number,
    name: string,
    lastName: string,
    role: 'freelancer',
    rating: number,
    completedOrders: number,
    skills: string[],
    pricePerHour: number,
    bio: string,
    location: string,
    experience: number,
    status: 'verified' | 'unverified' | 'free' | 'busy' | 'online',
    category: 'web-dev' | 'design' | 'marketing' | 'mobile' | 'seo' | 'data',
    registeredAt: string,
    earning: number,
}

export type FreelancerWithoutCompletedOrders = Omit<Freelancer, 'completedOrders'>;

export interface Client {
    gender: 'male' | 'female',
    email: string,
    login: string,
    password: string | null,
    phone: string,
    picture: {
        large: string,
        medium: string,
        thumbnail: string
    } | null,
    id: number,
    name: string,
    lastName: string,
    role: 'client',
    rating: number,
    skills: null,
    pricePerHour: null,
    bio: string,
    location: string,
    experience: null,
    status: 'verified' | 'unverified' | 'busy' | 'online',
    category: null,
    registeredAt: string,
    spending: number,
    placedOrders: number,
}