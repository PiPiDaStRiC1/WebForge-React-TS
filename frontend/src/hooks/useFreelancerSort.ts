import { useMemo } from 'react';
import type { Freelancer } from '@/types';

export type SortOption = 'default' | 'price-asc' | 'price-desc' | 'rating-desc' | 'experience-desc';

export const useFreelancerSort = (data: Freelancer[], sortBy: SortOption) => {
    return useMemo(() => {
        const sorted = [...data];

        switch (sortBy) {
            case 'price-asc':
                return sorted.sort((a, b) => (a.pricePerHour ?? 0) - (b.pricePerHour ?? 0));
            
            case 'price-desc':
                return sorted.sort((a, b) => (b.pricePerHour ?? 0) - (a.pricePerHour ?? 0));
            
            case 'rating-desc':
                return sorted.sort((a, b) => b.rating - a.rating);
            
            case 'experience-desc':
                return sorted.sort((a, b) => b.experience - a.experience);
            
            case 'default':
            default:
                return sorted;
        }
    }, [data, sortBy]);
};
