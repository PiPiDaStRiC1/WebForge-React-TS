import { Link } from "react-router-dom";
import { Search, Bell, MessageSquare, User } from 'lucide-react';
import {Logo} from '@/components/common/index'

export const Header = () => {
    return (
        <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
            <div className="mx-auto max-w-7xl px-6 h-[68px] flex items-center gap-8">
                <Link to="/" className="flex items-center gap-2.5 flex-shrink-0 group">
                    <Logo />
                </Link>
                <nav className="hidden lg:flex items-center gap-1 flex-shrink-0">
                    <Link to="/orders" className="px-4 py-2 text-[15px] font-medium text-gray-600 hover:text-indigo-600 hover:bg-gray-50 rounded-lg transition-colors">
                        Заказы
                    </Link>
                    <Link to="/performers" className="px-4 py-2 text-[15px] font-medium text-gray-600 hover:text-indigo-600 hover:bg-gray-50 rounded-lg transition-colors">
                        Исполнители
                    </Link>
                    <Link to="/categories" className="px-4 py-2 text-[15px] font-medium text-gray-600 hover:text-indigo-600 hover:bg-gray-50 rounded-lg transition-colors">
                        Категории
                    </Link>
                </nav>
                <div className="flex-1 max-w-md relative">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Найти заказ..."
                        className="w-full h-[42px] pl-11 pr-4 text-sm text-gray-900 bg-gray-50 border border-transparent rounded-xl outline-none transition-all focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                    />
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                    <Link to="/notifications" className="relative w-[42px] h-[42px] flex items-center justify-center text-gray-600 hover:text-indigo-600 hover:bg-gray-50 rounded-xl transition-colors">
                        <Bell size={20} />
                    </Link>
                    <Link to="/messages" className="relative w-[42px] h-[42px] flex items-center justify-center text-gray-600 hover:text-indigo-600 hover:bg-gray-50 rounded-xl transition-colors">
                        <MessageSquare size={20} />
                    </Link>
                    <Link to="/profile" className="flex items-center gap-2 py-1.5 px-3 pl-1.5 hover:bg-gray-50 rounded-xl transition-colors">
                        <div className="w-[34px] h-[34px] flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg text-white">
                            <User size={18} />
                        </div>
                        <span className="text-[15px] font-semibold text-gray-900 hidden md:block">Войти</span>
                    </Link>
                </div>
            </div>
        </header>
    );
};