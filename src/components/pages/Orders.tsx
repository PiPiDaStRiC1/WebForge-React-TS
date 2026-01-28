import { useState, useMemo } from 'react';
import { Preloader, ErrorAlert } from '@/features';
import { useQuery } from '@tanstack/react-query';
import {useFilters} from '@/hooks'
import {AsideFilter, OrderCard} from '@/components/ui/Orders'
import { Briefcase, DollarSign, TrendingUp, Search } from 'lucide-react';
import {fetchAllOrders} from '@/lib/api/fetchAllOrders'
import {useOrdersSort} from '@/hooks';
import type {Order} from '@/types';
import {CATEGORIES} from '@/lib/constants/categories'

type SortOption = 'date-desc' | 'date-asc' | 'budget-desc' | 'budget-asc' | 'responses-desc';

export const Orders = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const {get, set} = useFilters();
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
                    <AsideFilter 
                        sortBy={sortBy} 
                        status={status}
                    />
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
                                                        <OrderCard 
                                                            key={order.id} 
                                                            order={order}
                                                            animDelay={index}
                                                        />
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