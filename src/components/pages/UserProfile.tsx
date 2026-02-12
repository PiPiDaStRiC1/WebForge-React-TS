import { useQuery } from "@tanstack/react-query";
import {
    Star,
    MapPin,
    Heart,
    BadgeCheck,
    Briefcase,
    Share2,
    MessageCircle,
    Calendar,
    Award,
    TrendingUp,
    DollarSign,
    Check,
    PhoneIcon,
    Mail,
} from "lucide-react";
import { useParams, Link, useLocation } from "react-router-dom";
import { fetchOneUser, fetchAllOrders } from "@/lib/api";
import { useFavorites, useCurrentUser } from "@/hooks";
import { ErrorAlert } from "@/components/common/ErrorAlert";
import { UserProfileSkeleton, OrderCardSmall } from "@/components/ui";
import { OrderCardSkeleton } from "@/components/common";
import { useMemo, useState } from "react";
import type { Client, FreelancerWithoutCompletedOrders, OrdersData } from "@/types";

export const UserProfile = () => {
    const { userId } = useParams<{ userId: string }>();
    const location = useLocation();
    const { toggleFavorite, isFavorite } = useFavorites();
    const { data: currentUser } = useCurrentUser();

    const isOwnProfile = currentUser?.id === Number(userId);

    const {
        data: user,
        isLoading,
        isError,
    } = useQuery<Client | FreelancerWithoutCompletedOrders | undefined>({
        queryKey: ["users", userId],
        queryFn: () => fetchOneUser(Number(userId)),
        staleTime: 30 * 60 * 1000,
    });

    const {
        data: orders,
        isLoading: isLoadingOrders,
        isError: isErrorOrders,
    } = useQuery<OrdersData>({
        queryKey: ["orders"],
        queryFn: fetchAllOrders,
        staleTime: 30 * 60 * 1000,
    });

    const userOrders = useMemo(() => {
        if (!orders) return [];

        return orders.allIds
            .map((orderId) => orders.ordersById[orderId])
            .filter((order) => order.completedById === Number(userId));
    }, [orders, userId]);

    const [isLoadingAvatar, setIsLoadingAvatar] = useState(!!user?.picture);
    const [showShareToast, setShowShareToast] = useState(false);
    const [isFavoriteUser, setIsFavoriteUser] = useState(isFavorite(Number(userId)));

    if (isLoading) {
        return <UserProfileSkeleton />;
    }

    if (isError || !user) {
        return <ErrorAlert />;
    }

    const handleShare = () => {
        const url = window.location.href;
        navigator.clipboard.writeText(url);

        setShowShareToast(true);

        setTimeout(() => {
            setShowShareToast(false);
        }, 2000);
    };

    const handleToggleFavorite = () => {
        toggleFavorite(Number(userId));
        setIsFavoriteUser(!isFavoriteUser);
    };

    const isFreelancer = user.role === "freelancer";

    return (
        <div className="min-h-screen pb-10">
            <div
                className={`fixed top-4 right-4 z-50 flex items-center gap-3 px-6 py-3 bg-white border border-gray-200 rounded-xl shadow-2xl transition-all duration-300 ${
                    showShareToast
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 -translate-y-4 pointer-events-none"
                }`}
            >
                <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
                    <Check size={18} className="text-emerald-600" />
                </div>
                <div>
                    <p className="text-sm font-semibold text-gray-900">Ссылка скопирована</p>
                    <p className="text-xs text-gray-600">Поделитесь профилем с друзьями</p>
                </div>
            </div>

            <section className="relative">
                <div className="absolute inset-0 h-64 via-purple-50">
                    <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-200 rounded-full blur-3xl opacity-40" />
                    <div className="absolute -bottom-32 -left-32 w-[28rem] h-[28rem] bg-purple-200 rounded-full blur-3xl opacity-40" />
                </div>

                <div className="relative pt-20 pb-32">
                    <div className="flex flex-col md:flex-row md:items-end gap-6">
                        <div className="relative flex-shrink-0">
                            {isLoadingAvatar && (
                                <div className="absolute w-32 h-32 rounded-2xl shadow-2xl bg-gray-200 animate-pulse" />
                            )}
                            {user.picture ? (
                                <div className="w-32 h-32 rounded-2xl overflow-hidden border-4 border-white shadow-2xl bg-white">
                                    <img
                                        src={user.picture.medium}
                                        alt={`${user.name} ${user.lastName}`}
                                        className="w-full h-full object-cover"
                                        onLoad={() => setIsLoadingAvatar(false)}
                                    />
                                </div>
                            ) : (
                                <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-4xl font-bold">
                                    {user.name?.charAt(0).toUpperCase() || "U"}
                                </div>
                            )}
                            {user.status === "verified" && (
                                <span className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-emerald-500 border-4 border-white flex items-center justify-center shadow-lg">
                                    <BadgeCheck size={20} className="text-white text-3xl" />
                                </span>
                            )}
                        </div>

                        <div className="flex-1">
                            <div className="flex items-start justify-between gap-4">
                                <div>
                                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                                        {user.name} {user.lastName}
                                    </h1>
                                    <p className="text-lg text-gray-600 mt-1">@{user.login}</p>
                                    <div className="mt-3 flex flex-wrap items-center gap-4">
                                        <div className="flex items-center gap-1.5">
                                            <Star
                                                size={18}
                                                className="text-amber-400 fill-amber-400"
                                            />
                                            <span className="text-lg font-bold text-gray-900">
                                                {user.rating.toFixed(1)}
                                            </span>
                                            <span className="text-sm text-gray-500">рейтинг</span>
                                        </div>
                                        <div className="flex items-center gap-1.5 text-gray-600">
                                            <MapPin size={16} />
                                            <span className="text-sm">
                                                {user.location ? user.location : "Не указано"}
                                            </span>
                                        </div>
                                        {isFreelancer && (
                                            <div className="flex items-center gap-1.5 text-indigo-600">
                                                <Briefcase size={16} />
                                                <span className="text-sm font-medium">
                                                    {user.experience === 0
                                                        ? "Менее года"
                                                        : user.experience <= 4
                                                          ? `${user.experience} года`
                                                          : `${user.experience} лет`}{" "}
                                                    опыта
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="flex items-center gap-2">
                                    <button
                                        className={`${isFavoriteUser ? "text-rose-500 border-rose-300 bg-rose-50" : ""} cursor-pointer w-11 h-11 flex items-center justify-center rounded-xl bg-white border border-gray-200 text-gray-600 transition-all`}
                                        aria-label="В избранное"
                                        onClick={handleToggleFavorite}
                                    >
                                        <Heart size={20} />
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleShare}
                                        className="w-11 h-11 flex items-center justify-center rounded-xl bg-white border border-gray-200 text-gray-600 hover:text-indigo-600 hover:border-indigo-300 hover:bg-indigo-50 active:scale-95 transition-all"
                                        aria-label="Поделиться"
                                    >
                                        <Share2 size={20} />
                                    </button>
                                    {isOwnProfile ? (
                                        <button className="opacity-50 h-11 px-6 flex items-center gap-2 bg-indigo-600 text-white rounded-xl font-semibold shadow-lg shadow-indigo-500/25 hover:bg-indigo-700 hover:shadow-indigo-500/35 transition-all">
                                            <MessageCircle size={18} />
                                            Написать
                                        </button>
                                    ) : (
                                        <Link
                                            to="/auth"
                                            state={{
                                                background: location,
                                                redirectTo: `/messages/${userId}`,
                                            }}
                                            className="h-11 px-6 flex items-center gap-2 bg-indigo-600 text-white rounded-xl font-semibold shadow-lg shadow-indigo-500/25 hover:bg-indigo-700 hover:shadow-indigo-500/35 transition-all"
                                        >
                                            <MessageCircle size={18} />
                                            Написать
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="relative -mt-20">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-white/70 backdrop-blur-sm border border-gray-200 rounded-2xl p-6 shadow-xl">
                            <h2 className="text-lg font-bold text-gray-900 mb-4">
                                {isFreelancer ? "Статистика" : "Контакты"}
                            </h2>
                            <div className="space-y-4">
                                {isFreelancer && (
                                    <>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center">
                                                    <Award size={20} className="text-emerald-600" />
                                                </div>
                                                <div>
                                                    <p className="text-sm text-gray-600">
                                                        Выполнено заказов
                                                    </p>
                                                    <p className="text-xl font-bold text-gray-900">
                                                        {userOrders.length}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center">
                                                    <Briefcase
                                                        size={20}
                                                        className="text-indigo-600"
                                                    />
                                                </div>
                                                <div>
                                                    <p className="text-sm text-gray-600">
                                                        Опыт работы
                                                    </p>
                                                    <p className="text-xl font-bold text-gray-900">
                                                        {user.experience}{" "}
                                                        {user.experience <= 4 ? "года" : "лет"}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
                                                    <TrendingUp
                                                        size={20}
                                                        className="text-amber-600"
                                                    />
                                                </div>
                                                <div>
                                                    <p className="text-sm text-gray-600">Рейтинг</p>
                                                    <p className="text-xl font-bold text-gray-900">
                                                        {user.rating.toFixed(1)}/5.0
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                                                    <DollarSign
                                                        size={20}
                                                        className="text-green-600"
                                                    />
                                                </div>
                                                <div>
                                                    <p className="text-sm text-gray-600">
                                                        Стоимость
                                                    </p>
                                                    <p className="text-xl font-bold text-gray-900">
                                                        ₽{user.pricePerHour.toLocaleString()}/час
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )}

                                <div className="flex items-center justify-between">
                                    <div className="flex flex-col gap-2">
                                        <div className="flex gap-3 items-center">
                                            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600">
                                                <PhoneIcon size={20} />
                                            </div>
                                            {!user.phone ? (
                                                <span className="text-lg font-bold text-gray-900">
                                                    Не указано
                                                </span>
                                            ) : (
                                                <a
                                                    href={`tel:${user.phone}`}
                                                    className="text-lg font-bold text-gray-900 hover:text-indigo-600 transition-colors cursor-pointer"
                                                >
                                                    {user.phone}
                                                </a>
                                            )}
                                        </div>
                                        <div className="flex gap-3 items-center">
                                            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600">
                                                <Mail size={20} />
                                            </div>
                                            <a
                                                href={`mailto:${user.email}`}
                                                className="text-lg font-bold text-gray-900 hover:text-indigo-600 transition-colors cursor-pointer"
                                            >
                                                {user.email}
                                            </a>
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-4 border-t border-gray-100">
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <Calendar size={16} />
                                        <span>
                                            На платформе с{" "}
                                            {new Date(user.registeredAt).toLocaleDateString(
                                                "ru-RU",
                                                { month: "long", year: "numeric" },
                                            )}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {isFreelancer && (
                            <div className="bg-white/70 backdrop-blur-sm border border-gray-200 rounded-2xl p-6 shadow-xl">
                                <h2 className="text-lg font-bold text-gray-900 mb-4">Навыки</h2>
                                <div className="flex flex-wrap gap-2">
                                    {user.skills.length ? (
                                        <>
                                            {user.skills.map((skill) => (
                                                <span
                                                    key={skill}
                                                    className="px-3 py-1.5 text-sm font-medium bg-indigo-50 text-indigo-700 rounded-lg border border-indigo-100"
                                                >
                                                    {skill}
                                                </span>
                                            ))}
                                        </>
                                    ) : (
                                        <span>Навыки не указаны</span>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white/70 backdrop-blur-sm border border-gray-200 rounded-2xl p-6 shadow-xl">
                            <h2 className="text-lg font-bold text-gray-900 mb-4">О себе</h2>
                            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                                {user.bio
                                    ? user.bio
                                    : "Этот пользователь не хочет рассказывать о себе"}
                            </p>
                        </div>

                        {isFreelancer && (
                            <>
                                <div className="bg-white/70 backdrop-blur-sm border border-gray-200 rounded-2xl p-6 shadow-xl">
                                    <h2 className="text-lg font-bold text-gray-900 mb-4">
                                        Завершенные проекты <span>({userOrders.length})</span>
                                    </h2>
                                    {isLoadingOrders ? (
                                        <div className="space-y-3">
                                            {[...Array(3)].map((_, i) => (
                                                <OrderCardSkeleton key={i} />
                                            ))}
                                        </div>
                                    ) : isErrorOrders ? (
                                        <ErrorAlert message="Не удалось загрузить проекты" />
                                    ) : userOrders.length > 0 ? (
                                        <div className="space-y-3 max-h-[27rem] overflow-y-scroll">
                                            {userOrders.map((order) => (
                                                <OrderCardSmall key={order.id} order={order} />
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="text-center py-12">
                                            <div className="text-5xl mb-4">📂</div>
                                            <p className="text-gray-600">Портфолио пока пусто</p>
                                            <p className="text-sm text-gray-500 mt-1">
                                                Проекты появятся после выполнения заказов
                                            </p>
                                        </div>
                                    )}
                                </div>

                                {/* <div className="bg-white/70 backdrop-blur-sm border border-gray-200 rounded-2xl p-6 shadow-xl">
                                    <h2 className="text-lg font-bold text-gray-900 mb-4">Отзывы</h2>
                                    <div className="text-center py-12">
                                        <div className="text-5xl mb-4">💬</div>
                                        <p className="text-gray-600">Отзывов пока нет</p>
                                        <p className="text-sm text-gray-500 mt-1">Станьте первым, кто оставит отзыв</p>
                                    </div>
                                </div> */}
                            </>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
};
