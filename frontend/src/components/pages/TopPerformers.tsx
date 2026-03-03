import { useState, useMemo } from "react";
import { Trophy, Medal, Star, Award, Users, TrendingUp, Zap } from "lucide-react";
import { fetchAllFreelancers } from "@/lib/api";
import { USERS_IN_TOP } from "@/lib/constants/index";
import { ErrorAlert } from "@/components/common";
import { useQuery } from "@tanstack/react-query";
import { TopUserCard, OtherUserCard } from "@/components/ui";
import type { FreelancersData } from "@/types";

const CATEGORIES = [
    { id: "all", name: "Все категории", icon: Users },
    { id: "web-dev", name: "Веб-разработка", icon: TrendingUp },
    { id: "design", name: "Дизайн", icon: Award },
    { id: "mobile", name: "Мобильная разработка", icon: Zap },
    { id: "marketing", name: "Маркетинг", icon: Trophy },
    { id: "data", name: "Аналитика", icon: Medal },
];

const TopPerformers = () => {
    const { data, isLoading } = useQuery<FreelancersData>({
        queryKey: ["freelancers", "top-performers"],
        queryFn: fetchAllFreelancers,
    });
    const [selectedCategory, setSelectedCategory] = useState("all");

    const filteredPerformers = useMemo(() => {
        if (!data) return [];

        if (selectedCategory === "all")
            return data.allIds.slice(0, USERS_IN_TOP).map((id) => data.freelancersById[id]);
        return data.allIds
            .filter((p) => data.freelancersById[p].category === selectedCategory)
            .slice(0, USERS_IN_TOP)
            .map((id) => data.freelancersById[id]);
    }, [selectedCategory, data]);

    const topThree = filteredPerformers.slice(0, 3);
    const restPerformers = filteredPerformers.slice(3);

    if (!data && !isLoading) {
        return <ErrorAlert />;
    }

    const stats = {
        avgRating: (
            filteredPerformers.reduce((sum, p) => sum + p.rating, 0) / filteredPerformers.length
        ).toFixed(2),
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
                            Проверенные специалисты с высоким рейтингом и сотнями выполненных
                            заказов
                        </p>
                    </div>

                    <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
                        <div className="bg-white/70 backdrop-blur-sm border border-gray-200 rounded-2xl p-6 text-center">
                            <Star className="mx-auto mb-2 text-yellow-500" size={32} />
                            {isLoading ? (
                                <div className="animate-pulse flex justify-center items-center">
                                    <div className="h-9 bg-gray-200 rounded w-1/3" />
                                </div>
                            ) : (
                                <div className="text-3xl font-bold text-gray-900">
                                    {stats.avgRating}
                                </div>
                            )}
                            <div className="text-sm text-gray-600">Средний рейтинг</div>
                        </div>
                        <div className="bg-white/70 backdrop-blur-sm border border-gray-200 rounded-2xl p-6 text-center">
                            <Award className="mx-auto mb-2 text-indigo-500" size={32} />
                            {isLoading ? (
                                <div className="animate-pulse flex justify-center items-center">
                                    <div className="h-9 bg-gray-200 rounded w-1/3" />
                                </div>
                            ) : (
                                <div className="text-3xl font-bold text-gray-900">
                                    {stats.totalOrders}
                                </div>
                            )}
                            <div className="text-sm text-gray-600">Выполнено заказов</div>
                        </div>
                        <div className="bg-white/70 backdrop-blur-sm border border-gray-200 rounded-2xl p-6 text-center">
                            <Users className="mx-auto mb-2 text-green-500" size={32} />
                            {isLoading ? (
                                <div className="animate-pulse flex justify-center items-center">
                                    <div className="h-9 bg-gray-200 rounded w-1/3" />
                                </div>
                            ) : (
                                <div className="text-3xl font-bold text-gray-900">
                                    {stats.totalPerformers}
                                </div>
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
                                            ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/25"
                                            : "bg-white/70 backdrop-blur-sm border border-gray-200 text-gray-700 hover:border-indigo-200 hover:text-indigo-700"
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
                <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                    🏆 Тройка лидеров
                </h2>
                <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                    {topThree.map((performer, index) => (
                        <TopUserCard key={performer.id} performer={performer} index={index} />
                    ))}
                </div>
            </section>

            {restPerformers.length > 0 && (
                <section className="py-10">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">
                        Топ 4-{filteredPerformers.length}
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {restPerformers.map((performer, index) => (
                            <OtherUserCard key={performer.id} performer={performer} index={index} />
                        ))}
                    </div>
                </section>
            )}
            {filteredPerformers.length === 0 && (
                <div className="text-center py-20">
                    <div className="text-6xl mb-4">🔍</div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                        Нет исполнителей в этой категории
                    </h3>
                    <p className="text-gray-600">Попробуйте выбрать другую категорию</p>
                </div>
            )}
        </div>
    );
};

export default TopPerformers;
