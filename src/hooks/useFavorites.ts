import { useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { AuthStore } from "@/lib/storage/authStore";
import type { AllUserLSData, Favorite } from "@/types";

export const useFavorites = () => {
    const queryClient = useQueryClient();
    const authStore = useMemo(() => new AuthStore(), []);
    const currentUserId = authStore.getUserId();

    const { data: favoritesList = {} } = useQuery<Record<string, Favorite>>({
        queryKey: ["favorites", currentUserId],
        queryFn: () => {
            if (!currentUserId) return {};

            const raw = localStorage.getItem("users-data");
            if (!raw) return {};

            try {
                const allUsersData = JSON.parse(raw);
                return allUsersData[currentUserId]?.favorites || {};
            } catch (error) {
                console.error("Failed to parse favorites:", error);
                return {};
            }
        },
        staleTime: 0,
        enabled: !!currentUserId,
    });

    const { mutate } = useMutation({
        onMutate: async (userId) => {
            await queryClient.cancelQueries({ queryKey: ["favorites", currentUserId] });

            const prevData =
                queryClient.getQueryData<Record<string, Favorite>>(["favorites", currentUserId]) ||
                {};

            queryClient.setQueryData<Record<string, Favorite>>(["favorites", currentUserId], () => {
                if (Object.values(prevData).some((fav) => fav.likedUserId === userId)) {
                    // eslint-disable-next-line
                    const { [userId]: _, ...updatedFavorites } = prevData;
                    return updatedFavorites;
                } else {
                    return {
                        ...prevData,
                        [userId]: {
                            id: userId,
                            likedUserId: userId,
                            timestamp: new Date().toISOString(),
                        },
                    };
                }
            });

            return { prevData };
        },
        mutationFn: async (userId: number) => {
            if (!currentUserId) {
                throw new Error("User not authenticated");
            }

            const raw = localStorage.getItem("users-data");
            const allUsersData: Record<string, AllUserLSData> = raw ? JSON.parse(raw) : {};

            if (!allUsersData[currentUserId]) {
                allUsersData[currentUserId] = { messages: {}, favorites: {}, createdOrders: {} };
            }

            if (!allUsersData[currentUserId].favorites) {
                allUsersData[currentUserId].favorites = {};
            }

            const favorites: AllUserLSData["favorites"] = allUsersData[currentUserId].favorites;

            if (Object.values(favorites).some((fav) => fav.likedUserId === userId)) {
                // eslint-disable-next-line
                const { [userId]: _, ...updatedFavorites } = favorites;
                allUsersData[currentUserId].favorites = updatedFavorites;
            } else {
                allUsersData[currentUserId].favorites = {
                    ...favorites,
                    [userId]: {
                        id: userId,
                        likedUserId: userId,
                        timestamp: new Date().toISOString(),
                    },
                };
            }

            localStorage.setItem("users-data", JSON.stringify(allUsersData));
        },
        onError: (err, _userId, context) => {
            if (context?.prevData && currentUserId) {
                console.error(err);
                queryClient.setQueryData(["favorites", currentUserId], context.prevData);

                const raw = localStorage.getItem("users-data");
                const allUsersData = raw ? JSON.parse(raw) : {};
                if (allUsersData[currentUserId]) {
                    allUsersData[currentUserId].favorites = context.prevData;
                    localStorage.setItem("users-data", JSON.stringify(allUsersData));
                }
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["favorites", currentUserId] });
        },
    });

    const isFavorite = (userId: number): boolean => {
        return Object.values(favoritesList).some((fav) => fav.likedUserId === userId);
    };

    return { favoritesList, toggleFavorite: mutate, isFavorite };
};
