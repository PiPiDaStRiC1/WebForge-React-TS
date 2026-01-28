import { useQuery } from '@tanstack/react-query';
import { useParams, Link } from 'react-router-dom';
import { Calendar, Clock, DollarSign, MessageCircle, Briefcase, Star, MapPin, BadgeCheck, TrendingUp } from 'lucide-react';
import { fetchOneOrder } from '@/lib/api/fetchOneOrder';
import { fetchOneUser } from '@/lib/api/fetchOneUser';
import { ErrorAlert } from '@/features';
import type { Order, Client, Freelancer } from '@/types';
import {AvatarPreloader} from '@/components/common'
import { useState } from 'react';

const STATUS_CONFIG = {
    'new': { label: 'Новый', color: 'bg-green-100 text-green-700 border-green-200', icon: '🆕' },
    'in-progress': { label: 'В работе', color: 'bg-blue-100 text-blue-700 border-blue-200', icon: '⚡' },
    'completed': { label: 'Завершен', color: 'bg-gray-100 text-gray-700 border-gray-200', icon: '✅' },
};

const isClient = (user: Client | Freelancer | undefined): user is Client => {
    return user?.role === 'client';
};

export const OrderInfo = () => {
    const { orderId } = useParams<{ orderId: string }>();
    const [isLoadingAvatar, setIsLoadingAvatar] = useState(true);
    
    const { data: order, isLoading, isError } = useQuery<Order | undefined>({
        queryKey: [`order${orderId}`],
        queryFn: () => fetchOneOrder(Number(orderId)),
        staleTime: 30 * 60 * 1000,
    });

    const { data: user } = useQuery<Client | Freelancer | undefined>({
        queryKey: [`user${order?.clientId}`],
        queryFn: () => fetchOneUser(order!.clientId),
        enabled: !!order?.clientId,
        staleTime: 30 * 60 * 1000,
    });

    const client = isClient(user) ? user : undefined;

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-gray-600">Загрузка заказа...</p>
                </div>
            </div>
        );
    }

    if (isError || !order) {
        return <ErrorAlert message="Заказ не найден" instructions="Возможно, он был удален или не существует" />;
    }

    const statusConfig = STATUS_CONFIG[order.status];

    return (
        <div className="min-h-screen pb-10">
            <section className="relative">
                <div className="absolute inset-0 h-64 via-purple-50">
                    <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-200 rounded-full blur-3xl opacity-40" />
                    <div className="absolute -bottom-32 -left-32 w-[28rem] h-[28rem] bg-purple-200 rounded-full blur-3xl opacity-40" />
                </div>

                <div className="relative pt-20 pb-32">
                    <div className="max-w-4xl">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-indigo-100 text-sm font-medium text-indigo-600 mb-4">
                            <Briefcase size={16} />
                            Детали заказа
                        </div>

                        <div className="flex items-start gap-3 mb-4">
                            <span className={`px-4 py-1.5 rounded-xl text-sm font-semibold border ${statusConfig.color}`}>
                                {statusConfig.icon} {statusConfig.label}
                            </span>
                            <span className="px-4 py-1.5 rounded-xl text-sm font-medium bg-white/80 backdrop-blur-sm border border-gray-200 text-gray-700">
                                ID: #{order.id}
                            </span>
                        </div>

                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            {order.title}
                        </h1>

                        <div className="flex flex-wrap items-center gap-4 text-gray-600">
                            <div className="flex items-center gap-2">
                                <Calendar size={18} />
                                <span className="text-sm">Опубликовано {new Date(order.createdAt).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <MessageCircle size={18} />
                                <span className="text-sm">{order.responsesCount} откликов</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="relative -mt-20">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <aside className="lg:col-span-1 space-y-6">
                        <div className="bg-white/70 backdrop-blur-sm border border-gray-200 rounded-2xl p-6 shadow-xl">
                            <h2 className="text-lg font-bold text-gray-900 mb-4">Условия</h2>
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center flex-shrink-0">
                                        <DollarSign size={24} className="text-green-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">Бюджет</p>
                                        <p className="text-xl font-bold text-gray-900">
                                            ₽{order.budgetMin.toLocaleString()} - ₽{order.budgetMax.toLocaleString()}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0">
                                        <Clock size={24} className="text-blue-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">Срок выполнения</p>
                                        <p className="text-xl font-bold text-gray-900">{order.deadline} дней</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center flex-shrink-0">
                                        <TrendingUp size={24} className="text-purple-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">Откликов</p>
                                        <p className="text-xl font-bold text-gray-900">{order.responsesCount}</p>
                                    </div>
                                </div>
                            </div>

                            {order.status === 'new' && (
                                <button
                                    type="button"
                                    className="w-full mt-6 h-12 flex items-center justify-center gap-2 bg-indigo-600 text-white rounded-xl font-semibold shadow-lg shadow-indigo-500/25 hover:bg-indigo-700 hover:shadow-indigo-500/35 transition-all"
                                >
                                    <MessageCircle size={20} />
                                    Откликнуться на заказ
                                </button>
                            )}
                        </div>

                        {client && (
                            <div className="bg-white/70 backdrop-blur-sm border border-gray-200 rounded-2xl p-6 shadow-xl">
                                <h2 className="text-lg font-bold text-gray-900 mb-4">Заказчик</h2>
                                <Link to={`/profile/${client.id}`} className="block group">
                                    <div className="flex items-start gap-3">
                                        <div className="relative flex-shrink-0">
                                            {isLoadingAvatar && <AvatarPreloader />}
                                            <img
                                                src={client.picture.medium}
                                                alt={client.name}
                                                className="w-16 h-16 rounded-xl object-cover border-2 border-white shadow-md group-hover:scale-105 transition-transform"
                                                onLoad={() => setIsLoadingAvatar(false)}
                                            />
                                            {!isLoadingAvatar && client.status === 'verified' && (
                                                <span className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center shadow-md">
                                                    <BadgeCheck size={14} className="text-white" />
                                                </span>
                                            )}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
                                                {client.name}
                                            </h3>
                                            <p className="text-sm text-gray-600">@{client.login}</p>
                                            <div className="mt-2 flex items-center gap-3 text-xs text-gray-600">
                                                <div className="flex items-center gap-1">
                                                    <Star size={12} className="text-amber-400 fill-amber-400" />
                                                    <span>{client.rating.toFixed(1)}</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <MapPin size={12} />
                                                    <span>{client.location}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        )}
                    </aside>

                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white/70 backdrop-blur-sm border border-gray-200 rounded-2xl p-6 shadow-xl">
                            <h2 className="text-lg font-bold text-gray-900 mb-4">Описание задачи</h2>
                            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                                {order.description}
                            </p>
                        </div>

                        <div className="bg-white/70 backdrop-blur-sm border border-gray-200 rounded-2xl p-6 shadow-xl">
                            <h2 className="text-lg font-bold text-gray-900 mb-4">Требуемые навыки</h2>
                            <div className="flex flex-wrap gap-2">
                                {order.skills.map((skill) => (
                                    <span
                                        key={skill}
                                        className="px-4 py-2 text-sm font-medium bg-indigo-50 text-indigo-700 rounded-xl border border-indigo-100 hover:bg-indigo-100 transition-colors"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="bg-white/70 backdrop-blur-sm border border-gray-200 rounded-2xl p-6 shadow-xl">
                            <h2 className="text-lg font-bold text-gray-900 mb-4">Отклики ({order.responsesCount})</h2>
                            <div className="text-center py-12">
                                <div className="text-5xl mb-4">💬</div>
                                <p className="text-gray-600">Откликов пока нет</p>
                                <p className="text-sm text-gray-500 mt-1">Станьте первым исполнителем</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}