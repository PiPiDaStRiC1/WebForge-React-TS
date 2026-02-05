import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';
import type { Freelancer } from '@/types';

interface TopUserCardProps {
    performer: Freelancer;
    index: number;
}

const PODIUM_MEDALS = ['🥇', '🥈', '🥉'];
const PODIUM_COLORS = [
    'from-yellow-400 to-amber-500',
    'from-gray-300 to-gray-400',
    'from-orange-400 to-amber-600',
];

export const TopUserCard = ({performer, index}: TopUserCardProps) => {

    return (
        <div
            className={`cursor-pointer relative group animate-slide-in-left ${index === 0 ? 'md:col-start-2 md:row-start-1' : ''}`}
            style={{ animationDelay: `${index * 200}ms` }}
        >
            <div className={`bg-gradient-to-br ${PODIUM_COLORS[index]} rounded-2xl p-6 text-white shadow-2xl hover:-translate-y-2 transition-all duration-300`}>
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-5xl">
                    {PODIUM_MEDALS[index]}
                </div>

                <Link 
                    to={`/profile/${performer.id}`}
                    className="mt-6 mb-4"
                >
                    <img
                        src={performer.picture.medium}
                        alt={performer.name}
                        className="w-24 h-24 rounded-full mx-auto border-4 border-white shadow-lg"
                    />
                </Link>

                <div className="text-center">
                    <h3 className="text-xl font-bold mb-1">{performer.name}</h3>
                    <Link 
                        to={`/profile/${performer.id}`}
                        className="text-sm opacity-90 mb-3 hover:underline"
                    >
                        @{performer.login}
                    </Link>
                    
                    <div className="flex items-center justify-center gap-1 mb-2">
                        <Star size={16} fill="white" />
                        <span className="font-bold">{performer.rating}</span>
                    </div>

                    <div className="text-sm opacity-90">
                        {performer.completedOrders} заказов
                    </div>

                    <div className="mt-4 flex flex-wrap gap-1 justify-center">
                        {performer.skills.length > 0 && (
                            <>
                                {performer.skills.slice(0, 3).map(skill => (
                                    <span
                                        key={skill}
                                        className="px-2 py-1 bg-white/20 backdrop-blur-sm rounded-lg text-xs"
                                    >
                                        {skill}
                                    </span>
                                ))}
                                {performer.skills.length > 3 && (
                                    <span className="px-2 py-1 bg-white/20 backdrop-blur-sm rounded-lg text-xs">
                                        +{performer.skills.length - 3} ещё
                                    </span>
                                )}
                            </>
                        )}
                    </div>

                    <div className="mt-4 pt-4 border-t border-white/20">
                        <span className="text-2xl font-bold">{performer.pricePerHour}₽</span>
                        <span className="text-sm opacity-90">/час</span>
                    </div>
                </div>
            </div>
        </div>
    )
}