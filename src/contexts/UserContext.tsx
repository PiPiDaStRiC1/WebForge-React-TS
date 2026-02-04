import { createContext } from "react";
import type { UserData } from '@/types';

export interface UserContextType {
    user: UserData | null;
    error: Error | null;
    isAuthenticated: boolean;
    registerUser: (userData: UserData) => void;
    logOutUser: () => void;
    logInUser: (email: string, password?: string) => void;
    deleteUser: () => void;
    changeUserData: <T extends keyof UserData>(changes : [T, UserData[T]][], signal: AbortSignal) => Promise<void>;
}

export const UserContext = createContext<UserContextType | null>(null);