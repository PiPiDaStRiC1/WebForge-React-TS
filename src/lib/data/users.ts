import type {Client, Freelancer} from '@/types';
import usersData from './users.json';

function isClient(user: unknown): user is Client {
    return  user !== null && 
            typeof user === 'object' && 
            'role' in user && 
            user.role === 'client'
}

function isFreelancer(user: unknown): user is Freelancer {
    return  user !== null && 
            typeof user === 'object' && 
            'role' in user && 
            user.role === 'freelancer'
}

export const clients = usersData.clients.filter(isClient);
export const freelancers = usersData.freelancers.filter(isFreelancer);
export const allUsers: Array<Client | Freelancer> = [...clients, ...freelancers];