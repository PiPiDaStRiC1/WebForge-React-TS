import { memo } from 'react';
import {Clock, Calendar, MessageCircle, DollarSign} from 'lucide-react'
import type {Order} from '@/types';
import { Link } from 'react-router-dom';
import { forwardRef } from 'react';

interface OrderCardProps {
    order: Order;
}

const STATUS_CONFIG = {
    'new': { label: 'Новый', color: 'bg-green-100 text-green-700', icon: '🆕' },
    'in-progress': { label: 'В работе', color: 'bg-blue-100 text-blue-700', icon: '⚡' },
    'completed': { label: 'Завершен', color: 'bg-gray-100 text-gray-700', icon: '✅' },
};

export const OrderCard = memo(forwardRef<HTMLDivElement, OrderCardProps>(({order}, ref) => {

    return (
        <div
            ref={ref}
            className="bg-white/70 backdrop-blur-sm border border-gray-200 rounded-2xl p-6 hover:shadow-xl transition-all duration-300"
        >
            <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                        <span className={`px-3 py-1 rounded-lg text-xs font-semibold ${STATUS_CONFIG[order.status].color}`}>
                            {STATUS_CONFIG[order.status].icon} {STATUS_CONFIG[order.status].label}
                        </span>
                        <span className="text-xs text-gray-500">
                            <Calendar size={12} className="inline mr-1" />
                            {new Date(order.createdAt).toLocaleDateString('ru-RU')}
                        </span>
                    </div>
                    <Link to={`/orders/${order.id}`} className="text-xl font-bold text-gray-900 hover:text-indigo-600 transition-colors cursor-pointer">
                        {order.title}
                    </Link>
                </div>
                <div className="text-right ml-4">
                    <div className="text-2xl font-bold text-indigo-600">
                        {order.budgetMin.toLocaleString()} - {order.budgetMax.toLocaleString()}₽
                    </div>
                    <div className="text-xs text-gray-500">Бюджет проекта</div>
                </div>
            </div>
            <p className="text-gray-700 mb-4 line-clamp-2">
                {order.description}
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
                {order.skills.map(skill => (
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
                        <span>{order.deadline} дней</span>
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
                <button
                    type="button"
                    className="px-6 py-2 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={order.status === 'completed' || order.status === 'in-progress'}
                >
                    Откликнуться
                </button>
            </div>
        </div>
    )
}));