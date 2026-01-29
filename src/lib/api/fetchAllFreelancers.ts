import {freelancers} from '@/lib/data/users';
import {allOrders} from '@/lib/data/orders'
import type {Freelancer} from '@/types';


export async function fetchAllFreelancers(): Promise<Array<Freelancer>> {
    await new Promise<boolean>((resolve) => {
        setTimeout(() => resolve(true), 300);
    });
    
    return freelancers.map((freelancer) => {
        const completedOrders = allOrders.filter(order => order.completedById === freelancer.id).length;

        return {
            ...freelancer,
            completedOrders: completedOrders
        }
    })
}