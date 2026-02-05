import { useState } from "react"
import { Link } from "react-router-dom"
import {AvatarPreloader} from '@/components/common'
import {Star, MapPin, BadgeCheck} from 'lucide-react'
import type { Client } from '@/types'

interface ClientCardProps {
    client: Client
}

export const ClientCard = ({client}: ClientCardProps) => {
    const [isLoadingAvatar, setIsLoadingAvatar] = useState(!!client.picture);

    return (
        <div className="bg-white/70 backdrop-blur-sm border border-gray-200 rounded-2xl p-6 shadow-xl">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Заказчик</h2>
            <Link to={`/profile/${client.id}`} className="block group">
                <div className="flex items-start gap-3">
                    <div className="relative flex-shrink-0">
                        {isLoadingAvatar && <AvatarPreloader />}
                        {client.picture ? (
                            <>
                                <img
                                    src={client.picture.medium}
                                    alt={client.name}
                                    className="w-16 h-16 rounded-xl object-cover border-2 border-white shadow-md group-hover:scale-105 transition-transform"
                                    onLoad={() => setIsLoadingAvatar(false)}
                                />
                            </>
                        ) : (
                            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-4xl font-bold" >
                                {client.name?.charAt(0).toUpperCase() || 'U'}
                            </div>
                        )}
                        {!isLoadingAvatar && client.status === 'verified' && (
                            <span className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center shadow-md">
                                <BadgeCheck size={14} className="text-white" />
                            </span>
                        )}
                    </div>
                    <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
                            {client.name} {client.lastName}
                        </h3>
                        <p className="text-sm text-gray-600">@{client.login}</p>
                        <div className="mt-2 flex items-center gap-3 text-xs text-gray-600">
                            <div className="flex items-center gap-1">
                                <Star size={12} className="text-amber-400 fill-amber-400" />
                                <span>{client.rating.toFixed(1)}</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <MapPin size={12} />
                                <span>{client.location ? client.location : 'Не указано'}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    )
}