import { useState } from 'react';
import { Star } from 'lucide-react';
import { AvatarPreloader } from '@/components/common';
import type { Freelancer } from '@/types';

interface OtherUserCard {
    performer: Freelancer;
    index: number
}

export const OtherUserCard = ({performer, index}: OtherUserCard) => {
    const [isLoadingAvatar, setIsLoadingAvatar] = useState(true);

    return (
        <div
            className="cursor-pointer bg-white/70 backdrop-blur-sm border border-gray-200 rounded-2xl p-6 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 animate-slide-in-left"
            style={{ animationDelay: `${600 + (index * 100)}ms` }}
        >
            <div className="relative flex justify-center items-center mb-4">
                {isLoadingAvatar && <AvatarPreloader />}
                <img
                    loading='lazy'
                    src={performer.picture.medium}
                    alt={performer.name}
                    className="w-16 h-16 rounded-full mx-auto"
                    onLoad={() => setIsLoadingAvatar(false)}
                />
            </div>
            <div className="text-center">
                <h3 className="font-bold text-gray-900 mb-1">{performer.name}</h3>
                <p className="text-sm text-gray-600 mb-3">{performer.login}</p>
                
                <div className="flex items-center justify-center gap-1 text-yellow-500 mb-2">
                    <Star size={14} fill="currentColor" />
                    <span className="text-sm font-semibold text-gray-900">{performer.rating}</span>
                </div>

                <div className="text-xs text-gray-600 mb-3">
                    {performer.completedOrders} заказов
                </div>
                <div className="flex flex-wrap gap-1 justify-center mb-3">
                    {performer.skills.map(skill => (
                        <span
                            key={skill}
                            className="px-2 py-1 bg-gray-100 rounded-lg text-xs text-gray-700"
                        >
                            {skill}
                        </span>
                    ))}
                </div>
                <div className="text-lg font-bold text-gray-900">
                    {performer.pricePerHour}₽<span className="text-sm font-normal text-gray-600">/час</span>
                </div>
            </div>
        </div>
    )
}