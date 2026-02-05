import { getAllFreelancers, getAllClients } from '@/lib/storage/dataStore';
import type {Client, FreelancerWithoutCompletedOrders} from '@/types'

export const fetchOneUser = async (userId: number): Promise<Client | FreelancerWithoutCompletedOrders | undefined> => {
    await new Promise((resolve) => {
        setTimeout(() => resolve(true), 300)
    });

    const {freelancersById} = getAllFreelancers();
    const {clientsById} = getAllClients();
    const currentUsers: Array<Client | FreelancerWithoutCompletedOrders> = [...Object.values(freelancersById), ...Object.values(clientsById)];

    return currentUsers.find(user => user.id === userId);
}