import { createContext } from "react";
import type { UserData } from '@/types';

export interface UserContextType {
    user: UserData | null;
    error: Error | null;
    isAuthenticated: boolean;
    registerUser: (userData: UserData) => void;
    logOutUser: () => void;
}

export const UserContext = createContext<UserContextType | null>(null);