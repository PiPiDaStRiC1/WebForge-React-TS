import { Link } from "react-router-dom";
import type { Order } from "@/types";

interface SearchCardProps {
    order: Order;
    setIsSearchOpen: (isOpen: boolean) => void;
    setSearchQuery: (query: string) => void;
}

export const SearchCard = ({ order, setIsSearchOpen, setSearchQuery }: SearchCardProps) => {
    return (
        <Link
            to={`/orders/${order.id}`}
            onClick={() => {
                setIsSearchOpen(false);
                setSearchQuery("");
            }}
            className="block p-3 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0"
        >
            <div className="flex items-start gap-3">
                <div className="flex-1 min-w-0">
                    <h4
                        className={`${order.status === "in-progress" || order.status === "completed" ? "opacity-50" : ""} text-sm font-semibold text-gray-900 mb-1 line-clamp-1`}
                    >
                        {order.title}
                    </h4>
                    <p className="text-xs text-gray-600 mb-2 line-clamp-2">{order.description}</p>
                    <div className="flex items-center gap-2 flex-wrap">
                        <span className="px-2 py-0.5 bg-indigo-50 text-indigo-600 text-xs font-medium rounded">
                            {order.category}
                        </span>
                        <span className="text-xs text-gray-500">
                            {new Date(order.createdAt).toLocaleDateString("ru")}
                        </span>
                    </div>
                </div>
                <div className="text-right flex-shrink-0">
                    <p className="text-sm font-bold text-gray-900">
                        {order.budgetMax.toLocaleString()} ₽
                    </p>
                </div>
            </div>
        </Link>
    );
};
