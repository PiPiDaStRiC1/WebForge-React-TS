import {freelancers} from '../data/users';

export const ITEMS_PER_PAGE_OPTIONS = [12, 24, 33] as const;
export const DEFAULT_ITEMS_PER_PAGE = 12;
export const FREELANCERS_COUNT_ON_PAGE: number = 33;
export const TOTAL_FREELANCE_PAGES: number = Math.ceil(freelancers.length / FREELANCERS_COUNT_ON_PAGE);