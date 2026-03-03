import { useState, useEffect, useMemo, useCallback } from "react";
import { UserContext, type UserContextType } from "./UserContext";
import type { StoredUsers, AuthData, UserData, AllUserLSData } from "@/types";

interface UserProviderProps {
    children: React.ReactNode;
}

const initialAuthData: AuthData = { isLoggedIn: false, currentUserId: null, token: undefined };

const initAuthData = (): AuthData => {
    const raw = localStorage.getItem("auth-data");

    if (!raw) {
        localStorage.setItem("auth-data", JSON.stringify(initialAuthData));
        return initialAuthData;
    }

    try {
        const parsed = JSON.parse(raw) as AuthData;

        if (typeof parsed !== "object" || parsed === null) return initialAuthData;

        return parsed;
    } catch (error) {
        console.error("Failed to parse auth-data:", error);

        localStorage.setItem("auth-data", JSON.stringify(initialAuthData));

        return initialAuthData;
    }
};

const initUsers = (): StoredUsers => {
    const raw = localStorage.getItem("users");
    if (!raw) {
        localStorage.setItem("users", JSON.stringify({}));
        return {};
    }

    return JSON.parse(raw);
};

export const UserProvider = ({ children }: UserProviderProps) => {
    const [authData, setAuthData] = useState<AuthData>(initAuthData);
    const [userData, setUserData] = useState<UserData | null>(null);
    const [error, setError] = useState<Error | null>(null);
    const isAuthenticated = authData.isLoggedIn && !!authData.currentUserId;

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

    const registerUser = useCallback((userData: UserData) => {
        const users: StoredUsers = initUsers();

        const isUserExists = Object.values(users).some((user) => user.email === userData.email);

        if (isUserExists) {
            throw new Error("Такой пользователь уже существует");
        }

        localStorage.setItem("users", JSON.stringify({ ...users, [userData.id]: userData }));

        const raw = localStorage.getItem("users-data");
        const allUsersData: Record<string, AllUserLSData> = raw ? JSON.parse(raw) : {};

        if (!allUsersData[userData.id]) {
            allUsersData[userData.id] = { messages: {}, favorites: {}, createdOrders: {} };
            localStorage.setItem("users-data", JSON.stringify(allUsersData));
        }

        setUserData(userData);
        setAuthData({ isLoggedIn: true, currentUserId: userData.id, token: crypto.randomUUID() });
    }, []);

    const logOutUser = useCallback(() => {
        setUserData(null);
        setAuthData({ isLoggedIn: false, currentUserId: null, token: undefined });
    }, []);

    const logInUser = useCallback((email: string) => {
        const users: StoredUsers = initUsers();

        const user = Object.values(users).find((user) => user.email === email);
        if (!user) throw new Error("Неверно указан email или пароль");

        setUserData(user);
        setAuthData({ isLoggedIn: true, currentUserId: user.id, token: crypto.randomUUID() });
    }, []);

    const deleteUser = useCallback(() => {
        const users: StoredUsers = initUsers();

        if (!authData.currentUserId) throw new Error("Нет авторизованного пользователя");

        // eslint-disable-next-line
        const { [authData.currentUserId]: _, ...restUsers } = users;
        localStorage.setItem("users", JSON.stringify(restUsers));
        setUserData(null);

        const raw = localStorage.getItem("users-data");
        const allUsersData: Record<string, AllUserLSData> = raw ? JSON.parse(raw) : {};

        // eslint-disable-next-line
        const { [authData.currentUserId]: __, ...restUsersData } = allUsersData;
        localStorage.setItem("users-data", JSON.stringify(restUsersData));

        setAuthData({ isLoggedIn: false, currentUserId: null, token: undefined });
    }, [authData.currentUserId]);

    useEffect(() => {
        localStorage.setItem("auth-data", JSON.stringify(authData));
    }, [authData]);

    // подготовка для бекенда
    useEffect(() => {
        try {
            if (!authData.currentUserId) return;

            const rawUsers = localStorage.getItem("users");
            if (!rawUsers) throw new Error("Failed to load rawUsers from localStorage");

            const parsedUsers: StoredUsers = JSON.parse(rawUsers);
            if (parsedUsers === null) {
                localStorage.setItem("users", JSON.stringify({}));
                return;
            }

            const parsedUser = parsedUsers[authData.currentUserId];

            setUserData(parsedUser);
        } catch (error) {
            setError(
                error instanceof Error
                    ? error
                    : new Error("Неизвестная ошибка при загрузке данных пользователя"),
            );
        }
    }, [authData.currentUserId]);

    useEffect(() => {
        if (userData) {
            try {
                const users: StoredUsers = initUsers();
                if (!users)
                    throw new Error(
                        "Failed to load users from localStorage in save userData useEffect",
                    );

                localStorage.setItem(
                    "users",
                    JSON.stringify({ ...users, [userData.id]: userData }),
                );
            } catch (error) {
                setError(
                    error instanceof Error
                        ? error
                        : new Error("Неизвестная ошибка при загрузке данных пользователя"),
                );
            }
        }
    }, [userData]);

    const value: UserContextType = useMemo(
        () => ({
            user: userData,
            error,
            isAuthenticated,
            registerUser,
            logOutUser,
            logInUser,
            deleteUser,
            changeUserData,
        }),
        [
            userData,
            error,
            isAuthenticated,
            registerUser,
            logOutUser,
            logInUser,
            deleteUser,
            changeUserData,
        ],
    );

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
