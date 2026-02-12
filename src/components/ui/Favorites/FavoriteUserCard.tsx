import { memo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { BadgeCheck, MapPin, Heart } from "lucide-react";
import { AvatarPreloader } from "@/components/common";
import { useCurrentUser, useFavorites } from "@/hooks";
import type { UserData } from "@/types";

interface UserCardProps {
    user: UserData;
}

export const FavoriteUserCard = memo(({ user }: UserCardProps) => {
    const location = useLocation();
    const { toggleFavorite, isFavorite } = useFavorites();
    const { data: currentUser } = useCurrentUser();
    const [isLoadingAvatar, setIsLoadingAvatar] = useState(!!user.picture);
    const [isFavoriteUser, setIsFavoriteUser] = useState(isFavorite(user.id));

    const isOwnProfile = currentUser?.id === user.id;

    const handleToggleFavorite = () => {
        toggleFavorite(user.id);
        setIsFavoriteUser(!isFavoriteUser);
    };

    return (
        <article className="group flex flex-col bg-white/80 backdrop-blur-sm border border-gray-200/60 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:border-indigo-200/60 hover:-translate-y-1 transition-all duration-300">
            <div className="relative bg-gradient-to-br from-slate-50 to-indigo-50/30 p-4 border-b border-gray-100">
                <div className="flex items-start gap-3">
                    <div className="relative flex-shrink-0">
                        {isLoadingAvatar && <AvatarPreloader />}
                        <Link to={`/profile/${user.id}`}>
                            {user.picture ? (
                                <>
                                    <img
                                        src={user.picture.medium}
                                        alt={`${user.name} ${user.lastName}`}
                                        className="w-16 h-16 rounded-xl object-cover border-2 border-white shadow-md group-hover:scale-105 transition-transform"
                                        onLoad={() => setIsLoadingAvatar(false)}
                                    />
                                    {!isLoadingAvatar && user.status === "verified" && (
                                        <span className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center shadow-md">
                                            <BadgeCheck size={14} className="text-white" />
                                        </span>
                                    )}
                                </>
                            ) : (
                                <div className="w-16 h-16 rounded-xl rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-4xl font-bold">
                                    {user.name?.charAt(0).toUpperCase() || "U"}
                                </div>
                            )}
                        </Link>
                    </div>

                    <div className="min-w-0 flex-1">
                        <h3 className="text-base font-bold text-gray-900">
                            {user.name} {user.lastName}
                        </h3>
                        <h4 className="text-gray-600 text-[0.8rem] mb-1">@{user.login}</h4>
                        <div className="mt-0.5 flex items-center gap-1.5 text-xs text-gray-600">
                            <MapPin size={12} className="text-gray-400 flex-shrink-0" />
                            <span className="truncate">{user.location}</span>
                        </div>
                    </div>
                    <button
                        className={`${isFavoriteUser ? "text-rose-500 border-rose-300 bg-rose-50" : "text-gray-400 border-gray-200 bg-white"} cursor-pointer flex-shrink-0 w-9 h-9 flex items-center justify-center rounded-lg hover:scale-110 active:scale-95 transition-all duration-200`}
                        aria-label="В избранное"
                        onClick={handleToggleFavorite}
                    >
                        <Heart
                            size={16}
                            className="hover:scale-110 active:scale-95 hover:animate-pulse"
                        />
                    </button>
                </div>
            </div>

            <div className="flex flex-col h-full p-4 space-y-2">
                <div className="flex flex-col flex-grow gap-4">
                    <p className="text-sm text-gray-600 leading-relaxed line-clamp-2">
                        {user.bio ? user.bio : "Информация не указана"}
                    </p>
                </div>
                <div className="pt-2 border-t border-gray-100">
                    <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500 font-medium">Стоимость</span>
                        <span className="text-base font-bold text-gray-900">
                            {user.pricePerHour
                                ? `₽${user.pricePerHour.toLocaleString()}/час`
                                : "Договорная"}
                        </span>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-2 pt-1">
                    <Link
                        to={`/profile/${user.id}`}
                        className="h-10 inline-flex items-center justify-center bg-white border border-gray-300 rounded-lg text-sm font-semibold text-gray-700 hover:border-indigo-300 hover:text-indigo-700 hover:bg-indigo-50 transition-all"
                    >
                        Профиль
                    </Link>
                    {isOwnProfile ? (
                        <button className="opacity-50 h-10 inline-flex items-center justify-center bg-indigo-600 text-white rounded-lg text-sm font-semibold shadow-md shadow-indigo-500/20 hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-500/30 transition-all">
                            Написать
                        </button>
                    ) : (
                        <Link
                            to="/auth"
                            state={{ background: location, redirectTo: `/messages/${user.id}` }}
                            className="h-10 inline-flex items-center justify-center bg-indigo-600 text-white rounded-lg text-sm font-semibold shadow-md shadow-indigo-500/20 hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-500/30 transition-all"
                        >
                            Написать
                        </Link>
                    )}
                </div>
            </div>
        </article>
    );
});
