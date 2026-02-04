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

    const changeUserData = useCallback(async <T extends keyof UserData>(changes : [T, UserData[T]][], signal: AbortSignal) => {
        await new Promise((resolve, reject) => {
            const timeout = setTimeout(() => {
                setUserData(prev => {
                    if (!prev) return prev;
                    const newUserData = { ...prev };
        
                    changes.forEach(([field, value]) => {
                        newUserData[field] = value;
                    });
        
                    return newUserData;
                });
                resolve(true);
            }, 1500);

            if (signal) {
                if (signal.aborted) {
                    clearTimeout(timeout);
                    reject(new DOMException('Aborted', 'AbortError'));
                    return;
                }

                signal.addEventListener('abort', () => {
                    clearTimeout(timeout);
                    reject(new DOMException('Aborted', 'AbortError'));
                }, {once: true} );
            }
        })
    }, []);

    const registerUser = useCallback((userData: UserData) => {
        setUserData(userData);
    }, []);

    const logOutUser = useCallback(() => {
        setUserData(null);
    }, []);

    const logInUser = useCallback((email: string) => {
        const raw = localStorage.getItem('user-data');
        if (!raw) throw new Error('Неверно указан email или пароль');
        
        const parsed: UserData = JSON.parse(raw);
        if (parsed.email !== email) throw new Error('Неверно указан email или пароль');
          
        setUserData(parsed);
    }, []);

    const deleteUser = useCallback(() => {
        setUserData(null);
        localStorage.removeItem('user-data');
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

    useEffect(() => {
        if (userData) {
            localStorage.setItem('user-data', JSON.stringify(userData));
        }
    }, [userData]);

    const value: UserContextType = useMemo(() => ({
        user: userData,
        error,
        isAuthenticated,
        registerUser,
        logOutUser,
        logInUser,
        deleteUser,
        changeUserData
    }), [userData, error, isAuthenticated, registerUser, logOutUser, logInUser, deleteUser, changeUserData]);
    
    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
}