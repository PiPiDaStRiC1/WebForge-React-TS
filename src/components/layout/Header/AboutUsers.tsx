import { Link } from "react-router-dom";
import { Briefcase, Users, Grid3x3, Plus, Award } from "lucide-react";

interface AboutUsersProps {
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
}

export const AboutUsers = ({ isOpen, setIsOpen }: AboutUsersProps) => {
    return (
        <div 
            className={`absolute top-full left-0 mt-2 w-72 bg-white/95 backdrop-blur-sm border border-gray-200 rounded-xl shadow-xl overflow-hidden transition-all duration-300 origin-top ${
                isOpen 
                    ? 'opacity-100 scale-y-100 translate-y-0' 
                    : 'opacity-0 scale-y-0 -translate-y-2 pointer-events-none'
            }`}
        >
            <div className="p-4">
                <div className="mb-3">
                    <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                        Для заказчиков
                    </h3>
                    <div className="space-y-1">
                        <Link 
                            to="/orders" 
                            className="flex items-center gap-3 px-3 py-2.5 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 rounded-lg transition-colors group"
                            onClick={() => setIsOpen(false)}
                        >
                            <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center group-hover:bg-indigo-200 transition-colors">
                                <Briefcase size={16} className="text-indigo-600" />
                            </div>
                            <div className="flex-1">
                                <div className="font-medium">Все заказы</div>
                                <div className="text-xs text-gray-500">Просмотр активных заказов</div>
                            </div>
                        </Link>
                        <Link 
                            to="/create-order" 
                            className="flex items-center gap-3 px-3 py-2.5 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 rounded-lg transition-colors group"
                            onClick={() => setIsOpen(false)}
                        >
                            <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center group-hover:bg-emerald-200 transition-colors">
                                <Plus size={16} className="text-emerald-600" />
                            </div>
                            <div className="flex-1">
                                <div className="font-medium">Разместить заказ</div>
                                <div className="text-xs text-gray-500">Создать новую задачу</div>
                            </div>
                        </Link>
                    </div>
                </div>

                <div className="border-t border-gray-100 pt-3">
                    <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                        Для исполнителей
                    </h3>
                    <div className="space-y-1">
                        <Link 
                            to="/performers" 
                            className="flex items-center gap-3 px-3 py-2.5 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 rounded-lg transition-colors group"
                            onClick={() => setIsOpen(false)}
                        >
                            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                                <Users size={16} className="text-purple-600" />
                            </div>
                            <div className="flex-1">
                                <div className="font-medium">Найти исполнителя</div>
                                <div className="text-xs text-gray-500">База фрилансеров</div>
                            </div>
                        </Link>
                        <Link 
                            to="/top-performers" 
                            className="flex items-center gap-3 px-3 py-2.5 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 rounded-lg transition-colors group"
                            onClick={() => setIsOpen(false)}
                        >
                            <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center group-hover:bg-amber-200 transition-colors">
                                <Award size={16} className="text-amber-600" />
                            </div>
                            <div className="flex-1">
                                <div className="font-medium">Топ фрилансеров</div>
                                <div className="text-xs text-gray-500">Лучшие специалисты</div>
                            </div>
                        </Link>
                    </div>
                </div>

                <div className="border-t border-gray-100 mt-3 pt-3">
                    <Link 
                        to="/categories" 
                        className="flex items-center gap-3 px-3 py-2.5 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 rounded-lg transition-colors group"
                        onClick={() => setIsOpen(false)}
                    >
                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                            <Grid3x3 size={16} className="text-blue-600" />
                        </div>
                        <div className="flex-1">
                            <div className="font-medium">Все категории</div>
                            <div className="text-xs text-gray-500">Обзор специализаций</div>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    )
}