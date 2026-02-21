import { Calendar, Clock } from "lucide-react";
import type { Order } from "@/types";
import { Link, useLocation } from "react-router-dom";

interface OrderCardSmallProps {
    order: Order;
    isAuthenticated: boolean;
}

export const OrderCardSmall = ({ order, isAuthenticated }: OrderCardSmallProps) => {
    const location = useLocation();

    return (
        <Link
            to={!isAuthenticated ? "/auth" : `/orders/${order.id}`}
            state={
                !isAuthenticated ? { background: location, redirectTo: `/orders/${order.id}` } : {}
            }
        >
            <div className="cursor-pointer bg-white/60 backdrop-blur-sm border border-gray-200 rounded-xl p-4 hover:shadow-lg hover:border-indigo-200 transition-all duration-300">
                <div className="flex items-start justify-between gap-4 mb-3">
                    <div className="flex-1 min-w-0">
                        <h3 className="text-base font-bold text-gray-900 mb-1 line-clamp-1">
                            {order.title}
                        </h3>
                        <p className="text-sm text-gray-600 line-clamp-2">{order.description}</p>
                    </div>
                    <div className="flex-shrink-0 text-right">
                        <div className="text-lg font-bold text-indigo-600">
                            ₽{order.budgetMin.toLocaleString()} - ₽
                            {order.budgetMax.toLocaleString()}
                        </div>
                        <div className="text-xs text-gray-500">Бюджет</div>
                    </div>
                </div>

                <div className="flex flex-wrap gap-1.5 mb-3">
                    {order.skills.map((skill) => (
                        <span
                            key={skill}
                            className="px-2 py-0.5 text-xs font-medium bg-indigo-50 text-indigo-700 rounded border border-indigo-100"
                        >
                            {skill}
                        </span>
                    ))}
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <div className="flex items-center gap-3 text-xs text-gray-600">
                        <div className="flex items-center gap-1">
                            <Clock size={14} />
                            <span>{order.deadline} дн.</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Calendar size={14} />
                            <span>
                                {new Date(order.createdAt).toLocaleDateString("ru-RU", {
                                    day: "numeric",
                                    month: "short",
                                })}
                            </span>
                        </div>
                    </div>
                    <span className="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-lg text-xs font-semibold border border-emerald-100">
                        Завершен
                    </span>
                </div>
            </div>
        </Link>
    );
};
