import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useUser } from "./useUser";
import { apiClient } from "@/lib/api";
import type { Favorite, FavoritesData } from "@shared/types";

export const useFavorites = () => {
    const queryClient = useQueryClient();
    const { user } = useUser();
    const currentUserId = user?.id;

    const {
        data: favoritesList = {},
        isPending,
        isError: isErrorFavorites,
    } = useQuery<FavoritesData>({
        queryKey: ["favorites", currentUserId],
        queryFn: apiClient.getAllLikesMe,
        enabled: !!currentUserId,
    });

    const { mutate } = useMutation<
        undefined,
        unknown,
        { userId: number; isLiked: boolean },
        { prevData: FavoritesData }
    >({
        onMutate: async ({ userId, isLiked }) => {
            await queryClient.cancelQueries({ queryKey: ["favorites", currentUserId] });

            const prevData =
                queryClient.getQueryData<FavoritesData>(["favorites", currentUserId]) || {};

            queryClient.setQueryData<FavoritesData>(["favorites", currentUserId], () => {
                if (isLiked) {
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
        mutationFn: async ({ userId, isLiked }) => {
            if (!currentUserId) {
                throw new Error("User not authenticated");
            }

            if (isLiked) {
                await apiClient.deleteSingleLike(userId);
            } else {
                const data: Favorite = { likedUserId: userId };

                await apiClient.postSingleLike(data);
            }
        },
        onError: async (err, _variables, context) => {
            if (context?.prevData && currentUserId) {
                console.error(err);
                queryClient.setQueryData(["favorites", currentUserId], context.prevData);
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["favorites", currentUserId] });
        },
    });

    const isFavorite = (userId: number): boolean => {
        return !!favoritesList?.[userId];
    };

    return { favoritesList, toggleFavorite: mutate, isFavorite, isPending, isErrorFavorites };
};
