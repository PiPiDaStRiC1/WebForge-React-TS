import { createContext } from "react";
import type { UserData, RegisterRequest } from "@shared/types";

export interface UserContextType {
    user: UserData | undefined;
    isAuthenticated: boolean;
    isLoadingUserData: boolean;
    isErrorUserData: boolean;
    registerUser: (data: RegisterRequest) => Promise<void>;
    logOutUser: () => void;
    logInUser: (email: string, password: string) => Promise<void>;
    deleteUser: (currentUserId: number) => void;
    changeUserData: <T extends keyof UserData>(
        changes: [T, UserData[T]][],
        signal: AbortSignal,
    ) => Promise<void>;
}

export const UserContext = createContext<UserContextType | null>(null);
