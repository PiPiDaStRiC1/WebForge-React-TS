import { Link, useNavigate, useLocation } from "react-router-dom";
import { Search, User, ChevronDown, X } from 'lucide-react';
import { Logo } from '@/components/common/index'
import { AboutUsers, Support } from './index'
import { useState, useRef, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchAllOrders } from '@/lib/api/fetchAllOrders';
import type { Order } from '@/types';


export const Header = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isUsersOpen, setIsUsersOpen] = useState(false);
    const [isSupportOpen, setIsSupportOpen] = useState(false);
    const searchRef = useRef<HTMLDivElement>(null);
    const usersRef = useRef<HTMLDivElement>(null);
    const supportRef = useRef<HTMLDivElement>(null);

    const {data: orders} = useQuery<Order[]>({
        queryKey: ['orders'],
        queryFn: fetchAllOrders,
    });

    const filteredOrders = orders?.filter(order => 
        searchQuery.trim().length > 0 && (
            order.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            order.description.toLowerCase().includes(searchQuery.toLowerCase())
        )
    ).slice(0, 10) || [];

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setIsSearchOpen(false);
            }
            if (usersRef.current && !usersRef.current.contains(event.target as Node)) {
                setIsUsersOpen(false);
            }
            if (supportRef.current && !supportRef.current.contains(event.target as Node)) {
                setIsSupportOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

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
                    <div className="relative" ref={usersRef}>
                        <button
                            onClick={() => {
                                setIsUsersOpen(!isUsersOpen);
                                setIsSupportOpen(false);
                            }}
                            className={`cursor-pointer flex items-center gap-1 px-4 py-2 text-[15px] font-medium rounded-lg transition-colors ${
                                isUsersOpen 
                                    ? 'text-indigo-600 bg-indigo-50' 
                                    : 'text-gray-600 hover:text-indigo-600 hover:bg-gray-50'
                            }`}
                        >
                            Пользователям
                            <ChevronDown 
                                size={16} 
                                className={`transition-transform duration-300 ${
                                    isUsersOpen ? 'rotate-180' : 'rotate-0'
                                }`}
                            />
                        </button>
                        <AboutUsers isOpen={isUsersOpen} setIsOpen={setIsUsersOpen} />
                    </div>
                    <div className="relative" ref={supportRef}>
                        <button
                            onClick={() => {
                                setIsSupportOpen(!isSupportOpen);
                                setIsUsersOpen(false);
                            }}
                            className={`cursor-pointer flex items-center gap-1 px-4 py-2 text-[15px] font-medium rounded-lg transition-colors ${
                                isSupportOpen 
                                    ? 'text-indigo-600 bg-indigo-50' 
                                    : 'text-gray-600 hover:text-indigo-600 hover:bg-gray-50'
                            }`}
                        >
                            Помощь
                            <ChevronDown 
                                size={16} 
                                className={`transition-transform duration-300 ${
                                    isSupportOpen ? 'rotate-180' : 'rotate-0'
                                }`}
                            />
                        </button>
                        <Support isOpen={isSupportOpen} setIsOpen={setIsSupportOpen} />
                    </div>
                </nav>
                <div className="flex-1 max-w-2xl relative" ref={searchRef}>
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 z-10" size={20} />
                    <label className="relative">
                        <input
                            type="text"
                            placeholder="Найти по названию или описанию..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onFocus={() => setIsSearchOpen(true)}
                            className="w-full h-[42px] pl-11 pr-4 text-sm text-gray-900 bg-gray-50 border border-transparent rounded-xl outline-none transition-all focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                        />
                        {searchQuery && (
                            <button
                                type="button"
                                className="cursor-pointer absolute right-0 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors"
                                onClick={() => setSearchQuery('')}
                            >
                                <X size={18}/>
                            </button>
                        )}
                    </label>
                    
                    {isSearchOpen && searchQuery.trim().length > 0 && (
                        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden animate-scale-in origin-top max-h-[420px] overflow-y-auto">
                            {filteredOrders.length > 0 ? (
                                <>
                                    <div className="p-2 border-b border-gray-100 bg-gray-50">
                                        <p className="text-xs font-medium text-gray-500 px-2">
                                            {filteredOrders.length < 10 ? `Найдено заказов: ${filteredOrders.length}` : 'Первые 10 результатов'}
                                        </p>
                                    </div>
                                    {filteredOrders.map((order) => (
                                        <Link
                                            key={order.id}
                                            to={`/orders/${order.id}`}
                                            onClick={() => {
                                                setIsSearchOpen(false);
                                                setSearchQuery('');
                                            }}
                                            className="block p-3 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0"
                                        >
                                            <div className="flex items-start gap-3">
                                                <div className="flex-1 min-w-0">
                                                    <h4 className="text-sm font-semibold text-gray-900 mb-1 line-clamp-1">
                                                        {order.title}
                                                    </h4>
                                                    <p className="text-xs text-gray-600 mb-2 line-clamp-2">
                                                        {order.description}
                                                    </p>
                                                    <div className="flex items-center gap-2 flex-wrap">
                                                        <span className="px-2 py-0.5 bg-indigo-50 text-indigo-600 text-xs font-medium rounded">
                                                            {order.category}
                                                        </span>
                                                        <span className="text-xs text-gray-500">
                                                            {new Date(order.createdAt).toLocaleDateString('ru')}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="text-right flex-shrink-0">
                                                    <p className="text-sm font-bold text-gray-900">
                                                        {order.budgetMax.toLocaleString()} ₽
                                                    </p>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </>
                            ) : (
                                <div className="p-8 text-center">
                                    <div className="w-16 h-16 mx-auto mb-3 bg-gray-100 rounded-full flex items-center justify-center">
                                        <Search size={28} className="text-gray-400" />
                                    </div>
                                    <p className="text-sm font-medium text-gray-900 mb-1">
                                        Ничего не найдено
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        Попробуйте изменить запрос
                                    </p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                    {/* <Link to="/notifications" className="relative w-[42px] h-[42px] flex items-center justify-center text-gray-600 hover:text-indigo-600 hover:bg-gray-50 rounded-xl transition-colors">
                        <Bell size={20} />
                    </Link>
                    <Link to="/messages" className="relative w-[42px] h-[42px] flex items-center justify-center text-gray-600 hover:text-indigo-600 hover:bg-gray-50 rounded-xl transition-colors">
                        <MessageSquare size={20} />
                    </Link> */}
                    <button 
                        className="cursor-pointer flex items-center gap-2 py-1.5 px-3 pl-1.5 hover:bg-gray-50 rounded-xl transition-colors"
                        onClick={() => navigate('/auth', {state: { background: location }})}
                    >
                        <div className="w-[34px] h-[34px] flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg text-white">
                            <User size={18} />
                        </div>
                        <span className="text-[15px] font-semibold text-gray-900 hidden md:block">Войти</span>
                    </button>
                </div>
            </div>
        </header>
    );
};