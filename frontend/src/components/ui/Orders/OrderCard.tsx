import { memo, forwardRef, useState } from "react";
import { Clock, Calendar, MessageCircle, DollarSign, Heart } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useUser, useFavoritesOrders } from "@/hooks";
import type { OrderWithResponsesCount } from "@shared/types";

interface OrderCardProps {
    order: OrderWithResponsesCount;
}

const STATUS_CONFIG = {
    new: { label: "Новый", color: "bg-green-100 text-green-700", icon: "🆕" },
    "in-progress": { label: "В работе", color: "bg-blue-100 text-blue-700", icon: "⚡" },
    completed: { label: "Завершен", color: "bg-gray-100 text-gray-700", icon: "✅" },
};

export const OrderCard = memo(
    forwardRef<HTMLDivElement, OrderCardProps>(({ order }, ref) => {
        const location = useLocation();
        const { user: currentUser, isAuthenticated } = useUser();
        const { toggleLikeOrder, isLikedOrder, isPending } = useFavoritesOrders();
        const [isLikedUser, setIsFavoriteUser] = useState(isLikedOrder(order.id));
        const isOwnProfile = currentUser?.id === Number(order.clientId);

        const handleToggleFavorite = () => {
            toggleLikeOrder({ likedOrderId: order.id, isLiked: isLikedUser });
            setIsFavoriteUser(!isLikedUser);
        };

        return (
            <div
                ref={ref}
                className="bg-white/70 backdrop-blur-sm border border-gray-200 rounded-2xl p-6 hover:shadow-xl transition-all duration-300"
            >
                <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                            <span
                                className={`px-3 py-1 rounded-lg text-xs font-semibold ${STATUS_CONFIG[order.status].color}`}
                            >
                                {STATUS_CONFIG[order.status].icon}{" "}
                                {STATUS_CONFIG[order.status].label}
                            </span>
                            <span className="text-xs text-gray-500">
                                <Calendar size={12} className="inline mr-1" />
                                {new Date(order.createdAt).toLocaleDateString("ru-RU")}
                            </span>
                        </div>
                        {!isAuthenticated ? (
                            <Link
                                to="/auth"
                                state={{ background: location, redirectTo: `/orders/${order.id}` }}
                                className="text-xl font-bold text-gray-900 hover:text-indigo-600 transition-colors cursor-pointer"
                            >
                                {order.title}
                            </Link>
                        ) : (
                            <Link
                                to={`/orders/${order.id}`}
                                className="text-xl font-bold text-gray-900 hover:text-indigo-600 transition-colors cursor-pointer"
                            >
                                {order.title}
                            </Link>
                        )}
                    </div>
                    <div className="text-right ml-4">
                        <div className="text-2xl font-bold text-indigo-600">
                            {order.budgetMin.toLocaleString()} - {order.budgetMax.toLocaleString()}₽
                        </div>
                        <div className="text-xs text-gray-500">Бюджет проекта</div>
                    </div>
                </div>
                <p className="text-gray-700 mb-4 line-clamp-2">{order.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                    {order.skills.map((skill) => (
                        <span
                            key={skill}
                            className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-xs font-medium"
                        >
                            {skill}
                        </span>
                    ))}
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                            <Clock size={16} />
                            <span>{order.deadlineDays} дней</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <DollarSign size={16} />
                            <span>{order.category}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <MessageCircle size={16} />
                            <span>{order.responsesCount} откликов</span>
                        </div>
                        <div className="flex items-center gap-1">
                            ID: <span>#{order.id}</span>
                        </div>
                    </div>
                    <div className="flex gap-2 justify-center items-center">
                        {isAuthenticated && currentUser?.role === "freelancer" && (
                            <button
                                className={`${isLikedUser ? "text-rose-500 border-rose-300 bg-rose-50" : "text-gray-400 border-gray-200 bg-white"} cursor-pointer flex-shrink-0 w-9 h-9 flex items-center justify-center rounded-lg hover:scale-110 active:scale-95 transition-all duration-200`}
                                aria-label="В избранное"
                                onClick={handleToggleFavorite}
                            >
                                {isPending ? (
                                    <div className="border-2 border-gray-300 border-t-red-500 rounded-full animate-spin"></div>
                                ) : (
                                    <Heart
                                        size={16}
                                        className="hover:scale-110 active:scale-95 hover:animate-pulse"
                                    />
                                )}
                            </button>
                        )}
                        {!isAuthenticated ? (
                            <Link
                                to="/auth"
                                state={{
                                    background: location,
                                    redirectTo: `/messages/${order.clientId}`,
                                }}
                                className="px-6 py-2 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Откликнуться
                            </Link>
                        ) : order.status === "completed" || order.status === "in-progress" ? (
                            <button
                                className="opacity-50 px-6 py-2 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-colors cursor-not-allowed"
                                disabled
                            >
                                {order.status === "completed" ? "Завершен" : "В работе"}
                            </button>
                        ) : (
                            <Link
                                to={
                                    !isOwnProfile
                                        ? `/messages/${order.clientId}`
                                        : `/orders/${order.id}`
                                }
                                className="px-6 py-2 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isOwnProfile ? "Это ваш заказ" : "Откликнуться"}
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        );
    }),
);
