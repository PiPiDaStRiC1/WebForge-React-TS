import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
    Search,
    User,
    ChevronDown,
    X,
    Heart,
    MessageSquare,
    UserX,
    Menu,
    BookOpen,
    Compass,
} from "lucide-react";
import { Logo } from "@/components/common/index";
import { AboutUsers, Support } from "./index";
import { useQuery } from "@tanstack/react-query";
import { fetchAllOrders } from "@/lib/api/fetchAllOrders";
import { useUser, useFavorites } from "@/hooks";
import { SearchCard } from "./SearchCard";
import type { OrdersData } from "@/types";

export const Header = () => {
    const location = useLocation();
    const { isAuthenticated, error } = useUser();
    const [searchQuery, setSearchQuery] = useState("");
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isUsersOpen, setIsUsersOpen] = useState(false);
    const [isSupportOpen, setIsSupportOpen] = useState(false);
    const searchRef = useRef<HTMLDivElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);
    const usersRef = useRef<HTMLDivElement>(null);
    const supportRef = useRef<HTMLDivElement>(null);

    const { data: orders } = useQuery<OrdersData>({
        queryKey: ["orders"],
        queryFn: fetchAllOrders,
    });

    const { favoritesList } = useFavorites();
    const favoritesCount = Object.keys(favoritesList).length;

    const filteredOrders =
        orders?.allIds
            .map((orderId) => orders.ordersById[orderId])
            .filter(
                (order) =>
                    searchQuery.trim().length > 0 &&
                    (order.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        order.description.toLowerCase().includes(searchQuery.toLowerCase())),
            )
            .slice(0, 10) || [];

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setIsSearchOpen(false);
            }
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsMenuOpen(false);
            }
            if (usersRef.current && !usersRef.current.contains(event.target as Node)) {
                setIsUsersOpen(false);
            }
            if (supportRef.current && !supportRef.current.contains(event.target as Node)) {
                setIsSupportOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        if (typeof window === "undefined") return;

        const isMobile = window.innerWidth < 768;

        if (isMobile && (isSearchOpen || isMenuOpen)) {
            document.body.style.overflow = "hidden";
            return () => {
                document.body.style.overflow = "";
            };
        }

        document.body.style.overflow = "";
    }, [isSearchOpen, isMenuOpen]);

    const MOBILE_NAV_LINKS = [
        { to: "/orders", label: "Заказы", icon: Search },
        { to: "/performers", label: "Исполнители", icon: User },
        { to: "/guides", label: "Руководства", icon: BookOpen },
        { to: "/faq", label: "FAQ", icon: MessageSquare },
        { to: "/categories", label: "Категории", icon: Compass },
        { to: "/terms", label: "Условия", icon: ChevronDown },
        { to: "/privacy", label: "Конфиденциальность", icon: ChevronDown },
    ];

    return (
        <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
            <div className="mx-auto max-w-7xl px-3 md:px-6 h-[60px] md:h-[68px] flex items-center gap-3 md:gap-8">
                <Link to="/" className="flex items-center gap-2.5 flex-shrink-0 group">
                    <Logo />
                </Link>
                <nav className="hidden lg:flex items-center gap-1 flex-shrink-0">
                    <Link
                        to="/orders"
                        className="px-4 py-2 text-[15px] font-medium text-gray-600 hover:text-indigo-600 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                        Заказы
                    </Link>
                    <Link
                        to="/performers"
                        className="px-4 py-2 text-[15px] font-medium text-gray-600 hover:text-indigo-600 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                        Исполнители
                    </Link>
                    <Link
                        to="/categories"
                        className="px-4 py-2 text-[15px] font-medium text-gray-600 hover:text-indigo-600 hover:bg-gray-50 rounded-lg transition-colors"
                    >
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
                                    ? "text-indigo-600 bg-indigo-50"
                                    : "text-gray-600 hover:text-indigo-600 hover:bg-gray-50"
                            }`}
                        >
                            Пользователям
                            <ChevronDown
                                size={16}
                                className={`transition-transform duration-300 ${
                                    isUsersOpen ? "rotate-180" : "rotate-0"
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
                                    ? "text-indigo-600 bg-indigo-50"
                                    : "text-gray-600 hover:text-indigo-600 hover:bg-gray-50"
                            }`}
                        >
                            Помощь
                            <ChevronDown
                                size={16}
                                className={`transition-transform duration-300 ${
                                    isSupportOpen ? "rotate-180" : "rotate-0"
                                }`}
                            />
                        </button>
                        <Support isOpen={isSupportOpen} setIsOpen={setIsSupportOpen} />
                    </div>
                </nav>
                <div className="flex-1 max-w-2xl relative" ref={searchRef}>
                    <Search
                        className="hidden md:block absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 z-10"
                        size={20}
                    />
                    <label className="relative hidden md:block">
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
                                onClick={() => setSearchQuery("")}
                            >
                                <X size={18} />
                            </button>
                        )}
                    </label>

                    {isSearchOpen && searchQuery.trim().length > 0 && (
                        <div className="hidden md:block absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden animate-scale-in origin-top max-h-[420px] overflow-y-auto">
                            {filteredOrders.length > 0 ? (
                                <>
                                    <div className="p-2 border-b border-gray-100 bg-gray-50">
                                        <p className="text-xs font-medium text-gray-500 px-2">
                                            {filteredOrders.length < 10
                                                ? `Найдено заказов: ${filteredOrders.length}`
                                                : "Первые 10 результатов"}
                                        </p>
                                    </div>
                                    {filteredOrders.map((order) => (
                                        <SearchCard
                                            key={order.id}
                                            order={order}
                                            setIsSearchOpen={setIsSearchOpen}
                                            setSearchQuery={setSearchQuery}
                                        />
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
                    <Search
                        className="block md:hidden text-gray-600 hover:text-indigo-600 hover:bg-gray-50 rounded-xl transition-colors"
                        size={20}
                        onClick={() => {
                            setIsSearchOpen(true);
                            setIsMenuOpen(false);
                        }}
                    />
                    <button
                        type="button"
                        className="md:hidden w-[42px] h-[42px] flex items-center justify-center text-gray-600 hover:text-indigo-600 hover:bg-gray-50 rounded-xl transition-colors"
                        onClick={() => {
                            setIsMenuOpen((prev) => !prev);
                            setIsSearchOpen(false);
                        }}
                    >
                        {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                    {isMenuOpen && (
                        <div className="fixed top-[60px] inset-x-0 bottom-0 z-50 bg-black/25 backdrop-blur-sm md:hidden">
                            <div className="flex mx-auto h-full w-full px-3 py-3 max-w-md">
                                <div
                                    className="w-full max-w-md bg-white/95 rounded-2xl border border-white/60 p-3 shadow-2xl max-h-[80vh] overflow-y-auto"
                                    ref={menuRef}
                                >
                                    <div className="grid grid-cols-1 gap-2 mb-3">
                                        {MOBILE_NAV_LINKS.map((link) => {
                                            const Icon = link.icon;

                                            return (
                                                <Link
                                                    key={link.to}
                                                    to={link.to}
                                                    className="h-11 px-3 rounded-xl border border-gray-200 bg-white text-gray-700 font-medium inline-flex items-center gap-2 hover:border-indigo-200 hover:text-indigo-700 hover:bg-indigo-50/60 transition-colors"
                                                    onClick={() => setIsMenuOpen(false)}
                                                >
                                                    <Icon size={16} />
                                                    <span>{link.label}</span>
                                                </Link>
                                            );
                                        })}
                                    </div>

                                    <div className="pt-3 border-t border-gray-200 grid grid-cols-1 gap-2">
                                        {isAuthenticated ? (
                                            <>
                                                <Link
                                                    to="/favorites"
                                                    className="h-11 px-3 rounded-xl border border-gray-200 bg-white text-gray-700 font-medium inline-flex items-center gap-2 hover:border-indigo-200 hover:text-indigo-700 hover:bg-indigo-50/60 transition-colors"
                                                    onClick={() => setIsMenuOpen(false)}
                                                >
                                                    <Heart size={16} /> Избранное
                                                </Link>
                                                <Link
                                                    to="/messages"
                                                    className="h-11 px-3 rounded-xl border border-gray-200 bg-white text-gray-700 font-medium inline-flex items-center gap-2 hover:border-indigo-200 hover:text-indigo-700 hover:bg-indigo-50/60 transition-colors"
                                                    onClick={() => setIsMenuOpen(false)}
                                                >
                                                    <MessageSquare size={16} /> Сообщения
                                                </Link>
                                                <Link
                                                    to="/my-profile"
                                                    className="h-11 px-3 rounded-xl bg-indigo-600 text-white font-semibold inline-flex items-center gap-2 hover:bg-indigo-700 transition-colors"
                                                    onClick={() => setIsMenuOpen(false)}
                                                >
                                                    <User size={16} /> Мой профиль
                                                </Link>
                                            </>
                                        ) : (
                                            <Link
                                                to="/auth"
                                                state={{ background: location }}
                                                className="h-11 px-3 rounded-xl bg-indigo-600 text-white font-semibold inline-flex items-center gap-2 hover:bg-indigo-700 transition-colors"
                                                onClick={() => setIsMenuOpen(false)}
                                            >
                                                {error ? <UserX size={16} /> : <User size={16} />}{" "}
                                                Войти
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    {isSearchOpen && (
                        <div className="fixed top-[60px] inset-x-0 bottom-0 z-50 block bg-black/25 backdrop-blur-sm p-3 md:hidden">
                            <div
                                className="w-full max-w-md mx-auto relative bg-white/95 rounded-2xl border border-white/60 p-2 shadow-2xl"
                                ref={searchRef}
                            >
                                <label className="relative">
                                    <input
                                        type="text"
                                        placeholder="Поиск..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full h-[42px] p-4 text-sm text-gray-900 bg-gray-50 border border-transparent rounded-xl outline-none transition-all focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                                    />
                                    {searchQuery && (
                                        <button
                                            type="button"
                                            className="cursor-pointer absolute right-0 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors"
                                            onClick={() => setSearchQuery("")}
                                        >
                                            <X size={18} />
                                        </button>
                                    )}
                                </label>
                                {isSearchOpen && searchQuery.trim().length > 0 && (
                                    <div className="absolute max-w-xl top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden animate-scale-in origin-top max-h-[420px] overflow-y-auto">
                                        {filteredOrders.length > 0 ? (
                                            <>
                                                <div className="p-2 border-b border-gray-100 bg-gray-50">
                                                    <p className="text-xs font-medium text-gray-500 px-2">
                                                        {filteredOrders.length < 10
                                                            ? `Найдено заказов: ${filteredOrders.length}`
                                                            : "Первые 10 результатов"}
                                                    </p>
                                                </div>
                                                {filteredOrders.map((order) => (
                                                    <SearchCard
                                                        key={order.id}
                                                        order={order}
                                                        setIsSearchOpen={setIsSearchOpen}
                                                        setSearchQuery={setSearchQuery}
                                                    />
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
                        </div>
                    )}
                    {isAuthenticated ? (
                        <div className="hidden md:flex gap-2 justify-center items-center">
                            <Link
                                to="/favorites"
                                className="relative w-[42px] h-[42px] flex items-center justify-center text-gray-600 hover:text-indigo-600 hover:bg-gray-50 rounded-xl transition-colors"
                            >
                                <div>
                                    <Heart size={20} />
                                    {favoritesCount > 0 && (
                                        <span className="absolute -top-[0.5px] -right-[0.5px] w-4 h-4 rounded-full bg-indigo-600 text-white text-xs flex items-center justify-center">
                                            {favoritesCount}
                                        </span>
                                    )}
                                </div>
                            </Link>
                            <Link
                                to="/messages"
                                className="relative w-[42px] h-[42px] flex items-center justify-center text-gray-600 hover:text-indigo-600 hover:bg-gray-50 rounded-xl transition-colors"
                            >
                                <MessageSquare size={20} />
                            </Link>
                            <Link
                                to="/my-profile"
                                className="w-[34px] h-[34px] flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg text-white"
                            >
                                <User size={18} />
                            </Link>
                        </div>
                    ) : (
                        <Link
                            to="/auth"
                            state={{ background: location }}
                            className="cursor-pointer flex items-center gap-2 py-1.5 px-3 pl-1.5 hover:bg-gray-50 rounded-xl transition-colors"
                        >
                            <div className="w-[34px] h-[34px] flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg text-white">
                                {error ? <UserX size={18} /> : <User size={18} />}
                            </div>
                            <span className="text-[15px] font-semibold text-gray-900 hidden md:block">
                                Войти
                            </span>
                        </Link>
                    )}
                </div>
            </div>
        </header>
    );
};
