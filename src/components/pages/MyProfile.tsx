import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@/hooks';
import { Camera, Mail, Code, Briefcase, DollarSign, MapPin, Globe, Settings, LogOut, User } from 'lucide-react';
import { ProfileSkeleton, VerificationProfile, SettingsProfile } from '@/components/ui';
import { ErrorAlert } from '@/components/common';

type TabType = 'profile' | 'settings';

export const MyProfile = () => {
    const navigate = useNavigate();
    const {user, error, logOutUser} = useUser();
    const [isEditing, setIsEditing] = useState(false);
    const [activeTab, setActiveTab] = useState<TabType>('profile');
    
    const handleSave = () => {
        localStorage.setItem('user-data', JSON.stringify(user));
        setIsEditing(false);
    };

    if (error) {
        return <ErrorAlert />
    }

    // временно, т.к нет бекенда
    if (!user) {
        return <ProfileSkeleton />;
    }
    
    return (
        <div className="min-h-screen py-8">
            <div className="max-w-4xl mx-auto px-6">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-6">
                    <div className="flex items-start gap-6">
                        <div className="relative group">
                            <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-4xl font-bold">
                                {user.name?.charAt(0).toUpperCase() || 'U'}
                            </div>
                            <button className="cursor-pointer absolute inset-0 bg-black/50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <Camera className="text-white" size={24} />
                            </button>
                        </div>

                        <div className="flex-1">
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                                        {user.name} {user.lastName}
                                    </h1>
                                    <div className="flex items-center gap-3">
                                        <span className={`px-3 py-1 rounded-lg text-sm font-medium ${
                                            user.role === 'freelancer'
                                                ? 'bg-indigo-50 text-indigo-600'
                                                : 'bg-purple-50 text-purple-600'
                                        }`}>
                                            {user.role === 'freelancer' ? (
                                                <span className="flex items-center gap-1.5">
                                                    <Code size={14} />
                                                    Фрилансер
                                                </span>
                                            ) : (
                                                <span className="flex items-center gap-1.5">
                                                    <Briefcase size={14} />
                                                    Заказчик
                                                </span>
                                            )}
                                        </span>
                                        <span className="text-sm text-gray-500">
                                            {user.createdAt}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                                        className="cursor-pointer px-4 py-2 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-colors"
                                    >
                                        {isEditing ? 'Сохранить' : 'Редактировать'}
                                    </button>
                                    <button
                                        onClick={logOutUser}
                                        className="cursor-pointer px-4 py-2 bg-red-50 text-red-600 rounded-xl font-medium hover:bg-red-100 transition-colors flex items-center gap-2"
                                        title="Выйти"
                                    >
                                        <LogOut size={18} />
                                        <span>Выйти</span>
                                    </button>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 text-gray-600">
                                <Mail size={16} />
                                <span className="text-sm">{user.email}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex gap-2 mb-6">
                    <button
                        onClick={() => setActiveTab('profile')}
                        className={`cursor-pointer px-6 py-3 rounded-xl font-medium transition-all flex items-center gap-2 ${
                            activeTab === 'profile'
                                ? 'bg-white text-indigo-600'
                                : 'text-gray-600 hover:bg-white/50'
                        }`}
                    >
                        <User size={18} />
                        Профиль
                    </button>
                    <button
                        onClick={() => setActiveTab('settings')}
                        className={`cursor-pointer px-6 py-3 rounded-xl font-medium transition-all flex items-center gap-2 ${
                            activeTab === 'settings'
                                ? 'bg-white text-indigo-600'
                                : 'text-gray-600 hover:bg-white/50'
                        }`}
                    >
                        <Settings size={18} />
                        Настройки
                    </button>
                </div>

                {activeTab === 'profile' ? (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                            <h2 className="text-xl font-bold text-gray-900 mb-4">О себе</h2>
                            {isEditing ? (
                                <textarea
                                    placeholder="Расскажите о себе, своем опыте и навыках..."
                                    className="w-full h-32 p-4 bg-gray-50 border border-gray-200 rounded-xl resize-none outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                                    defaultValue="Добро пожаловать! Заполните информацию о себе."
                                />
                            ) : (
                                <p className="text-gray-600">
                                    Добро пожаловать! Заполните информацию о себе.
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
                                            className="w-full h-11 px-4 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                                        />
                                    ) : (
                                        <div className="flex flex-wrap gap-2">
                                            <span className="px-3 py-1.5 bg-gray-100 text-gray-600 rounded-lg text-sm">
                                                Добавьте навыки
                                            </span>
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
                                            <span className="text-lg font-bold text-gray-900">0</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-gray-600">Рейтинг</span>
                                            <span className="text-lg font-bold text-gray-900">—</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-gray-600">Заработано</span>
                                            <span className="text-lg font-bold text-gray-900">0 ₽</span>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-gray-600">Размещено заказов</span>
                                            <span className="text-lg font-bold text-gray-900">0</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-gray-600">Потрачено</span>
                                            <span className="text-lg font-bold text-gray-900">0 ₽</span>
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
                                                placeholder="Город, Страна"
                                                className="w-full h-10 px-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm"
                                            />
                                        </div>
                                        <div>
                                            <label className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                                                <Globe size={14} />
                                                Веб-сайт
                                            </label>
                                            <input
                                                type="url"
                                                placeholder="https://example.com"
                                                className="w-full h-10 px-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm"
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
                                                    placeholder="1000"
                                                    className="w-full h-10 px-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm"
                                                />
                                            </div>
                                        )}
                                    </>
                                ) : (
                                    <div className="text-sm text-gray-500">
                                        Заполните дополнительную информацию
                                    </div>
                                )}
                            </div>
                        </div>
                        <VerificationProfile />
                    </div>
                </div>
                ) : (
                    <SettingsProfile />
                )}
            </div>
        </div>
    );
}