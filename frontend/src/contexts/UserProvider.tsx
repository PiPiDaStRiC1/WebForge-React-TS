import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { UserContext, type UserContextType } from "./UserContext";
import { apiClient } from "@/lib/api";
import type { UserData, RegisterRequest } from "@shared/types";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

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

const parseJWT = (token: string): { exp?: number } | null => {
    try {
        const payload = token.split(".")[1];
        if (!payload) return null;
        const decoded = JSON.parse(atob(payload)); // decoded base-64
        return decoded;
    } catch {
        return null;
    }
};

const getTokenExpirationTime = (token: string | null): number | null => {
    if (!token) return null;
    const decoded = parseJWT(token);
    if (!decoded?.exp) return null;
    return decoded.exp * 1000;
};

export const UserProvider = ({ children }: UserProviderProps) => {
    const navigate = useNavigate();
    const [JWTToken, setJWTToken] = useState(initJWTToken);
    const queryClient = useQueryClient();
    const tokenExpirationTimerIdRef = useRef<number | null>(null);

    const logOutUser = useCallback(() => {
        if (tokenExpirationTimerIdRef.current) {
            clearTimeout(tokenExpirationTimerIdRef.current);
            tokenExpirationTimerIdRef.current = null;
        }
        queryClient.setQueryData(["user"], null);
        setJWTToken(null);
        localStorage.removeItem("access-token");
    }, [queryClient]);

    const setupTokenExpirationTimer = useCallback(
        (token: string | null) => {
            // Clear existing timer
            if (tokenExpirationTimerIdRef.current) {
                clearTimeout(tokenExpirationTimerIdRef.current);
                tokenExpirationTimerIdRef.current = null;
            }

            if (!token) return;

            const expirationTime = getTokenExpirationTime(token);
            if (!expirationTime) return;

            const timeUntilExpiration = expirationTime - Date.now();

            // Only set timer if token expires in the future
            if (timeUntilExpiration > 0) {
                tokenExpirationTimerIdRef.current = setTimeout(() => {
                    logOutUser();
                    navigate("/auth", { replace: true });
                }, timeUntilExpiration);
            } else {
                logOutUser();
            }
        },
        [logOutUser, navigate],
    );

    const {
        data: user,
        isLoading: isLoadingUserData,
        isError: isErrorUserData,
    } = useQuery<UserData>({
        queryKey: ["user"],
        queryFn: () => apiClient.me(JWTToken).then((res) => res.user),
        staleTime: 30 * 60 * 1000,
        enabled: !!JWTToken,
    });
    const isAuthenticated = !!JWTToken;

    const changeUserData = useCallback(
        async <T extends keyof UserData>(changes: [T, UserData[T]][], signal: AbortSignal) => {
            await new Promise((resolve, reject) => {
                const timeout = setTimeout(() => {
                    queryClient.setQueryData(["user"], (oldData: UserData | null) => {
                        if (!oldData) return oldData;

                        const newUserData = { ...oldData };

                        changes.forEach(([field, value]) => {
                            newUserData[field] = value;
                        });

                        return newUserData;
                    });
                    resolve(null);
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
        [queryClient],
    );

    const registerUser = useCallback(
        async (data: RegisterRequest) => {
            const result = await apiClient.register(data);
            queryClient.setQueryData(["user"], result.user);
            setJWTToken(result.token);
            localStorage.setItem("access-token", JSON.stringify(result.token));
            setupTokenExpirationTimer(result.token);
        },
        [queryClient, setupTokenExpirationTimer],
    );

    const logInUser = useCallback(
        async (email: string, password: string) => {
            const result = await apiClient.login({ email, password });
            queryClient.setQueryData(["user"], result.user);
            setJWTToken(result.token);
            localStorage.setItem("access-token", JSON.stringify(result.token));
            setupTokenExpirationTimer(result.token);
        },
        [queryClient, setupTokenExpirationTimer],
    );

    const deleteUser = useCallback(async () => {
        if (tokenExpirationTimerIdRef.current) {
            clearTimeout(tokenExpirationTimerIdRef.current);
            tokenExpirationTimerIdRef.current = null;
        }

        await apiClient.delete();
        queryClient.setQueryData(["user"], null);
        setJWTToken(null);
        localStorage.removeItem("access-token");
    }, [queryClient]);

    useEffect(() => {
        if (JWTToken) {
            localStorage.setItem("access-token", JSON.stringify(JWTToken));
        } else {
            localStorage.removeItem("access-token");
        }
    }, [JWTToken]);

    useEffect(() => {
        // it can not trigger cascade rerenders
        setupTokenExpirationTimer(JWTToken);
    }, [JWTToken, setupTokenExpirationTimer]);

    useEffect(() => {
        return () => {
            if (tokenExpirationTimerIdRef.current) {
                clearTimeout(tokenExpirationTimerIdRef.current);
            }
        };
    }, []);

    const value: UserContextType = useMemo(
        () => ({
            user,
            isAuthenticated,
            isLoadingUserData,
            isErrorUserData,
            registerUser,
            logOutUser,
            deleteUser,
            logInUser,
            changeUserData,
        }),
        [
            user,
            isAuthenticated,
            isLoadingUserData,
            isErrorUserData,
            registerUser,
            logOutUser,
            deleteUser,
            logInUser,
            changeUserData,
        ],
    );

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
