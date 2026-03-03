import { Link } from 'react-router-dom';
import { Users, DollarSign, Zap } from 'lucide-react';
import { CATEGORIES } from '@/lib/constants/categories';


export const Categories = () => {

    return (
        <div>
            <section className="relative">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-100 rounded-full blur-3xl opacity-40" />
                    <div className="absolute -bottom-32 -left-32 w-[28rem] h-[28rem] bg-purple-100 rounded-full blur-3xl opacity-40" />
                </div>

                <div className="relative pt-14 pb-10">
                    <div className="max-w-3xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-indigo-100 text-sm font-medium text-indigo-600 mb-5">
                            <Zap size={16} className="text-indigo-500" />
                            6+ направлений для вашего бизнеса
                        </div>

                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-gray-900">
                            Все категории услуг
                        </h1>
                        <p className="mt-4 text-lg text-gray-600">
                            Найдите нужного специалиста в любом направлении разработки и дизайна
                        </p>
                    </div>
                </div>
            </section>

            <section>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-6">
                    {CATEGORIES.map((category) => {
                        const Icon = category.icon;
                        return (
                            <Link
                                key={category.id}
                                to={`/performers?category=${category.id}`}
                                className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br ${category.gradient} p-6 hover:-translate-y-2 hover:shadow-2xl transition-all duration-300`}
                            >
                                {category.trending && (
                                    <div className="absolute top-4 right-4">
                                        <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-bold text-white flex items-center gap-1">
                                            🔥 Популярно
                                        </span>
                                    </div>
                                )}
                                <div className="absolute inset-0 opacity-10">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full -translate-y-16 translate-x-16" />
                                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full translate-y-12 -translate-x-12" />
                                </div>

                                <div className="relative">
                                    <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                                        <Icon size={32} className="text-white" />
                                    </div>

                                    <h3 className="text-xl font-bold text-white mb-3">{category.name}</h3>

                                    <div className="flex flex-col gap-2 text-white/90 text-sm mb-4">
                                        <div className="flex items-center gap-2">
                                            <Users size={16} />
                                            <span>{category.freelancers}+ специалистов</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <DollarSign size={16} />
                                            <span>от {category.avgPrice}₽/час</span>
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 overflow-hidden">
                                        {category.subcategories.map(sub => (
                                            <span
                                                key={sub}
                                                className="px-2 py-1 bg-white/20 backdrop-blur-sm rounded-lg text-xs text-white font-medium"
                                            >
                                                {sub}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </section>

            {/* CTA Section */}
            {/* <section className="py-16">
                <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full -translate-y-32 translate-x-32" />
                        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full translate-y-24 -translate-x-24" />
                    </div>
                    
                    <div className="relative">
                        <h2 className="text-3xl font-bold mb-4">Не нашли нужную категорию?</h2>
                        <p className="text-white/90 mb-6 max-w-2xl mx-auto">
                            Создайте индивидуальный запрос, и мы поможем найти подходящего специалиста
                        </p>
                        <Link
                            to="/create-order"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-indigo-600 rounded-xl font-semibold hover:bg-white/90 transition-colors shadow-lg"
                        >
                            Создать запрос
                            <Zap size={18} />
                        </Link>
                    </div>
                </div>
            </section> */}
        </div>
    );
};