import { useState } from "react";
import { Link } from "react-router-dom";
import { Star } from "lucide-react";
import type { Freelancer } from "@/types";

interface OtherUserCardProps {
    performer: Freelancer;
    index: number;
}

export const OtherUserCard = ({ performer, index }: OtherUserCardProps) => {
    const [isLoadingAvatar, setIsLoadingAvatar] = useState(!!performer.picture);

    return (
        <div
            className="cursor-pointer bg-white/70 backdrop-blur-sm border border-gray-200 rounded-2xl p-6 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 animate-slide-in-left"
            style={{ animationDelay: `${600 + index * 100}ms` }}
        >
            <Link
                to={`/profile/${performer.id}`}
                className="relative flex justify-center items-center mb-4"
            >
                {isLoadingAvatar && (
                    <div className="absolute w-16 h-16 rounded-full shadow-2xl bg-gray-200 animate-pulse" />
                )}
                {performer.picture ? (
                    <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-white shadow-2xl bg-white">
                        <img
                            loading="lazy"
                            src={performer.picture.medium}
                            alt={performer.name}
                            className="w-16 h-16 rounded-full mx-auto"
                            onLoad={() => setIsLoadingAvatar(false)}
                        />
                    </div>
                ) : (
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-4xl font-bold">
                        {performer.name?.charAt(0).toUpperCase() || "U"}
                    </div>
                )}
            </Link>
            <div className="text-center">
                <h3 className="font-bold text-gray-900 mb-1">{performer.name}</h3>
                <Link
                    to={`/profile/${performer.id}`}
                    className="text-sm text-gray-500 hover:underline mb-2 inline-block"
                >
                    @{performer.login}
                </Link>

                <div className="flex items-center justify-center gap-1 text-yellow-500 mb-2">
                    <Star size={14} fill="currentColor" />
                    <span className="text-sm font-semibold text-gray-900">{performer.rating}</span>
                </div>

                <div className="text-xs text-gray-600 mb-3">
                    {performer.completedOrders} заказов
                </div>
                <div className="flex flex-wrap gap-1 justify-center mb-3">
                    {performer.skills.map((skill) => (
                        <span
                            key={skill}
                            className="px-2 py-1 bg-gray-100 rounded-lg text-xs text-gray-700"
                        >
                            {skill}
                        </span>
                    ))}
                </div>
                <div className="text-lg font-bold text-gray-900">
                    {performer.pricePerHour}₽
                    <span className="text-sm font-normal text-gray-600">/час</span>
                </div>
            </div>
        </div>
    );
};
