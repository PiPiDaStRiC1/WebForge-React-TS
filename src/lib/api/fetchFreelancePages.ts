import {freelancers} from '@/lib/data/users';
import type {Freelancer} from '@/types';

export async function fetchFreelancePages(page: number, countOnPage: number): Promise<Array<Freelancer>> {
    await new Promise<boolean>((resolve) => {
        setTimeout(() => resolve(true), 300)
    })
    const start = (page - 1) * countOnPage;
    const end = page * countOnPage;
    
    const pageData = freelancers.slice(start, end);
    return pageData;
}