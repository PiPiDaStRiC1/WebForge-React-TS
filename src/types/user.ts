export interface Freelancer {
    gender: 'male' | 'female',
    email: string,
    login: string,
    phone: string,
    picture: {
        large: string,
        medium: string,
        thumbnail: string
    },
    id: number,
    name: string,
    role: 'freelancer',
    rating: number,
    completedOrders: number,
    skills: string[],
    pricePerHour: number,
    bio: string,
    location: string,
    experience: number,
    status: 'verified' | 'free' | 'busy' | 'online',
    registeredAt: string,
}

export interface Client {
    gender: 'male' | 'female',
    email: string,
    login: string,
    phone: string,
    picture: {
        large: string,
        medium: string,
        thumbnail: string
    },
    id: number,
    name: string,
    role: 'client',
    rating: number,
    completedOrders: null,
    skills: null,
    pricePerHour: null,
    bio: string,
    location: string,
    experience: null,
    status: 'verified' | 'busy' | 'online',
    registeredAt: string
}