import { Link } from 'react-router-dom';
import { Star, MapPin, Briefcase, BadgeCheck } from 'lucide-react';
import type { OrderResponse, Freelancer } from '@/types';
import { useState } from 'react';
import { AvatarPreloader, UserCardPreloader } from '@/components/common';

interface ResponseCardProps {
    response: OrderResponse;
    freelancer?: Freelancer;
}

export const ResponseCard = ({ response, freelancer }: ResponseCardProps) => {
    const [isLoadingAvatar, setIsLoadingAvatar] = useState(true);

    if (!freelancer) {
        return <UserCardPreloader />
    }

    return (
        <div className="bg-gradient-to-br from-white/80 to-indigo-50/30 backdrop-blur-sm border border-gray-200 rounded-xl p-5 hover:shadow-lg hover:border-indigo-200 transition-all duration-300 mb-4">
            <div className="flex items-start gap-4">
                <div className="relative flex-shrink-0">
                    {isLoadingAvatar && <AvatarPreloader />}
                    <Link to={`/profile/${freelancer.id}`}>
                        <img
                            src={freelancer.picture.medium}
                            alt={freelancer.name}
                            className="w-14 h-14 rounded-xl object-cover border-2 border-white shadow-md hover:scale-105 transition-transform"
                            onLoad={() => setIsLoadingAvatar(false)}
                        />
                    </Link>
                    {freelancer.status === 'verified' && (
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
                                    <span className="font-semibold">{freelancer.rating.toFixed(1)}</span>
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
                            <span>{response.createdAt.split('T')[0]}</span>
                        </div>
                    </div>
                    <p className="text-sm text-gray-700 leading-relaxed mb-3">
                        {response.text}
                    </p>
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
                        <Link
                            to="/messages"
                            className="px-4 py-1.5 bg-indigo-600 text-white rounded-lg text-sm font-semibold shadow-md shadow-indigo-500/20 hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-500/30 transition-all"
                        >
                            Написать
                        </Link>
                        <div className="ml-auto text-right">
                            <div className="text-lg font-bold text-gray-900">
                                {freelancer.pricePerHour ? `₽${freelancer.pricePerHour.toLocaleString()}/час` : 'Договорная'}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};