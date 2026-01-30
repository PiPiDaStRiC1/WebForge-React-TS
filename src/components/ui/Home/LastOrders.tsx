import { Link } from "react-router-dom";
import { ArrowRight } from 'lucide-react';
import { useQuery } from "@tanstack/react-query";
import { fetchLastOrders } from '@/lib/api/fetchLastOrders';
import type { Order } from '@/types';
import { HomeOrdersPreloader } from "@/components/common";

export const LastOrders = () => {

    const {data: lastOrders, isLoading} = useQuery<Order[]>({
        queryKey: ['orders', 'last'],
        queryFn: () => fetchLastOrders(3),
        staleTime: 5 * 60 * 1000,
    });

    if (!lastOrders || lastOrders.length === 0) {
        return null;
    }
    
    return (
        <div className="py-16">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Последние заказы</h2>
                    <p className="text-gray-600">Актуальные предложения от заказчиков</p>
                </div>
                <Link to="/orders" className="flex items-center gap-2 text-indigo-600 font-semibold hover:gap-3 transition-all">
                    Все заказы <ArrowRight size={20} />
                </Link>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {isLoading ? (
                    <>
                    {Array.from({length: 3}, (_, i) => (
                        <HomeOrdersPreloader key={i} />
                    ))}
                    </>
                ) : (
                    <>
                        {lastOrders.map((order) => (
                            <Link 
                                to={`/orders/${order.id}`} 
                                key={order.id}
                            >
                                <div className="bg-white p-6 rounded-2xl border border-gray-200 hover:shadow-lg transition-shadow">
                                    <div className="flex items-start justify-between mb-4">
                                        <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-lg">
                                            {order.category}
                                        </span>
                                        <span className="text-sm text-gray-500">
                                            {new Date(order.createdAt).toLocaleDateString('ru-RU')}
                                        </span>
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                                        {order.title}
                                    </h3>
                                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                                        {order.description}
                                    </p>
                                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                        <div className="text-xl font-bold text-gray-900">{order.budgetMax.toLocaleString()}₽</div>
                                    </div>
                                </div>
                            </Link>
                            ))}
                    </>
                )}
            </div>
        </div>
    )
}