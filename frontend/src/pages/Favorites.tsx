import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { Heart, Sparkles, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useFavorites, useFavoritesOrders, useUser } from "@/hooks";
import { apiClient } from "@/lib/api";
import { FavoriteUserCard, FavoriteOrderCard } from "@/components/ui";
import { Preloader, ErrorAlert } from "@/components/common";
import type { FreelancersData, OrdersData } from "@shared/types";

const Favorites = () => {
    const { user } = useUser();
    const userRole = user?.role;

    const { favoritesList, isErrorFavorites } = useFavorites();
    const { likeOrdersList, isErrorLikeOrders } = useFavoritesOrders();

    const {
        data: freelancersData,
        isLoading: isLoadingFreelancers,
        isError: isErrorFreelancers,
    } = useQuery<FreelancersData>({
        queryKey: ["freelancers"],
        queryFn: apiClient.getAllFreelancers,
        staleTime: 5 * 60 * 1000,
        enabled: !!userRole || userRole === "client",
    });

    const {
        data: ordersData,
        isLoading: isLoadingOrders,
        isError: isErrorOrders,
    } = useQuery<OrdersData>({
        queryKey: ["orders"],
        queryFn: apiClient.getAllOrders,
        staleTime: 5 * 60 * 1000,
        enabled: !!userRole || userRole === "freelancer",
    });

    const favoriteFreelancers = useMemo(() => {
        if (!freelancersData) return [];

        const favoriteIds = Object.values(favoritesList).map((fav) => fav.likedUserId);
        return favoriteIds.map((id) => freelancersData.freelancersById[id]!).filter(Boolean);
    }, [freelancersData, favoritesList]);

    const favoriteOrders = useMemo(() => {
        if (!ordersData) return [];

        const favoriteIds = Object.values(likeOrdersList).map((fav) => fav.likedOrderId);
        return favoriteIds.map((id) => ordersData.ordersById[id]!).filter(Boolean);
    }, [ordersData, likeOrdersList]);

    if (isLoadingFreelancers || isLoadingOrders) {
        return <Preloader />;
    }

    if (isErrorFavorites) {
        return <ErrorAlert message="Не удалось загрузить избранное" />;
    }

    if (isErrorFreelancers || isErrorOrders || isErrorLikeOrders) {
        return <ErrorAlert message="Не удалось загрузить избранных исполнителей" />;
    }

    return (
        <div className="min-h-screen">
            <section className="relative">
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full blur-3xl opacity-40" />
                    <div className="absolute -bottom-32 -left-32 w-[28rem] h-[28rem] rounded-full blur-3xl opacity-40" />
                </div>

                <div className="relative pt-14 pb-10">
                    <div className="mb-12">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center shadow-lg shadow-rose-500/30">
                                <Heart size={24} className="text-white fill-white" />
                            </div>
                            <div>
                                <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
                                    Избранные исполнители
                                </h1>
                                {favoriteFreelancers.length === 0 ||
                                    (favoriteOrders.length === 0 && (
                                        <p className="text-gray-600 mt-1">
                                            Здесь будут отображаться исполнители и заказы, которые
                                            вы добавили в избранное.
                                        </p>
                                    ))}
                            </div>
                        </div>
                    </div>

                    {userRole === "client" && favoriteFreelancers.length === 0 && (
                        <div className="relative flex flex-col items-center justify-center py-20 px-4">
                            <div className="max-w-md text-center">
                                <div className="relative mb-8">
                                    <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-rose-100 to-pink-100 flex items-center justify-center">
                                        <Heart size={64} className="text-rose-300" />
                                    </div>
                                    <div className="absolute top-0 right-1/4 w-8 h-8 rounded-full bg-pink-200 animate-pulse" />
                                    <div className="absolute bottom-0 left-1/4 w-6 h-6 rounded-full bg-rose-200 animate-pulse delay-150" />
                                </div>

                                <h2 className="text-2xl font-bold text-gray-800 mb-3">
                                    Здесь пока пусто
                                </h2>
                                <p className="text-gray-600 mb-8 leading-relaxed">
                                    Добавьте исполнителей в избранное, чтобы быстро находить их
                                    позже. Нажмите на иконку сердечка в карточке исполнителя.
                                </p>

                                <Link
                                    to="/performers"
                                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-rose-500 to-pink-600 text-white font-semibold rounded-xl shadow-lg shadow-rose-500/30 hover:shadow-xl hover:shadow-rose-500/40 hover:scale-105 transition-all duration-200"
                                >
                                    <Sparkles size={20} />
                                    Найти исполнителей
                                    <ArrowRight size={20} />
                                </Link>
                            </div>
                        </div>
                    )}

                    {userRole === "freelancer" && favoriteOrders.length === 0 && (
                        <div className="relative flex flex-col items-center justify-center py-20 px-4">
                            <div className="max-w-md text-center">
                                <div className="relative mb-8">
                                    <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-rose-100 to-pink-100 flex items-center justify-center">
                                        <Heart size={64} className="text-rose-300" />
                                    </div>
                                    <div className="absolute top-0 right-1/4 w-8 h-8 rounded-full bg-pink-200 animate-pulse" />
                                    <div className="absolute bottom-0 left-1/4 w-6 h-6 rounded-full bg-rose-200 animate-pulse delay-150" />
                                </div>

                                <h2 className="text-2xl font-bold text-gray-800 mb-3">
                                    Здесь пока пусто
                                </h2>
                                <p className="text-gray-600 mb-8 leading-relaxed">
                                    Добавьте заказы в избранное, чтобы быстро находить их позже.
                                    Нажмите на иконку сердечка в карточке заказа.
                                </p>

                                <Link
                                    to="/orders"
                                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-rose-500 to-pink-600 text-white font-semibold rounded-xl shadow-lg shadow-rose-500/30 hover:shadow-xl hover:shadow-rose-500/40 hover:scale-105 transition-all duration-200"
                                >
                                    <Sparkles size={20} />
                                    Найти заказ
                                    <ArrowRight size={20} />
                                </Link>
                            </div>
                        </div>
                    )}

                    {userRole === "freelancer" && favoriteOrders.length > 0 && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {favoriteOrders.map((order) => (
                                <FavoriteOrderCard key={order.id} order={order} />
                            ))}
                        </div>
                    )}

                    {userRole === "client" && favoriteFreelancers.length > 0 && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {favoriteFreelancers.map((freelancer) => (
                                <FavoriteUserCard key={freelancer.id} user={freelancer} />
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default Favorites;
