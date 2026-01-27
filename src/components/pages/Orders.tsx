import { useState, useMemo } from 'react';
import { Preloader, ErrorAlert } from '@/features';
import { useQuery } from '@tanstack/react-query';
import {useFilters} from '@/hooks'
import { Briefcase, DollarSign, Clock, Users, TrendingUp, Filter, Search, Calendar, MessageCircle } from 'lucide-react';
import {fetchAllOrders} from '@/lib/api/fetchAllOrders'
import {useOrdersSort} from '@/hooks';
import type {Order} from '@/types';
import {CATEGORIES} from '@/lib/constants/categories'


const STATUS_CONFIG = {
    'new': { label: 'Новый', color: 'bg-green-100 text-green-700', icon: '🆕' },
    'in-progress': { label: 'В работе', color: 'bg-blue-100 text-blue-700', icon: '⚡' },
    'completed': { label: 'Завершен', color: 'bg-gray-100 text-gray-700', icon: '✅' },
};

type SortOption = 'date-desc' | 'date-asc' | 'budget-desc' | 'budget-asc' | 'responses-desc';

export const Orders = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const {get, set, toggle, resetFilters} = useFilters();
    const {data, isLoading, isError} = useQuery<Array<Order>>({
        queryKey: ['orders'],
        queryFn: fetchAllOrders,
        staleTime: 5 * 60 * 1000, 
    });

    const sortBy = get<SortOption>('sortBy', v => v as SortOption, 'date-desc');
    const status = get('status', v => v.split(','), []);
    const category = get('category', String, 'web-dev');
    
    const filteredOrders = useMemo(() => {
        if (!data) return [];

        return data.filter(order => {
            const matchesSearch = 
                order.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                order.description.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = category === 'all' || order.category === category;
            const matchesStatus = status.length === 0 || status.includes(order.status);
            
            return matchesSearch && matchesCategory && matchesStatus;
        });

    }, [searchQuery, category, status, data]);

    const sortedData = useOrdersSort(filteredOrders, sortBy);

    const stats = {
        total: sortedData.length,
        avgBudget: Math.round(sortedData.reduce((sum, o) => sum + (o.budgetMin + o.budgetMax) / 2, 0) / sortedData.length) || 0,
        newOrders: sortedData.filter(o => o.status === 'new').length,
    };


    return (
        <div className="min-h-screen">
            <section className="relative">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-100 rounded-full blur-3xl opacity-40" />
                    <div className="absolute -bottom-32 -left-32 w-[28rem] h-[28rem] bg-violet-100 rounded-full blur-3xl opacity-40" />
                </div>

                <div className="relative pt-14 pb-10">
                    <div className="text-center max-w-3xl mx-auto">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-indigo-100 text-sm font-medium text-indigo-600 mb-5">
                            <Briefcase size={16} className="text-indigo-500" />
                            Найдите подходящий проект
                        </div>

                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-gray-900 mb-4">
                            Доступные заказы
                        </h1>
                        <p className="text-lg text-gray-600">
                            Откликайтесь на проекты и начинайте зарабатывать уже сегодня
                        </p>
                        <div className="mt-8 max-w-2xl mx-auto">
                            <div className="relative">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Поиск по заказам..."
                                    className="w-full h-14 pl-12 pr-4 bg-white/70 backdrop-blur-sm border border-gray-200 rounded-xl outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all shadow-lg"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
                        <div className="bg-white/70 backdrop-blur-sm border border-gray-200 rounded-2xl p-6 text-center">
                            <Briefcase className="mx-auto mb-2 text-indigo-500" size={32} />
                            <div className="text-3xl font-bold text-gray-900">{stats.total}</div>
                            <div className="text-sm text-gray-600">Всего заказов</div>
                        </div>
                        <div className="bg-white/70 backdrop-blur-sm border border-gray-200 rounded-2xl p-6 text-center">
                            <DollarSign className="mx-auto mb-2 text-green-500" size={32} />
                            <div className="text-3xl font-bold text-gray-900">{stats.avgBudget.toLocaleString()}₽</div>
                            <div className="text-sm text-gray-600">Средний бюджет</div>
                        </div>
                        <div className="bg-white/70 backdrop-blur-sm border border-gray-200 rounded-2xl p-6 text-center">
                            <TrendingUp className="mx-auto mb-2 text-blue-500" size={32} />
                            <div className="text-3xl font-bold text-gray-900">{stats.newOrders}</div>
                            <div className="text-sm text-gray-600">Новых заказов</div>
                        </div>
                    </div>
                    <div className="mt-8 flex flex-wrap justify-center gap-2">
                        {CATEGORIES.map((cat) => (
                            <button
                                key={cat.id}
                                type="button"
                                onClick={() => set('category', cat.id)}
                                className={`cursor-pointer px-4 py-2 rounded-xl font-semibold text-sm transition-all ${
                                    category === cat.id
                                        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/25'
                                        : 'bg-white/70 backdrop-blur-sm border border-gray-200 text-gray-700 hover:border-indigo-200 hover:text-indigo-700'
                                }`}
                            >
                                {cat.name}
                            </button>
                        ))}
                    </div>
                </div>
            </section>
            <section className="py-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    <aside className="lg:col-span-3">
                        <div className="bg-white/70 top-26 backdrop-blur-sm border border-gray-200 rounded-2xl p-6 sticky top-4">
                            <div className="flex items-center gap-2 mb-6">
                                <Filter size={20} className="text-indigo-600" />
                                <h3 className="text-lg font-bold text-gray-900">Фильтры</h3>
                            </div>
                            <div className="mb-6">
                                <h4 className="text-sm font-semibold text-gray-700 mb-3">Статус</h4>
                                <div className="space-y-2">
                                    {Object.entries(STATUS_CONFIG).map(([key, config]) => (
                                        <label key={key} className="flex items-center gap-2 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={status.includes(key)}
                                                onChange={() => toggle('status', key)}
                                                className="w-4 h-4 text-indigo-600 rounded"
                                            />
                                            <span className="text-sm text-gray-700">{config.label}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                            <div className="mb-6">
                                <h4 className="text-sm font-semibold text-gray-700 mb-3">Сортировка</h4>
                                <select
                                    value={sortBy}
                                    onChange={(e) => set('sortBy', e.target.value)}
                                    className="cursor-pointer w-full h-10 px-3 bg-white border border-gray-200 rounded-lg text-sm"
                                >
                                    <option value="date-desc">Сначала новые</option>
                                    <option value="date-asc">Сначала старые</option>
                                    <option value="budget-desc">Дорогие первыми</option>
                                    <option value="budget-asc">Дешевые первыми</option>
                                    <option value="responses-desc">Популярные</option>
                                </select>
                            </div>

                            <button
                                type="button"
                                onClick={resetFilters}
                                className="cursor-pointer w-full py-2 text-sm text-indigo-600 hover:text-indigo-700 font-semibold"
                            >
                                Сбросить фильтры
                            </button>
                        </div>
                    </aside>
                    <div className="lg:col-span-9">
                        <div className="mb-4">
                            <p className="text-sm text-gray-600">
                                Найдено <span className="font-semibold text-gray-900">{sortedData.length}</span> заказов
                            </p>
                        </div>
                        {isLoading ? 
                            <Preloader /> :
                                isError ? 
                                    <ErrorAlert /> :
                                        <>
                                            {sortedData.length === 0 ? (
                                                <div className="text-center py-20">
                                                    <div className="text-6xl mb-4">📋</div>
                                                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Заказы не найдены</h3>
                                                    <p className="text-gray-600">Попробуйте изменить фильтры или поисковый запрос</p>
                                                </div>
                                            ) : (
                                                <div className="space-y-4">
                                                    {sortedData.map((order, index) => (
                                                        <div
                                                            key={order.id}
                                                            className="bg-white/70 backdrop-blur-sm border border-gray-200 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 animate-slide-in-left"
                                                            style={{ animationDelay: `${index * 50}ms` }}
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
                                                                    <h3 className="text-xl font-bold text-gray-900 hover:text-indigo-600 transition-colors cursor-pointer">
                                                                        {order.title}
                                                                    </h3>
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
                                                                        <MessageCircle size={16} />
                                                                        <span>{order.responsesCount} откликов</span>
                                                                    </div>
                                                                    <div className="flex items-center gap-1">
                                                                        <Users size={16} />
                                                                        <span>{order.clientName}</span>
                                                                    </div>
                                                                </div>
                                                                <button
                                                                    type="button"
                                                                    className="px-6 py-2 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                                                    disabled={order.status === 'completed'}
                                                                >
                                                                    Откликнуться
                                                                </button>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </>
                        }
                    </div>
                </div>
            </section>
        </div>
    );
}