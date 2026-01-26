import { useState, useMemo, useEffect } from 'react';
import { Trophy, Medal, Star, Award, Users, TrendingUp, Zap } from 'lucide-react';
import type {Freelancer} from '@/types';
import {fetchAllFreelancers} from '@/lib/api/fetchAllFreelancers';
import {RATING_FILTER, USERS_IN_TOP} from '@/lib/constants/index'

const CATEGORIES = [
    { id: 'all', name: 'Все категории', icon: Users },
    { id: 'web-dev', name: 'Веб-разработка', icon: TrendingUp },
    { id: 'design', name: 'Дизайн', icon: Award },
    { id: 'mobile', name: 'Мобильная разработка', icon: Zap },
    { id: 'marketing', name: 'Маркетинг', icon: Trophy },
    { id: 'data', name: 'Аналитика', icon: Medal },
];

const PODIUM_MEDALS = ['🥇', '🥈', '🥉'];
const PODIUM_COLORS = [
    'from-yellow-400 to-amber-500',
    'from-gray-300 to-gray-400',
    'from-orange-400 to-amber-600',
];

export const TopPerformers = () => {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [topPerformersData, setTopPerformersData] = useState<Array<Freelancer>>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let isCancelled = false;
        
        const load = async () => {
            setIsLoading(true);

            try {
                const data: Freelancer[] = await fetchAllFreelancers();

                if (!isCancelled) {
                    const filteredData = data.filter(p => p.rating >= RATING_FILTER).sort((a, b) => b.rating - a.rating);
                    setTopPerformersData(filteredData);
                }
            } catch (error) {
                if (error instanceof Error) {
                    console.log(error.message)
                }
            } finally {
                setIsLoading(false)
            }
        }
        load();

        return () => {
            isCancelled = true
        }
    }, [])

    const filteredPerformers = useMemo(() => {
        if (selectedCategory === 'all') return topPerformersData.slice(0, USERS_IN_TOP);
        return topPerformersData.filter(p => p.category === selectedCategory).slice(0, USERS_IN_TOP);
    }, [selectedCategory, topPerformersData]);

    const topThree = filteredPerformers.slice(0, 3);
    const restPerformers = filteredPerformers.slice(3);

    const stats = {
        avgRating: (filteredPerformers.reduce((sum, p) => sum + p.rating, 0) / filteredPerformers.length).toFixed(2),
        totalOrders: filteredPerformers.reduce((sum, p) => sum + p.completedOrders, 0),
        totalPerformers: filteredPerformers.length,
    };

    return (
        <div className="min-h-screen">
            <section className="relative">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute -top-24 -right-24 w-96 h-96 bg-yellow-100 rounded-full blur-3xl opacity-40" />
                    <div className="absolute -bottom-32 -left-32 w-[28rem] h-[28rem] bg-amber-100 rounded-full blur-3xl opacity-40" />
                </div>

                <div className="relative pt-14 pb-10">
                    <div className="text-center max-w-3xl mx-auto">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-yellow-200 text-sm font-medium text-yellow-700 mb-5">
                            <Trophy size={16} className="text-yellow-600" />
                            Лучшие специалисты платформы
                        </div>

                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-gray-900 mb-4">
                            Топ исполнителей
                        </h1>
                        <p className="text-lg text-gray-600">
                            Проверенные специалисты с высоким рейтингом и сотнями выполненных заказов
                        </p>
                    </div>

                    <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
                        <div className="bg-white/70 backdrop-blur-sm border border-gray-200 rounded-2xl p-6 text-center">
                            <Star className="mx-auto mb-2 text-yellow-500" size={32} />
                            {isLoading ? (
                                <div className='animate-pulse flex justify-center items-center'>
                                    <div className="h-9 bg-gray-200 rounded w-1/3" />
                                </div>
                            ) : (
                                <div className="text-3xl font-bold text-gray-900">{stats.avgRating}</div>
                            )}
                            <div className="text-sm text-gray-600">Средний рейтинг</div>
                        </div>
                        <div className="bg-white/70 backdrop-blur-sm border border-gray-200 rounded-2xl p-6 text-center">
                            <Award className="mx-auto mb-2 text-indigo-500" size={32} />
                            {isLoading ? (
                                <div className='animate-pulse flex justify-center items-center'>
                                    <div className="h-9 bg-gray-200 rounded w-1/3" />
                                </div>
                            ) : (
                                <div className="text-3xl font-bold text-gray-900">{stats.totalOrders}</div>
                            )}
                            <div className="text-sm text-gray-600">Выполнено заказов</div>
                        </div>
                        <div className="bg-white/70 backdrop-blur-sm border border-gray-200 rounded-2xl p-6 text-center">
                            <Users className="mx-auto mb-2 text-green-500" size={32} />
                            {isLoading ? (
                                <div className='animate-pulse flex justify-center items-center'>
                                    <div className="h-9 bg-gray-200 rounded w-1/3" />
                                </div>
                            ) : (
                                <div className="text-3xl font-bold text-gray-900">{stats.totalPerformers}</div>
                            )}
                            <div className="text-sm text-gray-600">Топ исполнителей</div>
                        </div>
                    </div>

                    <div className="mt-8 flex flex-wrap justify-center gap-2">
                        {CATEGORIES.map((cat) => {
                            const Icon = cat.icon;
                            return (
                                <button
                                    key={cat.id}
                                    type="button"
                                    onClick={() => setSelectedCategory(cat.id)}
                                    className={`cursor-pointer inline-flex items-center gap-2 px-4 py-2 rounded-xl font-semibold text-sm transition-all ${
                                        selectedCategory === cat.id
                                            ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/25'
                                            : 'bg-white/70 backdrop-blur-sm border border-gray-200 text-gray-700 hover:border-indigo-200 hover:text-indigo-700'
                                    }`}
                                >
                                    <Icon size={16} />
                                    {cat.name}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </section>

            <section className="py-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">🏆 Тройка лидеров</h2>
                <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                    {topThree.map((performer, index) => (
                        <div
                            key={performer.id}
                            className={`cursor-pointer relative group animate-slide-in-left ${index === 0 ? 'md:col-start-2 md:row-start-1' : ''}`}
                            style={{ animationDelay: `${index * 200}ms` }}
                        >
                            <div className={`bg-gradient-to-br ${PODIUM_COLORS[index]} rounded-2xl p-6 text-white shadow-2xl hover:-translate-y-2 transition-all duration-300`}>
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-5xl">
                                    {PODIUM_MEDALS[index]}
                                </div>

                                <div className="mt-6 mb-4">
                                    <img
                                        src={performer.picture.medium}
                                        alt={performer.name}
                                        className="w-24 h-24 rounded-full mx-auto border-4 border-white shadow-lg"
                                    />
                                </div>

                                <div className="text-center">
                                    <h3 className="text-xl font-bold mb-1">{performer.name}</h3>
                                    <p className="text-sm opacity-90 mb-3">@{performer.login}</p>
                                    
                                    <div className="flex items-center justify-center gap-1 mb-2">
                                        <Star size={16} fill="white" />
                                        <span className="font-bold">{performer.rating}</span>
                                    </div>

                                    <div className="text-sm opacity-90">
                                        {performer.completedOrders} заказов
                                    </div>

                                    <div className="mt-4 flex flex-wrap gap-1 justify-center">
                                        {performer.skills.map(skill => (
                                            <span
                                                key={skill}
                                                className="px-2 py-1 bg-white/20 backdrop-blur-sm rounded-lg text-xs"
                                            >
                                                {skill}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="mt-4 pt-4 border-t border-white/20">
                                        <span className="text-2xl font-bold">{performer.pricePerHour}₽</span>
                                        <span className="text-sm opacity-90">/час</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {restPerformers.length > 0 && (
                <section className="py-10">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Топ 4-{filteredPerformers.length}</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {restPerformers.map((performer, index) => (
                            <div
                                key={performer.id}
                                className="cursor-pointer bg-white/70 backdrop-blur-sm border border-gray-200 rounded-2xl p-6 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 animate-slide-in-left"
                                style={{ animationDelay: `${600 + (index * 100)}ms` }}
                            >
                                <div className="mb-4">
                                    <img
                                        src={performer.picture.medium}
                                        alt={performer.name}
                                        className="w-16 h-16 rounded-full mx-auto"
                                    />
                                </div>
                                <div className="text-center">
                                    <h3 className="font-bold text-gray-900 mb-1">{performer.name}</h3>
                                    <p className="text-sm text-gray-600 mb-3">{performer.login}</p>
                                    
                                    <div className="flex items-center justify-center gap-1 text-yellow-500 mb-2">
                                        <Star size={14} fill="currentColor" />
                                        <span className="text-sm font-semibold text-gray-900">{performer.rating}</span>
                                    </div>

                                    <div className="text-xs text-gray-600 mb-3">
                                        {performer.completedOrders} заказов
                                    </div>
                                    <div className="flex flex-wrap gap-1 justify-center mb-3">
                                        {performer.skills.map(skill => (
                                            <span
                                                key={skill}
                                                className="px-2 py-1 bg-gray-100 rounded-lg text-xs text-gray-700"
                                            >
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                    <div className="text-lg font-bold text-gray-900">
                                        {performer.pricePerHour}₽<span className="text-sm font-normal text-gray-600">/час</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}
            {filteredPerformers.length === 0 && (
                <div className="text-center py-20">
                    <div className="text-6xl mb-4">🔍</div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Нет исполнителей в этой категории</h3>
                    <p className="text-gray-600">Попробуйте выбрать другую категорию</p>
                </div>
            )}
        </div>
    );
}