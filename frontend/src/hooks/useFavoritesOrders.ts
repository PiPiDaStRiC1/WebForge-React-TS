import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useUser } from "./useUser";
import { apiClient } from "@/lib/api";
import type { FavoriteOrdersData } from "@shared/types";

export const useFavoritesOrders = () => {
    const queryClient = useQueryClient();
    const { user } = useUser();
    const currentUserId = user?.id;

    const {
        data: likeOrdersList = {},
        isPending,
        isError: isErrorLikeOrders,
    } = useQuery({
        queryKey: ["likeOrders", currentUserId],
        queryFn: apiClient.getAllLikeOrdersMe,
        enabled: !!currentUserId,
    });

    const { mutate } = useMutation<
        undefined,
        unknown,
        { likedOrderId: number; isLiked: boolean },
        { prevData: FavoriteOrdersData }
    >({
        onMutate: async ({ likedOrderId, isLiked }) => {
            await queryClient.cancelQueries({ queryKey: ["likeOrders", currentUserId] });

            const prevData =
                queryClient.getQueryData<FavoriteOrdersData>(["likeOrders", currentUserId]) || {};

            queryClient.setQueryData<FavoriteOrdersData>(["likeOrders", currentUserId], () => {
                if (isLiked) {
                    // eslint-disable-next-line
                    const { [likedOrderId]: _, ...updatedLikeOrders } = prevData;
                    return updatedLikeOrders;
                } else {
                    return {
                        ...prevData,
                        likedOrderId: { id: likedOrderId, likedOrderId, timestamp: new Date() },
                    };
                }
            });

            return { prevData };
        },
        mutationFn: async ({ likedOrderId, isLiked }) => {
            if (!currentUserId) {
                throw new Error("User not authenticated");
            }

            if (isLiked) {
                await apiClient.deleteSingleLikeOrder(likedOrderId);
            } else {
                await apiClient.postSingleLikeOrder({ likedOrderId });
            }
        },
        onError: (_error, _variables, context) => {
            queryClient.setQueryData(["likeOrders", currentUserId], context?.prevData);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["likeOrders", currentUserId] });
        },
    });

    const isLikedOrder = (likedOrderId: number): boolean => {
        return !!likeOrdersList?.[likedOrderId];
    };

    return { likeOrdersList, toggleLikeOrder: mutate, isPending, isErrorLikeOrders, isLikedOrder };
};
