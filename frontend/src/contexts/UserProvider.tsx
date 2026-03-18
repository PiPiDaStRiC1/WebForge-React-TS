import { useState, useEffect, useMemo, useCallback } from "react";
import { UserContext, type UserContextType } from "./UserContext";
import { apiClient } from "@/lib/api";
import type { UserData, RegisterRequest } from "@shared/types";

interface UserProviderProps {
    children: React.ReactNode;
}

const initJWTToken = (): string | null => {
    try {
        const raw = localStorage.getItem("access-token");
        const token = raw ? JSON.parse(raw) : null;

        return token;
    } catch (error) {
        console.error("Failed to parse access-token:", error);
        localStorage.removeItem("access-token");
        return null;
    }
};

export const UserProvider = ({ children }: UserProviderProps) => {
    const [JWTToken, setJWTToken] = useState(initJWTToken);
    const [userData, setUserData] = useState<UserData | null>(null);
    const [error, setError] = useState<Error | null>(null);
    const isAuthenticated = !!JWTToken;

    const changeUserData = useCallback(
        async <T extends keyof UserData>(changes: [T, UserData[T]][], signal: AbortSignal) => {
            await new Promise((resolve, reject) => {
                const timeout = setTimeout(() => {
                    setUserData((prev) => {
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
                        reject(new DOMException("Aborted", "AbortError"));
                        return;
                    }

                    signal.addEventListener(
                        "abort",
                        () => {
                            clearTimeout(timeout);
                            reject(new DOMException("Aborted", "AbortError"));
                        },
                        { once: true },
                    );
                }
            });
        },
        [],
    );

    const registerUser = useCallback(async (data: RegisterRequest) => {
        const result = await apiClient.register(data);
        setUserData(result.user);
        setJWTToken(result.token);
    }, []);

    const logOutUser = useCallback(() => {
        setUserData(null);
        setJWTToken(null);
        localStorage.removeItem("access-token");
    }, []);

    const logInUser = useCallback(async (email: string, password: string) => {
        const result = await apiClient.login({ email, password });
        setUserData(result.user);
        setJWTToken(result.token);
    }, []);

    const deleteUser = useCallback(async (currentUserId: number) => {
        await apiClient.delete(currentUserId);
        setUserData(null);
        setJWTToken(null);
        localStorage.removeItem("access-token");
    }, []);

    useEffect(() => {
        if (JWTToken !== null) {
            localStorage.setItem("access-token", JSON.stringify(JWTToken));
        }
    }, [JWTToken]);

    useEffect(() => {
        (async () => {
            try {
                if (!JWTToken) {
                    setUserData(null);
                    return;
                }

                const result = await apiClient.me(JWTToken);
                setUserData(result.user);
            } catch (error) {
                setUserData(null);
                setJWTToken(null);
                localStorage.removeItem("access-token");
                setError(
                    error instanceof Error
                        ? error
                        : new Error("Неизвестная ошибка при загрузке данных пользователя"),
                );
            }
        })();
    }, [JWTToken]);

    const value: UserContextType = useMemo(
        () => ({
            user: userData,
            error,
            isAuthenticated,
            registerUser,
            logOutUser,
            deleteUser,
            logInUser,
            changeUserData,
        }),
        [
            userData,
            error,
            isAuthenticated,
            registerUser,
            logOutUser,
            deleteUser,
            logInUser,
            changeUserData,
        ],
    );

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
