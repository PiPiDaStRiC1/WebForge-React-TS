import { useNavigate } from 'react-router-dom';
import { useProfile, useUser } from '@/hooks';
import { DollarSign, MapPin, Globe, X, Pencil } from 'lucide-react';
import { VerificationProfile } from './VerificationProfile';
import { ErrorAlert } from '@/components/common'


export const ProfileTab = () => {
    const navigate = useNavigate();
    const { user } = useUser();
    const { isEditing, isSaving, changedData, handleChangeBaseUser, handleChangeFreelancer, handleSave, handleAbort, handleEdit, handleExit } = useProfile();

    if (!user) {
        return <ErrorAlert />
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 group">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-bold text-gray-900">О себе</h2>
                        {!isEditing && !isSaving && (
                            <button
                                onClick={handleEdit}
                                className="cursor-pointer transition-opacity p-2 hover:bg-gray-100 rounded-lg text-gray-600 hover:text-indigo-600"
                                title="Редактировать"
                            >
                                <Pencil size={20}/>
                            </button>
                        )}
                    </div>
                    {isEditing ? (
                        <textarea
                            value={changedData.bio}
                            onChange={(e) => handleChangeBaseUser('bio', e.target.value)}
                            placeholder="Расскажите о себе, своем опыте и навыках..."
                            className="w-full h-32 p-4 bg-gray-50 border border-gray-200 rounded-xl resize-none outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                        />
                    ) : isSaving ? (
                        <div className="h-32 bg-gray-200 rounded-xl animate-pulse" />
                    ) : (
                        <p className="text-gray-600 whitespace-pre-wrap">
                            {user.bio || 'Добро пожаловать! Заполните информацию о себе.'}
                        </p>
                    )}
                </div>

                {user.role === 'freelancer' ? (
                    <>
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                            <h2 className="text-xl font-bold text-gray-900 mb-4">Навыки</h2>
                            {isEditing ? (
                                <input
                                    type="text"
                                    placeholder="React, TypeScript, Node.js..."
                                    defaultValue={user.skills?.join(', ')}
                                    className="w-full h-11 px-4 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                                    onChange={(e) => handleChangeFreelancer('skills', e.target.value.split(',').map(skill => skill.trim()))}
                                />
                            ) : isSaving ? (
                                <div className="flex flex-wrap gap-2">
                                    <div className="h-8 bg-gray-200 rounded-lg w-20" />
                                    <div className="h-8 bg-gray-200 rounded-lg w-24" />
                                    <div className="h-8 bg-gray-200 rounded-lg w-28" />
                                </div>
                            ) : (
                                <div className="flex flex-wrap gap-2">
                                    {user.skills && user.skills.length > 0 ? (
                                        user.skills.map((skill, index) => (
                                            <span key={index} className="px-3 py-1.5 bg-indigo-50 text-indigo-600 rounded-lg text-sm font-medium">
                                                {skill}
                                            </span>
                                        ))
                                    ) : (
                                        <span className="px-3 py-1.5 bg-gray-100 text-gray-600 rounded-lg text-sm">
                                            Добавьте навыки
                                        </span>
                                    )}
                                </div>
                            )}
                        </div>

                        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                            <h2 className="text-xl font-bold text-gray-900 mb-4">Портфолио</h2>
                            <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-xl">
                                <p className="text-gray-500">Добавьте свои работы</p>
                                <button className="mt-4 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                                    Загрузить проект
                                </button>
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                            <h2 className="text-xl font-bold text-gray-900 mb-4">Активные заказы</h2>
                            <div className="text-center py-12">
                                <p className="text-gray-500 mb-4">У вас пока нет активных заказов</p>
                                <button
                                    onClick={() => navigate('/create-order')}
                                    className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-colors"
                                >
                                    Создать заказ
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </div>

            <div className="space-y-6">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Статистика</h3>
                    <div className="space-y-4">
                        {user.role === 'freelancer' ? (
                            <>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-600">Выполнено заказов</span>
                                    <span className="text-lg font-bold text-gray-900">{user.completedOrders}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-600">Рейтинг</span>
                                    <span className="text-lg font-bold text-gray-900">
                                        {user.rating > 0 ? `${user.rating.toFixed(1)} ⭐` : '—'}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-600">Заработано</span>
                                    <span className="text-lg font-bold text-gray-900">{user.earning.toLocaleString('ru-RU')} ₽</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-600">Опыт</span>
                                    <span className="text-lg font-bold text-gray-900">
                                        {user.experience > 0 ? `${user.experience} ${user.experience === 1 ? 'год' : user.experience < 5 ? 'года' : 'лет'}` : 'Новичок'}
                                    </span>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-600">Размещено заказов</span>
                                    <span className="text-lg font-bold text-gray-900">{user.placedOrders}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-600">Потрачено</span>
                                    <span className="text-lg font-bold text-gray-900">{user.spending.toLocaleString('ru-RU')} ₽</span>
                                </div>
                            </>
                        )}
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Дополнительно</h3>
                    <div className="space-y-3">
                        {isEditing ? (
                            <>
                                <div>
                                    <label className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                                        <MapPin size={14} />
                                        Локация
                                    </label>
                                    <input
                                        type="text"
                                        defaultValue={user.location}
                                        placeholder="Город, Страна"
                                        className="w-full h-10 px-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm"
                                        onChange={(e) => handleChangeBaseUser('location', e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                                        <Globe size={14} />
                                        Веб-сайт
                                    </label>
                                    <input
                                        type="url"
                                        defaultValue={user.website}
                                        placeholder="https://example.com"
                                        className="w-full h-10 px-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm"
                                        onChange={(e) => handleChangeBaseUser('website', e.target.value)}
                                    />
                                </div>
                                {user.role === 'freelancer' && (
                                    <div>
                                        <label className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                                            <DollarSign size={14} />
                                            Ставка в час
                                        </label>
                                        <input
                                            type="number"
                                            defaultValue={user.hourlyRate || ''}
                                            placeholder="1000"
                                            className="w-full h-10 px-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm"
                                            onChange={(e) => handleChangeFreelancer('hourlyRate', Number(e.target.value))}
                                        />
                                    </div>
                                )}
                            </>
                        ) : isSaving ? (
                            <div className="h-25 bg-gray-200 rounded w-full" />
                        ) : (
                            <div className="space-y-3">
                                {user.location ? (
                                    <div className="flex items-center gap-2 text-gray-700">
                                        <MapPin size={14} className="text-gray-400" />
                                        <span className="text-sm">{user.location}</span>
                                    </div>
                                ) : null}
                                {user.website ? (
                                    <div className="flex items-center gap-2 text-gray-700">
                                        <Globe size={14} className="text-gray-400" />
                                        <a href={user.website} target="_blank" rel="noopener noreferrer" className="text-sm text-indigo-600 hover:underline">
                                            {user.website.replace(/^https?:\/\//, '')}
                                        </a>
                                    </div>
                                ) : null}
                                {user.role === 'freelancer' && user.hourlyRate ? (
                                    <div className="flex items-center gap-2 text-gray-700">
                                        <DollarSign size={14} className="text-gray-400" />
                                        <span className="text-sm">{user.hourlyRate.toLocaleString('ru-RU')} ₽/час</span>
                                    </div>
                                ) : null}
                                {!user.location && !user.website && (!user.role || user.role !== 'freelancer' || !user.hourlyRate) && (
                                    <div className="text-sm text-gray-500">
                                        Заполните дополнительную информацию
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
                <VerificationProfile />
            </div>
            
            {(isEditing || isSaving) && (
                <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 animate-in slide-in-from-bottom">
                    {!isSaving ? (
                        <>
                            <button
                                onClick={handleExit}
                                className="px-4 py-3 bg-white text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-all shadow-lg border border-gray-200"
                            >
                                Отменить
                            </button>
                            <button
                                onClick={handleSave}
                                className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-all shadow-lg flex items-center gap-2"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                Сохранить изменения
                            </button>
                        </>
                    ) : (
                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-3 px-6 py-3 bg-white text-indigo-600 rounded-xl shadow-lg border border-indigo-200">
                                <div className="w-5 h-5 border-2 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />
                                <span className="font-medium">Сохранение...</span>
                            </div>
                            <button
                                onClick={handleAbort}
                                className="p-3 bg-white text-red-600 rounded-xl hover:bg-red-50 transition-all shadow-lg border border-gray-200"
                                title="Отменить сохранение"
                            >
                                <X size={20} />
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}