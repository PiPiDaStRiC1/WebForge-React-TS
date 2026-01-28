import {allUsers} from '@/lib/data/users';
import type {Client, Freelancer} from '@/types'

export const fetchOneUser = async (userId: number): Promise<Client | Freelancer | undefined> => {
    await new Promise((resolve) => {
        setTimeout(() => resolve(true), 300)
    });

    return allUsers.find(user => user.id === userId);
}