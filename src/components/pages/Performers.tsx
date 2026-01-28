import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { useEffect, useState, useMemo, useRef } from 'react';
import { Search, SlidersHorizontal, BadgeCheck, ArrowRight, ChevronDown, X } from 'lucide-react';
import { Preloader, ErrorAlert } from '@/features'
import {AsideFilters, UserCard} from '@/components/ui/Performers';
import {useFilters, useFreelancerSort, type SortOption} from '@/hooks/index'
import {fetchAllFreelancers} from '@/lib/api/fetchAllFreelancers';
import type {Freelancer} from '@/types';
import {ITEMS_PER_PAGE_OPTIONS, DEFAULT_ITEMS_PER_PAGE, allSkills, allCategories} from '@/lib/constants';

const SORT_OPTIONS = [
    { value: 'default' as const, label: 'По умолчанию' },
    { value: 'price-asc' as const, label: 'Цена: по возрастанию' },
    { value: 'price-desc' as const, label: 'Цена: по убыванию' },
    { value: 'rating-desc' as const, label: 'Рейтинг: по убыванию' },
    { value: 'experience-desc' as const, label: 'Опыт: по убыванию' },
];

export const Performers = () => {
    const {data, isLoading, isError} = useQuery<Array<Freelancer>>({
        queryKey: ['freelancers'],
        queryFn: fetchAllFreelancers,
        staleTime: 5 * 60 * 1000,
    });
    const [sortBy, setSortBy] = useState<SortOption>('default');
    const [isSortOpen, setIsSortOpen] = useState(false);
    const [loadSkills, setLoadSkills] = useState(false);
    const sortRef = useRef<HTMLDivElement>(null);
    const {get, set, toggle, getRange} = useFilters();
    const page = get('page', Number, 1);
    const itemsPerPage = get('limit', Number, DEFAULT_ITEMS_PER_PAGE);

    
    const search = get('search', String, '');
    const categories = get('category', (v) => v.split(','), []);
    const [priceLow, priceHigh] = getRange('price', ['1000', '5000']).map(Number);
    const skills = get('skills', (v) => v.split(','), []);
    const [ratingLow, ratingHigh] = getRange('rating', ['0', '5']).map(Number);
    const [experienceLow, experienceHigh] = getRange('experience', ['0', '20']).map(Number);
    const status = get('status', (v) => v.split(','), []);
    const [ordersCountLow, ordersCountHigh] = getRange('ordersCount', ['0', '1000']).map(Number);


    const filteredData = useMemo(() => {
        if (!data) return [];

        return data.filter((user) => (
            (user.login.includes(search) || user.name.includes(search)) &&
            (categories.length === 0 || categories.some(cat => user.category === cat)) &&
            user.pricePerHour >= priceLow && user.pricePerHour <= priceHigh &&
            (skills.length === 0 || skills.some(skill => user.skills.includes(skill))) &&
            (user.rating >= ratingLow && user.rating <= ratingHigh) &&
            (user.experience >= experienceLow && user.experience <= experienceHigh) &&
            (status.length === 0 || status.includes(user.status)) &&
            user.completedOrders >= ordersCountLow && user.completedOrders <= ordersCountHigh
        ));
    }, [search, data, priceLow, priceHigh, skills, ratingLow, ratingHigh, experienceLow, experienceHigh, status, ordersCountHigh, ordersCountLow, categories]);

    const sortedData = useFreelancerSort(filteredData, sortBy);

    const paginatedData = useMemo(() => {
        const start = (page - 1) * itemsPerPage;
        const end = page * itemsPerPage;
        return sortedData.slice(start, end);
    }, [sortedData, page, itemsPerPage]);


    const totalPages = Math.ceil(sortedData.length / itemsPerPage) || 1;

    useEffect(() => {
        if (page > 1 && page > totalPages) {
            set('page', '1', '1');
        }
    }, [page, totalPages, set]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
                setIsSortOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);


    return (
        <div className="min-h-screen">
            <section className="relative">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-100 rounded-full blur-3xl opacity-40" />
                    <div className="absolute -bottom-32 -left-32 w-[28rem] h-[28rem] bg-purple-100 rounded-full blur-3xl opacity-40" />
                </div>

                <div className="relative pt-14 pb-10">
                    <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
                        <div className="max-w-2xl">
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-indigo-100 text-sm font-medium text-indigo-600 mb-5">
                                <BadgeCheck size={16} className="text-indigo-500" />
                                Подбор исполнителей под веб-задачи
                            </div>

                            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-gray-900">
                                Исполнители для вашего проекта
                            </h1>
                            <p className="mt-4 text-lg text-gray-600">
                                Выбирайте специалистов по стеку, рейтингу и стоимости.
                            </p>
                        </div>

                        <div className="flex items-center gap-3">
                            <Link
                                to="/orders"
                                className="inline-flex items-center gap-2 h-11 px-5 bg-white border border-gray-200 rounded-xl text-gray-700 font-semibold hover:border-indigo-200 hover:text-indigo-700 hover:bg-white/70 transition-colors"
                            >
                                Смотреть заказы
                                <ArrowRight size={18} />
                            </Link>
                            <Link
                                to="/create-order"
                                className="inline-flex items-center justify-center h-11 px-5 bg-indigo-600 text-white rounded-xl font-semibold shadow-lg shadow-indigo-500/25 hover:bg-indigo-700 hover:shadow-indigo-500/35 transition-all"
                            >
                                Разместить заказ
                            </Link>
                        </div>
                    </div>

                    <div className="mt-10 bg-white/70 backdrop-blur-sm border border-white/70 rounded-2xl p-4 shadow-xl">
                        <div className="flex flex-col lg:flex-row gap-3">
                            <div className="flex-1 relative">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                <input
                                    value={search}
                                    type="text"
                                    placeholder="Поиск по логину или имени..."
                                    className="w-full h-12 pl-12 pr-4 bg-white border border-gray-200 rounded-xl outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all"
                                    onChange={(e) => set('search', e.target.value, '')}
                                />
                                {search && (
                                    <button
                                        type="button"
                                        className="cursor-pointer absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                        onClick={() => set('search', '', '')}
                                    >
                                        <X size={20} />
                                    </button>
                                )}
                            </div>
                            <button
                                type="button"
                                className="inline-flex lg:hidden items-center justify-center gap-2 h-12 px-5 bg-white border border-gray-200 rounded-xl text-gray-700 font-semibold hover:border-indigo-200 hover:text-indigo-700 transition-colors"
                            >
                                <SlidersHorizontal size={18} />
                                Фильтры
                            </button>
                            <button
                                type="button"
                                className="cursor-pointer inline-flex items-center justify-center h-12 px-6 bg-indigo-600 text-white rounded-xl font-semibold shadow-lg shadow-indigo-500/25 hover:bg-indigo-700 hover:shadow-indigo-500/35 transition-all"
                            >
                                Найти
                            </button>
                        </div>

                        <div className="mt-4 flex flex-wrap gap-2">
                            {allCategories.map(cat => (
                                <button 
                                    key={cat}
                                    type='button'
                                    className={`${categories.includes(cat) ? 'bg-indigo-50 text-indigo-700' : 'bg-gray-100 text-gray-700'} cursor-pointer px-3 py-1.5 text-sm font-medium rounded-full border border-indigo-100`}
                                    onClick={() => toggle('category', cat)}
                                >
                                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                                </button>
                            ))}

                            <button 
                                className={`${loadSkills ? 'bg-indigo-50 text-indigo-700' : 'bg-gray-100 text-gray-700'} cursor-pointer px-3 py-1.5 text-sm font-medium rounded-full border border-gray-200`}
                                onClick={() => setLoadSkills(!loadSkills)}
                            >
                                {loadSkills ? 'Скрыть' : 'Показать все'}
                            </button>
                            <div 
                                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                                    loadSkills 
                                        ? 'max-h-96 opacity-100' 
                                        : 'max-h-0 opacity-0'
                                }`}
                            >
                                <div className="flex flex-wrap gap-2 pt-2 animate-fade-in">
                                    {allSkills.map((skill, index) => (
                                        <button 
                                            key={skill}
                                            className={`${skills.includes(skill) ? 'bg-indigo-50 text-indigo-700' : 'bg-gray-100 text-gray-700'} cursor-pointer px-3 py-1.5 text-sm font-medium rounded-full border border-indigo-100 transition-all hover:scale-105`}
                                            onClick={() => toggle('skills', skill)}
                                            style={{
                                                animationDelay: `${index * 30}ms`
                                            }}
                                        >   
                                            {skill}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="relative py-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    <AsideFilters 
                        price={[priceLow, priceHigh]}
                        ratingLow={ratingLow}
                        status={status}
                        experience={[experienceLow, experienceHigh]}
                        ordersCountLow={ordersCountLow}
                    />
                    <div className="lg:col-span-8 xl:col-span-9">
                        <div className="flex items-center justify-between mb-4">
                            <div className="text-sm text-gray-600">
                                <h2 className="text-2xl font-bold text-gray-900" id='top-performers'>Топ исполнителей</h2>
                                <p>
                                    Показано <span className="font-semibold text-gray-900">{Math.min(page * itemsPerPage, sortedData.length)}</span> из <span className="font-semibold text-gray-900">{sortedData.length}</span>
                                </p>
                            </div>

                            <div className="hidden md:flex items-center gap-4">
                                <div className="flex items-center gap-2">
                                    <span className="text-sm text-gray-500">На странице:</span>
                                    <div className="flex gap-1">
                                        {ITEMS_PER_PAGE_OPTIONS.map((count) => (
                                            <button
                                                key={count}
                                                type="button"
                                                onClick={() => {
                                                    set('limit', String(count), String(DEFAULT_ITEMS_PER_PAGE));
                                                }}
                                                className={`cursor-pointer h-8 w-10 rounded-lg text-sm font-semibold transition-colors ${
                                                    count === itemsPerPage
                                                        ? 'bg-indigo-600 text-white'
                                                        : 'bg-white border border-gray-200 text-gray-700 hover:border-indigo-200 hover:text-indigo-700'
                                                }`}
                                            >
                                                {count}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <span className="text-sm text-gray-500">Сортировка:</span>
                                <div className="relative" ref={sortRef}>
                                    <button
                                        type="button"
                                        onClick={() => setIsSortOpen(!isSortOpen)}
                                        className="h-10 px-3 pr-8 bg-white/70 backdrop-blur-sm border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 hover:border-indigo-200 hover:text-indigo-700 transition-colors relative"
                                    >
                                        {SORT_OPTIONS.find(opt => opt.value === sortBy)?.label}
                                        <ChevronDown 
                                            size={16} 
                                            className={`absolute right-2 top-1/2 -translate-y-1/2 transition-transform duration-300 ${
                                                isSortOpen ? 'rotate-180' : 'rotate-0'
                                            }`}
                                        />
                                    </button>
                                    <div 
                                        className={`absolute top-full right-0 mt-2 w-56 bg-white/95 backdrop-blur-sm border border-gray-200 rounded-xl shadow-xl overflow-hidden transition-all duration-300 origin-top z-10 ${
                                            isSortOpen 
                                                ? 'opacity-100 scale-y-100 translate-y-0' 
                                                : 'opacity-0 scale-y-0 -translate-y-2 pointer-events-none'
                                        }`}
                                    >
                                        {SORT_OPTIONS.map((option) => (
                                            <button
                                                key={option.value}
                                                type="button"
                                                onClick={() => {
                                                    setSortBy(option.value);
                                                    setIsSortOpen(false);
                                                }}
                                                className={`w-full px-4 py-2.5 text-left text-sm font-medium transition-colors ${
                                                    sortBy === option.value
                                                        ? 'bg-indigo-50 text-indigo-700'
                                                        : 'text-gray-700 hover:bg-gray-50'
                                                }`}
                                            >
                                                {option.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className='flex h-[calc(100%-52px)] flex-col justify-between'>
                            {isLoading ?
                                <Preloader /> :
                                    isError ? 
                                        <ErrorAlert /> :
                                            <>
                                                {sortedData.length === 0 ? (
                                                    <div className="flex flex-col gap-2 items-center justify-center py-15">
                                                        <h1 className='h-full flex text-xl items-center justify-center'>Ни один исполнитель не найден</h1>
                                                    </div>
                                                ) : (
                                                    <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
                                                        {paginatedData.map((u: Freelancer) => (
                                                            <UserCard key={u.id} user={u}/>
                                                        ))}
                                                    </div>
                                                )}
                                            </>
                            }

                            <div className="w-full flex items-center justify-center mt-10">
                                <div className="flex items-center gap-2">
                                    <button
                                        type="button"
                                        className="cursor-pointer h-10 px-4 bg-white/70 backdrop-blur-sm border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 hover:border-indigo-200 hover:text-indigo-700 transition-colors disabled:opacity-50 disabled:pointer-events-none"
                                        disabled={page === 1}
                                        onClick={() => set('page', String(Math.max(page - 1, 1)), '1')}
                                    >
                                        Назад
                                    </button>
                                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                                        <button
                                            key={p}
                                            type="button"
                                            className={`cursor-pointer h-10 w-10 rounded-xl text-sm font-semibold ${
                                                p === page
                                                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/25'
                                                    : 'bg-white/70 backdrop-blur-sm border border-gray-200 text-gray-700 hover:border-indigo-200 hover:text-indigo-700 transition-colors'
                                            }`}
                                            onClick={() => set('page', String(p), '1')}
                                        >
                                            {p}
                                        </button>
                                    ))}
                                    <button
                                        type="button"
                                        className="cursor-pointer h-10 px-4 bg-white/70 backdrop-blur-sm border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 hover:border-indigo-200 hover:text-indigo-700 transition-colors disabled:opacity-50 disabled:pointer-events-none"
                                        disabled={page === totalPages}
                                        onClick={() => set('page', String(Math.min(page + 1, totalPages)), '1')}
                                    >
                                        Вперёд
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}