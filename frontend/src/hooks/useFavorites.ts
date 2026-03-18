import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useUser } from "./useUser";
import { apiClient } from "@/lib/api";
import type { Favorite } from "@shared/types";

export const useFavorites = () => {
    const queryClient = useQueryClient();
    const { user } = useUser();
    const currentUserId = user?.id;

    const { data: favoritesList = {} } = useQuery<Record<string, Favorite>>({
        queryKey: ["favorites", currentUserId],
        queryFn: () => apiClient.getAllLikesByOneUser(currentUserId!),
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
                        [userId]: { id: userId, likedUserId: userId, timestamp: new Date() },
                    };
                }
            });

            return { prevData };
        },
        mutationFn: async (userId: number) => {
            if (!currentUserId) {
                throw new Error("User not authenticated");
            }

            const favorites = await apiClient.getAllLikesByOneUser(currentUserId);

            if (Object.values(favorites).some((fav) => fav.likedUserId === userId)) {
                await apiClient.deleteSingleLike(userId);
            } else {
                const data: Favorite = { likedUserId: userId };

                await apiClient.postSingleLike(data);
            }
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
