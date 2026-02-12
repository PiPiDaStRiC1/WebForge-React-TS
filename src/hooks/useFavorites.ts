import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { Favorite } from "@/types";

export const useFavorites = () => {
    const queryClient = useQueryClient();

    const { data: favoritesList = {} } = useQuery<Record<string, Favorite>>({
        queryKey: ["favorites"],
        queryFn: () => {
            const raw = localStorage.getItem("favorites");
            return raw ? JSON.parse(raw) : {};
        },
        staleTime: 0,
    });

    const { mutate } = useMutation({
        onMutate: async (userId) => {
            await queryClient.cancelQueries({ queryKey: ["favorites"] });

            const prevData =
                queryClient.getQueryData<Record<string, Favorite>>(["favorites"]) || {};

            queryClient.setQueryData<Record<string, Favorite>>(["favorites"], () => {
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
            const raw = localStorage.getItem("favorites");
            const favorites: Record<string, Favorite> = raw ? JSON.parse(raw) : {};

            if (Object.values(favorites).some((fav) => fav.likedUserId === userId)) {
                // eslint-disable-next-line
                const { [userId]: _, ...updatedFavorites } = favorites;
                localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
            } else {
                const updatedFavorites = {
                    ...favorites,
                    [userId]: {
                        id: userId,
                        likedUserId: userId,
                        timestamp: new Date().toISOString(),
                    },
                };
                localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
            }
        },
        onError: (err, _userId, context) => {
            if (context?.prevData) {
                console.error(err);
                queryClient.setQueryData(["favorites"], context.prevData);
                localStorage.setItem("favorites", JSON.stringify(context.prevData));
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["favorites"] });
        },
    });

    const isFavorite = (userId: number): boolean => {
        return Object.values(favoritesList).some((fav) => fav.likedUserId === userId);
    };

    return { favoritesList, toggleFavorite: mutate, isFavorite };
};
