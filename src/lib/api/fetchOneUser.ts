import { getAllFreelancers, getAllClients } from '@/lib/storage/dataStore';
import type {Client, Freelancer} from '@/types'

export const fetchOneUser = async (userId: number): Promise<Client | Freelancer | undefined> => {
    await new Promise((resolve) => {
        setTimeout(() => resolve(true), 300)
    });

    const {freelancersById} = getAllFreelancers();
    const {clientsById} = getAllClients();
    const currentUsers: Array<Client | Freelancer> = [...Object.values((freelancersById as Record<string, Freelancer>)), ...Object.values(clientsById)];

    return currentUsers.find(user => user.id === userId);
}