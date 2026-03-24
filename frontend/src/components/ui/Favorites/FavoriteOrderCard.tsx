import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Calendar, Clock, Heart, Briefcase, Banknote } from "lucide-react";
import { useFavoritesOrders, useUser } from "@/hooks";
import type { Order } from "@shared/types";

interface FavoriteOrderCardProps {
    order: Order;
}

export const FavoriteOrderCard = ({ order }: FavoriteOrderCardProps) => {
    const location = useLocation();
    const { user, isAuthenticated } = useUser();
    const { toggleLikeOrder, isLikedOrder, isPending } = useFavoritesOrders();
    const [isFavoriteOrder, setIsFavoriteOrder] = useState(isLikedOrder(order.id));

    const handleToggleFavorite = () => {
        toggleLikeOrder({ likedOrderId: order.id, isLiked: isFavoriteOrder });
        setIsFavoriteOrder(!isFavoriteOrder);
    };

    const isOwnOrder = user?.id === order.clientId;
    const budgetText = `${order.budgetMin.toLocaleString()} - ${order.budgetMax.toLocaleString()} ₽`;
    const createdDate = new Date(order.createdAt).toLocaleDateString("ru-RU");

    return (
        <article className="group flex flex-col bg-white/80 backdrop-blur-sm border border-gray-200/60 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:border-indigo-200/60 hover:-translate-y-1 transition-all duration-300">
            <div className="relative bg-gradient-to-br from-slate-50 to-indigo-50/30 p-4 border-b border-gray-100">
                <div className="flex items-start gap-3">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-md flex-shrink-0">
                        <Briefcase size={20} />
                    </div>

                    <div className="min-w-0 flex-1">
                        <h3 className="text-base font-bold text-gray-900 line-clamp-1">
                            {order.title}
                        </h3>
                        <div className="mt-1 flex items-center gap-3 text-xs text-gray-600">
                            <span className="inline-flex items-center gap-1">
                                <Calendar size={12} className="text-gray-400" />
                                {createdDate}
                            </span>
                            <span className="inline-flex items-center gap-1">
                                <Clock size={12} className="text-gray-400" />
                                {order.deadlineDays} дн.
                            </span>
                        </div>
                    </div>

                    <button
                        className={`${isFavoriteOrder ? "text-rose-500 border-rose-300 bg-rose-50" : "text-gray-400 border-gray-200 bg-white"} cursor-pointer flex-shrink-0 w-9 h-9 flex items-center justify-center rounded-lg hover:scale-110 active:scale-95 transition-all duration-200`}
                        aria-label="В избранное"
                        onClick={handleToggleFavorite}
                    >
                        {isPending ? (
                            <div className="w-4 h-4 border-2 border-gray-300 border-t-rose-500 rounded-full animate-spin" />
                        ) : (
                            <Heart
                                size={16}
                                className="hover:scale-110 active:scale-95 hover:animate-pulse"
                            />
                        )}
                    </button>
                </div>
            </div>

            <div className="flex flex-col h-full p-4 space-y-3">
                <p className="text-sm text-gray-600 leading-relaxed line-clamp-2">
                    {order.description || "Описание заказа не указано"}
                </p>

                <div className="flex flex-wrap gap-1.5">
                    {order.skills.slice(0, 3).map((skill) => (
                        <span
                            key={`${order.id}-${skill}`}
                            className="px-2.5 py-1 text-xs font-medium bg-indigo-50 text-indigo-700 rounded-lg border border-indigo-100"
                        >
                            {skill}
                        </span>
                    ))}
                </div>

                <div className="pt-2 border-t border-gray-100">
                    <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500 font-medium inline-flex items-center gap-1">
                            <Banknote size={12} className="text-gray-400" />
                            Бюджет
                        </span>
                        <span className="text-base font-bold text-gray-900">{budgetText}</span>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-1">
                    <Link
                        to={`/orders/${order.id}`}
                        className="h-10 inline-flex items-center justify-center bg-white border border-gray-300 rounded-lg text-sm font-semibold text-gray-700 hover:border-indigo-300 hover:text-indigo-700 hover:bg-indigo-50 transition-all"
                    >
                        К заказу
                    </Link>

                    {!isAuthenticated ? (
                        <Link
                            to="/auth"
                            state={{
                                background: location,
                                redirectTo: `/messages/${order.clientId}`,
                            }}
                            className="h-10 inline-flex items-center justify-center bg-indigo-600 text-white rounded-lg text-sm font-semibold shadow-md shadow-indigo-500/20 hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-500/30 transition-all"
                        >
                            Отклик
                        </Link>
                    ) : isOwnOrder ? (
                        <button
                            className="opacity-50 h-10 inline-flex items-center justify-center bg-indigo-600 text-white rounded-lg text-sm font-semibold shadow-md shadow-indigo-500/20"
                            disabled
                        >
                            Ваш заказ
                        </button>
                    ) : (
                        <Link
                            to={`/messages/${order.clientId}`}
                            className="h-10 inline-flex items-center justify-center bg-indigo-600 text-white rounded-lg text-sm font-semibold shadow-md shadow-indigo-500/20 hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-500/30 transition-all"
                        >
                            Отклик
                        </Link>
                    )}
                </div>
            </div>
        </article>
    );
};
