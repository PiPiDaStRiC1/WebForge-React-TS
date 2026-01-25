import {freelancers} from '../data/users';

export const FREELANCERS_COUNT_ON_PAGE: number = 33;
export const TOTAL_FREELANCE_PAGES: number = Math.ceil(freelancers.length / FREELANCERS_COUNT_ON_PAGE);