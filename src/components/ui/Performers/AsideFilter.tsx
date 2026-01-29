import { useFilters } from '@/hooks/index'
import { Star, BadgeCheck, Clock, ArrowUp } from "lucide-react";

interface AsideFiltersProps {
    price: number[]
    ratingLow: number,
    status: string[],
    experience: number[],
    completedOrdersLow: number
}

export const AsideFilters = ({experience, completedOrdersLow, price, ratingLow, status}: AsideFiltersProps) => {
    const [experienceLow, experienceHigh] = experience;
    const [priceLow, priceHigh] = price;
    const {resetFilters, toggle, setRange} = useFilters();

    
    return (
        <aside className="lg:col-span-4 xl:col-span-3">
            <div className="sticky top-24">
                <div className="bg-white/70 backdrop-blur-sm border border-white/70 rounded-2xl shadow-xl overflow-hidden">
                    <div className="px-5 pt-5 pb-4 border-b border-gray-100 bg-white/50">
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-bold text-gray-900">Фильтры</h2>
                            <button
                                type="button"
                                className="cursor-pointer text-sm font-semibold text-gray-500 hover:text-indigo-700 transition-colors"
                                onClick={resetFilters}
                            >
                                Сбросить
                            </button>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="max-h-[calc(100vh-200px)] overflow-y-auto px-5 py-4 space-y-2">
                        <div>
                            <div className="text-sm font-semibold text-gray-900 mb-2.5">Цена за час</div>
                            <div className="grid grid-cols-2 gap-2">
                                <input
                                    value={priceLow === 0 ? '' : Math.max(priceLow, 0)}
                                    type="number"
                                    min="0"
                                    placeholder="От ₽"
                                    className="h-10 px-3 text-sm bg-white border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                                    onChange={(e) => {
                                        const value = Math.max(0, Number(e.target.value) || 0);
                                        setRange('price', [String(value), String(priceHigh)]);
                                    }}
                                />
                                <input
                                    value={priceHigh === 0 ? '' : Math.max(priceHigh, 0)}
                                    type="number"
                                    min="0"
                                    placeholder="До ₽"
                                    className="h-10 px-3 text-sm bg-white border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                                    onChange={(e) => {
                                        const value = Math.max(0, Number(e.target.value) || 0);
                                        setRange('price', [String(priceLow), String(value)]);
                                    }}
                                />
                            </div>
                        </div>

                        <div className="border-t border-gray-100" />

                        <div>
                            <div className="text-sm font-semibold text-gray-900 mb-2.5">Рейтинг</div>
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 cursor-pointer group">
                                    <input 
                                        checked={ratingLow === 4.8}
                                        type="checkbox" 
                                        className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-2 focus:ring-indigo-500/20"
                                        onChange={() => setRange('rating', ['4.8', '5.0'])}
                                    />
                                    <span className="flex items-center gap-1.5 text-sm text-gray-700 group-hover:text-gray-900">
                                        <Star size={14} className="text-amber-400 fill-amber-400" />
                                        <span className="font-medium">4.8+</span>
                                        <span className="text-gray-400">(35)</span>
                                    </span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer group">
                                    <input 
                                        checked={ratingLow === 4.5}
                                        type="checkbox" 
                                        className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-2 focus:ring-indigo-500/20"
                                        onChange={() => setRange('rating', ['4.5', '5.0'])}
                                    />
                                    <span className="flex items-center gap-1.5 text-sm text-gray-700 group-hover:text-gray-900">
                                        <Star size={14} className="text-amber-400 fill-amber-400" />
                                        <span className="font-medium">4.5+</span>
                                        <span className="text-gray-400">(89)</span>
                                    </span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer group">
                                    <input 
                                        checked={ratingLow === 4.0}
                                        type="checkbox" 
                                        className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-2 focus:ring-indigo-500/20"
                                        onChange={() => setRange('rating', ['4.0', '5.0'])}
                                    />
                                    <span className="flex items-center gap-1.5 text-sm text-gray-700 group-hover:text-gray-900">
                                        <Star size={14} className="text-amber-400 fill-amber-400" />
                                        <span className="font-medium">4.0+</span>
                                        <span className="text-gray-400">(142)</span>
                                    </span>
                                </label>
                            </div>
                        </div>

                        <div className="border-t border-gray-100" />

                        <div>
                            <div className="text-sm font-semibold text-gray-900 mb-2.5">Опыт работы</div>
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 cursor-pointer group">
                                    <input 
                                        checked={experienceLow === 0 && experienceHigh === 1}
                                        type="checkbox" 
                                        className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-2 focus:ring-indigo-500/20"
                                        onChange={() => setRange('experience', ['0', '1'])}
                                    />
                                    <span className="text-sm text-gray-700 group-hover:text-gray-900">
                                        Менее года <span className="text-gray-400">(22)</span>
                                    </span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer group">
                                    <input 
                                        checked={experienceLow === 1 && experienceHigh === 3}
                                        type="checkbox" 
                                        className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-2 focus:ring-indigo-500/20"
                                        onChange={() => setRange('experience', ['1', '3'])}
                                    />
                                    <span className="text-sm text-gray-700 group-hover:text-gray-900">
                                        1-3 года <span className="text-gray-400">(67)</span>
                                    </span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer group">
                                    <input 
                                        checked={experienceLow === 3 && experienceHigh === 5}
                                        type="checkbox" 
                                        className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-2 focus:ring-indigo-500/20"
                                        onChange={() => setRange('experience', ['3', '5'])}
                                    />
                                    <span className="text-sm text-gray-700 group-hover:text-gray-900">
                                        3-5 лет <span className="text-gray-400">(45)</span>
                                    </span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer group">
                                    <input 
                                        checked={experienceLow === 5 && experienceHigh === 10}
                                        type="checkbox" 
                                        className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-2 focus:ring-indigo-500/20"
                                        onChange={() => setRange('experience', ['5', '10'])}
                                    />
                                    <span className="text-sm text-gray-700 group-hover:text-gray-900">
                                        Более 5 лет <span className="text-gray-400">(16)</span>
                                    </span>
                                </label>
                            </div>
                        </div>

                        <div className="border-t border-gray-100" />

                        <div>
                            <div className="text-sm font-semibold text-gray-900 mb-2.5">Статус</div>
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 cursor-pointer group">
                                    <input 
                                        checked={status.includes('verified')}
                                        type="checkbox" 
                                        className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-2 focus:ring-indigo-500/20"
                                        onChange={() => toggle('status', 'verified')}
                                    />
                                    <span className="flex items-center gap-1.5 text-sm text-gray-700 group-hover:text-gray-900">
                                        <BadgeCheck size={14} className="text-emerald-500" />
                                        Верифицирован <span className="text-gray-400">(112)</span>
                                    </span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer group">
                                    <input 
                                        checked={status.includes('free')}
                                        type="checkbox" 
                                        className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-2 focus:ring-indigo-500/20"
                                        onChange={() => toggle('status', 'free')}
                                    />
                                    <span className="flex items-center gap-1.5 text-sm text-gray-700 group-hover:text-gray-900">
                                        <Clock size={14} className="text-emerald-500" />
                                        Доступен сейчас <span className="text-gray-400">(28)</span>
                                    </span>
                                </label>
                            </div>
                        </div>

                        <div className="border-t border-gray-100" />

                        <div>
                            <div className="text-sm font-semibold text-gray-900 mb-2.5">Выполнено заказов</div>
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 cursor-pointer group">
                                    <input
                                        checked={completedOrdersLow === 15} 
                                        type="checkbox" 
                                        className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-2 focus:ring-indigo-500/20"
                                        onChange={() => setRange('completedOrders', ['15', '1000'])}
                                    />
                                    <span className="text-sm text-gray-700 group-hover:text-gray-900">
                                        Более 15 
                                    </span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer group">
                                    <input 
                                        checked={completedOrdersLow === 10}
                                        type="checkbox" 
                                        className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-2 focus:ring-indigo-500/20"
                                        onChange={() => setRange('completedOrders', ['10', '1000'])}
                                    />
                                    <span className="text-sm text-gray-700 group-hover:text-gray-900">
                                        Более 10 
                                    </span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer group">
                                    <input 
                                        checked={completedOrdersLow === 5}
                                        type="checkbox" 
                                        className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-2 focus:ring-indigo-500/20"
                                        onChange={() => setRange('completedOrders', ['5', '1000'])}
                                    />
                                    <span className="text-sm text-gray-700 group-hover:text-gray-900">
                                        Более 5 
                                    </span>
                                </label>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
                <div 
                    className='cursor-pointer w-full bottom-0 mt-2 p-1 flex justify-center items-center bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg'
                    onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
                >
                    <ArrowUp size={30}/>
                </div>
            </div>
        </aside>
    )
}