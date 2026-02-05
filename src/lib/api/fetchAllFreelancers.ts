import { getAllFreelancers, getAllOrders } from '@/lib/storage/dataStore';
import type { FreelancersData, Freelancer } from '@/types';


export async function fetchAllFreelancers(): Promise<FreelancersData> {
    await new Promise<boolean>((resolve) => {
        setTimeout(() => resolve(true), 300);
    });
    const {freelancersById, allIds} = getAllFreelancers();
    const {ordersById} = getAllOrders();
    
    const FreelancersWithCompletedOrders = allIds.reduce((acc, freelancerId) => {
        const freelancer = freelancersById[freelancerId];
        const completedOrders = Object.values(ordersById).filter(order => order.completedById === freelancer.id).length;

        acc[freelancerId] = {
            ...freelancer,
            completedOrders: completedOrders
        };
        
        return acc;
    }, {} as Record<string, Freelancer>);

    return { freelancersById: FreelancersWithCompletedOrders, allIds };
}