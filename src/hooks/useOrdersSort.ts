import { useMemo } from "react"
import type {Order} from '@/types'

type SortOption = 'date-desc' | 'date-asc' | 'budget-desc' | 'budget-asc' | 'responses-desc';

export const useOrdersSort = (data: Order[], sortBy: SortOption) => {
    return useMemo(() => {
        switch (sortBy) {
            case 'date-desc':
                return data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
            case 'date-asc':
                return data.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
            case 'budget-desc':
                return data.sort((a, b) => b.budgetMax - a.budgetMax);
            case 'budget-asc':
                return data.sort((a, b) => a.budgetMin - b.budgetMin);
            case 'responses-desc':
                return data.sort((a, b) => b.responsesCount - a.responsesCount);
            default:
                return data;
        }
    }, [data, sortBy])   
}