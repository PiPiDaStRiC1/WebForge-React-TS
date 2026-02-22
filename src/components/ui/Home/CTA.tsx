import { useUser } from "@/hooks";
import { Link, useLocation } from "react-router-dom";
import { ArrowRight, Briefcase, Users, Star, TrendingUp, PlusCircle, Search } from "lucide-react";

const STATS = [
    { value: "1 200+", label: "Исполнителей" },
    { value: "3 400+", label: "Заказов выполнено" },
    { value: "4.8", label: "Средний рейтинг" },
];

export const CTA = () => {
    const location = useLocation();
    const { isAuthenticated, user } = useUser();

    if (!isAuthenticated) {
        return (
            <section className="relative w-full py-20 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-700" />
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute -top-24 -right-24 w-96 h-96 bg-white rounded-full" />
                    <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-white rounded-full" />
                </div>

                <div className="relative max-w-4xl mx-auto px-6 text-center">
                    <span className="inline-block px-4 py-1.5 bg-white/20 text-white text-sm font-medium rounded-full mb-6 backdrop-blur-sm">
                        Фриланс-платформа №1 для веб-разработки
                    </span>
                    <h2 className="text-4xl lg:text-5xl font-bold text-white mb-5 leading-tight">
                        Найдите лучшего специалиста{" "}
                        <span className="text-indigo-200">или начните зарабатывать</span>
                    </h2>
                    <p className="text-lg text-indigo-100 mb-10 max-w-2xl mx-auto">
                        Тысячи проектов и исполнителей — всё в одном месте
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center mb-14">
                        <Link
                            to="/auth"
                            state={{ background: location, redirectTo: "/" }}
                            className="group inline-flex items-center gap-2 px-8 py-4 bg-white text-indigo-600 font-semibold rounded-xl hover:bg-indigo-50 transition-all shadow-lg shadow-indigo-900/20"
                        >
                            Начать бесплатно
                            <ArrowRight
                                size={18}
                                className="group-hover:translate-x-1 transition-transform"
                            />
                        </Link>
                        <Link
                            to="/performers"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-white/15 text-white font-semibold rounded-xl border border-white/30 hover:bg-white/25 transition-all backdrop-blur-sm"
                        >
                            <Search size={18} />
                            Найти исполнителя
                        </Link>
                    </div>

                    <div className="grid grid-cols-3 divide-x divide-white/20 max-w-sm mx-auto">
                        {STATS.map((s) => (
                            <div key={s.label} className="px-4">
                                <div className="text-2xl font-bold text-white">{s.value}</div>
                                <div className="text-xs text-indigo-200 mt-0.5">{s.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    if (!user) return null;

    const isClient = user.role === "client";

    const clientActions = [
        { to: "/create-order", icon: PlusCircle, label: "Создать заказ", primary: true },
        { to: "/performers", icon: Users, label: "Найти исполнителя", primary: false },
    ];

    const freelancerActions = [
        { to: "/orders", icon: Briefcase, label: "Смотреть заказы", primary: true },
        { to: "/top-performers", icon: Star, label: "Топ исполнителей", primary: false },
    ];

    const actions = isClient ? clientActions : freelancerActions;
    const accentColor = isClient ? "from-indigo-600 to-blue-600" : "from-violet-600 to-purple-600";
    const badgeText = isClient ? "Заказчик" : "Исполнитель";
    const badgeIcon = isClient ? Briefcase : TrendingUp;
    const BadgeIcon = badgeIcon;
    const subtitle = isClient
        ? "Готовы разместить новый проект или найти нужного специалиста?"
        : "Новые заказы уже ждут вас — начните зарабатывать прямо сейчас";

    return (
        <section className="relative w-full py-16 overflow-hidden">
            <div className={`absolute inset-0 bg-gradient-to-br ${accentColor}`} />
            <div className="absolute inset-0 opacity-10">
                <div className="absolute -top-16 -right-16 w-72 h-72 bg-white rounded-full" />
                <div className="absolute -bottom-16 -left-16 w-72 h-72 bg-white rounded-full" />
            </div>

            <div className="relative max-w-3xl mx-auto px-6 text-center">
                <span className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-white/20 text-white text-sm font-medium rounded-full mb-5 backdrop-blur-sm">
                    <BadgeIcon size={14} />
                    {badgeText}
                </span>
                <h2 className="text-3xl lg:text-4xl font-bold text-white mb-3">
                    Привет, {user.name}!
                </h2>
                <p className="text-lg text-white/80 mb-10">{subtitle}</p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    {actions.map(({ to, icon: Icon, label, primary }) => (
                        <Link
                            key={to}
                            to={to}
                            className={
                                primary
                                    ? "group inline-flex items-center gap-2 px-8 py-4 bg-white text-indigo-700 font-semibold rounded-xl hover:bg-indigo-50 transition-all shadow-lg shadow-black/15"
                                    : "inline-flex items-center gap-2 px-8 py-4 bg-white/15 text-white font-semibold rounded-xl border border-white/30 hover:bg-white/25 transition-all backdrop-blur-sm"
                            }
                        >
                            <Icon size={18} />
                            {label}
                            {primary && (
                                <ArrowRight
                                    size={16}
                                    className="group-hover:translate-x-1 transition-transform"
                                />
                            )}
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};
