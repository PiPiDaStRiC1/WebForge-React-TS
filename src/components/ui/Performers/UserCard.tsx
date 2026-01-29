import {memo, useState} from 'react';
import { Link } from "react-router-dom"
import {Star, MapPin, Heart, BadgeCheck, Briefcase} from 'lucide-react'
import type { Freelancer } from '@/types';
import {AvatarPreloader} from '@/components/common'

interface UserCardProps {
    user: Freelancer
}

export const UserCard = memo(({user}: UserCardProps) => {
    const [isLoadingAvatar, setIsLoadingAvatar] = useState(true);

    return (
        <article className="group flex flex-col bg-white/80 backdrop-blur-sm border border-gray-200/60 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:border-indigo-200/60 hover:-translate-y-1 transition-all duration-300">
            <div className="relative bg-gradient-to-br from-slate-50 to-indigo-50/30 p-4 border-b border-gray-100">
                <div className="flex items-start gap-3">
                    <div className="relative flex-shrink-0">
                        {isLoadingAvatar && <AvatarPreloader />}
                        <Link to={`/profile/${user.id}`}>
                            <img
                                src={user.picture.medium}
                                alt={user.name}
                                className="cursor-pointer w-16 h-16 rounded-xl object-cover border-2 border-white shadow-md group-hover:scale-105 transition-transform duration-300"
                                onLoad={() => setIsLoadingAvatar(false)}
                            />
                        </Link>
                        {!isLoadingAvatar && user.status === 'verified' && (
                            <span className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center shadow-md">
                                <BadgeCheck size={14} className="text-white" />
                            </span>
                        )}
                    </div>

                    <div className="min-w-0 flex-1">
                        <h3 className="text-base font-bold text-gray-900">{user.name}</h3>
                        <h4 className='text-gray-600 text-[0.8rem] mb-1'>@{user.login}</h4>
                        <div className="mt-0.5 flex items-center gap-1.5 text-xs text-gray-600">
                            <MapPin size={12} className="text-gray-400 flex-shrink-0" />
                            <span className="truncate">{user.location}</span>
                        </div>
                        
                        <div className="mt-2 flex items-center flex-col gap-2">
                            <div className='flex justify-between w-full gap-4'>
                                <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-700">
                                    <Star size={12} className="text-amber-400 fill-amber-400" />
                                    {user.rating.toFixed(1)}
                                </span>
                                <span className="text-xs text-gray-500">
                                    {user.completedOrders} заказов
                                </span>
                            </div>
                            <span className="inline-flex items-center gap-1 text-xs font-medium text-indigo-600">
                                <Briefcase size={12} className="text-indigo-500" />
                                {user.experience === 0 ? 'Менее года' : user.experience <= 4 ? `${user.experience} года` : `${user.experience} лет`} опыта
                            </span>
                        </div>
                    </div>

                    <button
                        type="button"
                        className="flex-shrink-0 w-9 h-9 flex items-center justify-center rounded-lg bg-white border border-gray-200 text-gray-400 hover:text-rose-500 hover:border-rose-300 hover:bg-rose-50 hover:scale-110 active:scale-95 transition-all duration-200"
                        aria-label="В избранное"
                    >
                        <Heart size={16} className="hover:scale-110 active:scale-95 hover:animate-pulse" />
                    </button>
                </div>
            </div>

            <div className="flex flex-col h-full p-4 space-y-2">
                <div className="flex flex-col flex-grow gap-4">
                    <p className="text-sm text-gray-600 leading-relaxed line-clamp-2">{user.bio}</p>
                    <div className="flex flex-wrap gap-1.5">
                        {user.skills.map((s: string) => (
                            <span
                                key={s}
                                className="px-2.5 py-1 text-xs font-medium bg-indigo-50 text-indigo-700 rounded-lg border border-indigo-100"
                            >
                                {s}
                            </span>
                        ))}
                    </div>
                </div>
                <div className="pt-2 border-t border-gray-100">
                    <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500 font-medium">Стоимость</span>
                        <span className="text-base font-bold text-gray-900">
                            {user.pricePerHour ? `₽${user.pricePerHour.toLocaleString()}/час` : 'Договорная'}
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
                    <Link
                        to="/messages"
                        className="h-10 inline-flex items-center justify-center bg-indigo-600 text-white rounded-lg text-sm font-semibold shadow-md shadow-indigo-500/20 hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-500/30 transition-all"
                    >
                        Написать
                    </Link>
                </div>
            </div>
        </article>
    )
})