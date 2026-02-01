import { useState, useEffect, useMemo, useCallback } from 'react';
import { UserContext, type UserContextType } from './UserContext';
import type { UserData } from '@/types';

interface UserProviderProps {
    children: React.ReactNode
}

export const UserProvider = ({children}: UserProviderProps) => {
    const [userData, setUserData] = useState<UserData | null>(null);
    const [error, setError] = useState<Error | null>(null);
    const isAuthenticated = !!userData;

    const registerUser = useCallback((userData: UserData) => {
        setUserData(userData);
        localStorage.setItem('user-data', JSON.stringify(userData));
    }, []);

    const logOutUser = useCallback(() => {
        localStorage.removeItem('user-data');
        setUserData(null);
        window.location.href = '/';
    }, []);

    // подготовка для бекенда
    useEffect(() => {
        try {
            const raw = localStorage.getItem('user-data');
            if (!raw) return;

            const parsed: UserData = JSON.parse(raw);
            setUserData(parsed);
        } catch(error) {
            setError(error as Error);
        } 
    }, []);

    const value: UserContextType = useMemo(() => ({
        user: userData,
        error,
        isAuthenticated,
        registerUser,
        logOutUser
    }), [userData, error, isAuthenticated, registerUser, logOutUser]);
    
    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
}