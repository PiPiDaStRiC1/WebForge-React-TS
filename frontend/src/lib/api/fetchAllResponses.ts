import { getAllResponses } from '@/lib/storage/dataStore';
import type { ResponsesData } from '@/types'

export const fetchAllResponses = async (): Promise<ResponsesData> => {
    await new Promise((resolve) => {
        setTimeout(() => resolve(true), 300);
    });

    const currentResponses = getAllResponses();

    return currentResponses
}