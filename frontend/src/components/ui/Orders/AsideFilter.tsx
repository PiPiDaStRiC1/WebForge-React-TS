import { Filter, ArrowUp } from "lucide-react";
import { useFilters } from "@/hooks";

const STATUS_CONFIG = {
    new: { label: "Новый", color: "bg-green-100 text-green-700", icon: "🆕" },
    "in-progress": { label: "В работе", color: "bg-blue-100 text-blue-700", icon: "⚡" },
    completed: { label: "Завершен", color: "bg-gray-100 text-gray-700", icon: "✅" },
};

interface AsideFilterProps {
    sortBy: string;
    status: string[];
}

export const AsideFilter = ({ sortBy, status }: AsideFilterProps) => {
    const { set, toggle, resetFilters } = useFilters();

    return (
        <aside className="lg:col-span-3">
            <div className="sticky top-24 flex flex-col gap-2">
                <div className="bg-white/70 top-26 backdrop-blur-sm border border-gray-200 rounded-2xl p-6">
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
                                        onChange={() => toggle("status", key)}
                                        className="cursor-pointer w-4 h-4 text-indigo-600 rounded"
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
                            onChange={(e) => set("sortBy", e.target.value)}
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
                <div
                    className="cursor-pointer w-full p-1 flex justify-center items-center bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg"
                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                >
                    <ArrowUp size={30} />
                </div>
            </div>
        </aside>
    );
};
