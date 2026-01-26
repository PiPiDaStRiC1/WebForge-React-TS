import {freelancers} from '@/lib/data/users';
import type {Freelancer} from '@/types';


export async function fetchAllFreelancers(): Promise<Array<Freelancer>> {
    await new Promise<boolean>((resolve) => {
        setTimeout(() => resolve(true), 300)
    })
    
    return freelancers;
}