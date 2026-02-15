import { useState, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { Star, MapPin, Briefcase, BadgeCheck } from "lucide-react";
import type { OrderResponse, Freelancer } from "@/types";
import { AvatarPreloader, UserCardPreloader } from "@/components/common";
import { AuthStore } from "@/lib/storage/authStore";

interface ResponseCardProps {
    response: OrderResponse;
    freelancer?: Freelancer;
}

export const ResponseCard = ({ response, freelancer }: ResponseCardProps) => {
    const location = useLocation();
    const [isLoadingAvatar, setIsLoadingAvatar] = useState(true);
    const currentUser = useMemo(() => new AuthStore(), []);
    const isOwnProfile = currentUser.getUserId() === freelancer?.id;
    const isAuthenticated = !!currentUser.getUserId();

    if (!freelancer) {
        return <UserCardPreloader />;
    }

    return (
        <div className="bg-gradient-to-br from-white/80 to-indigo-50/30 backdrop-blur-sm border border-gray-200 rounded-xl p-5 hover:shadow-lg hover:border-indigo-200 transition-all duration-300 mb-4">
            <div className="flex items-start gap-4">
                <div className="relative flex-shrink-0">
                    {isLoadingAvatar && <AvatarPreloader />}
                    <Link to={`/profile/${freelancer.id}`}>
                        {freelancer.picture ? (
                            <div className="w-14 h-14 rounded-xl overflow-hidden shadow-2xl bg-white hover:scale-105">
                                <img
                                    src={freelancer.picture.medium}
                                    alt={freelancer.name}
                                    className="w-14 h-14 rounded-xl object-cover shadow-md transition-transform"
                                    onLoad={() => setIsLoadingAvatar(false)}
                                />
                            </div>
                        ) : (
                            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-4xl font-bold">
                                {freelancer.name?.charAt(0).toUpperCase() || "U"}
                            </div>
                        )}
                    </Link>
                    {freelancer.status === "verified" && (
                        <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center shadow-md">
                            <BadgeCheck size={12} className="text-white" />
                        </span>
                    )}
                </div>

                <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                        <div className="flex-1 min-w-0">
                            <Link
                                to={`/profile/${freelancer.id}`}
                                className="text-base font-bold text-gray-900 hover:text-indigo-600 transition-colors"
                            >
                                {freelancer.name}
                            </Link>
                            <div className="flex items-center gap-3 mt-1 text-xs text-gray-600">
                                <div className="flex items-center gap-1">
                                    <Star size={12} className="text-amber-400 fill-amber-400" />
                                    <span className="font-semibold">
                                        {freelancer.rating.toFixed(1)}
                                    </span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Briefcase size={12} />
                                    <span>{freelancer.completedOrders} заказов</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <MapPin size={12} />
                                    <span>{freelancer.location}</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                            <span>{response.createdAt.split("T")[0]}</span>
                        </div>
                    </div>
                    <p className="text-sm text-gray-700 leading-relaxed mb-3">{response.text}</p>
                    <div className="flex flex-wrap gap-1.5 mb-3">
                        {freelancer.skills.slice(0, 5).map((skill) => (
                            <span
                                key={skill}
                                className="px-2 py-0.5 text-xs font-medium bg-indigo-50 text-indigo-700 rounded border border-indigo-100"
                            >
                                {skill}
                            </span>
                        ))}
                        {freelancer.skills.length > 5 && (
                            <span className="px-2 py-0.5 text-xs font-medium text-gray-500">
                                +{freelancer.skills.length - 5}
                            </span>
                        )}
                    </div>
                    <div className="flex items-center gap-2">
                        <Link
                            to={`/profile/${freelancer.id}`}
                            className="px-4 py-1.5 bg-white border border-gray-300 rounded-lg text-sm font-semibold text-gray-700 hover:border-indigo-300 hover:text-indigo-700 hover:bg-indigo-50 transition-all"
                        >
                            Профиль
                        </Link>
                        {!isAuthenticated ? (
                            <Link
                                to="/auth"
                                state={{
                                    background: location,
                                    redirectTo: `/messages/${freelancer.id}`,
                                }}
                                className="px-4 py-1.5 bg-indigo-600 text-white rounded-lg text-sm font-semibold shadow-md shadow-indigo-500/20 hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-500/30 transition-all"
                            >
                                Написать
                            </Link>
                        ) : isOwnProfile ? (
                            <button
                                className="opacity-50 px-4 py-1.5 bg-indigo-600 text-white rounded-lg text-sm font-semibold shadow-md shadow-indigo-500/20 hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-500/30 transition-all"
                                disabled
                            >
                                Это вы
                            </button>
                        ) : (
                            <Link
                                to={`/messages/${freelancer.id}`}
                                className="px-4 py-1.5 bg-indigo-600 text-white rounded-lg text-sm font-semibold shadow-md shadow-indigo-500/20 hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-500/30 transition-all"
                            >
                                Написать
                            </Link>
                        )}
                        <div className="ml-auto text-right">
                            <div className="text-lg font-bold text-gray-900">
                                {freelancer.pricePerHour
                                    ? `₽${freelancer.pricePerHour.toLocaleString()}/час`
                                    : "Договорная"}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
