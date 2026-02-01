import { Bell, Shield, CreditCard, User } from 'lucide-react'
import { useUser } from '@/hooks';
import { ErrorAlert } from '@/components/common'

export const SettingsProfile = () => {
    const { user } = useUser();

    if (!user) {    
        return <ErrorAlert />
    }

    return (
        <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center">
                        <User className="text-indigo-600" size={20} />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-gray-900">Настройки аккаунта</h2>
                        <p className="text-sm text-gray-600">Управление личными данными</p>
                    </div>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Имя
                        </label>
                        <input
                            type="text"
                            defaultValue={user.name}
                            className="w-full h-11 px-4 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Фамилия
                        </label>
                        <input
                            type="text"
                            defaultValue={user.lastName}
                            className="w-full h-11 px-4 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            defaultValue={user.email}
                            className="w-full h-11 px-4 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                        />
                    </div>

                    <button className="w-full py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-colors">
                        Сохранить изменения
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                        <Bell className="text-purple-600" size={20} />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-gray-900">Уведомления</h2>
                        <p className="text-sm text-gray-600">Управление оповещениями</p>
                    </div>
                </div>

                <div className="space-y-4">
                    <label className="flex items-center justify-between cursor-pointer">
                        <div>
                            <div className="font-medium text-gray-900">Email-уведомления</div>
                            <div className="text-sm text-gray-500">Получать письма о новых заказах</div>
                        </div>
                        <input
                            type="checkbox"
                            defaultChecked
                            className="w-5 h-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                    </label>

                    <label className="flex items-center justify-between cursor-pointer">
                        <div>
                            <div className="font-medium text-gray-900">Push-уведомления</div>
                            <div className="text-sm text-gray-500">Уведомления в браузере</div>
                        </div>
                        <input
                            type="checkbox"
                            className="w-5 h-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                    </label>

                    <label className="flex items-center justify-between cursor-pointer">
                        <div>
                            <div className="font-medium text-gray-900">Новостная рассылка</div>
                            <div className="text-sm text-gray-500">Советы и обновления платформы</div>
                        </div>
                        <input
                            type="checkbox"
                            defaultChecked
                            className="w-5 h-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                    </label>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                        <Shield className="text-green-600" size={20} />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-gray-900">Безопасность</h2>
                        <p className="text-sm text-gray-600">Пароль и двухфакторная аутентификация</p>
                    </div>
                </div>

                <div className="space-y-4">
                    <button className="w-full py-3 px-4 bg-gray-50 border border-gray-200 rounded-xl text-left hover:bg-gray-100 transition-colors">
                        <div className="font-medium text-gray-900">Изменить пароль</div>
                        <div className="text-sm text-gray-500 mt-1">Последнее изменение: {user.createdAt}</div>
                    </button>

                    <button className="w-full py-3 px-4 bg-gray-50 border border-gray-200 rounded-xl text-left hover:bg-gray-100 transition-colors">
                        <div className="font-medium text-gray-900">Двухфакторная аутентификация</div>
                        <div className="text-sm text-gray-500 mt-1">Отключена</div>
                    </button>
                </div>
            </div>

            {user.role === 'freelancer' && (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                            <CreditCard className="text-blue-600" size={20} />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-900">Платежи</h2>
                            <p className="text-sm text-gray-600">Способы вывода средств</p>
                        </div>
                    </div>

                    <div className="text-center py-8">
                        <p className="text-gray-500 mb-4">Платежные реквизиты не добавлены</p>
                        <button className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-colors">
                            Добавить карту
                        </button>
                    </div>
                </div>
            )}

            <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-red-900 mb-4">Опасная зона</h3>
                <div className="space-y-3">
                    <button className="w-full py-3 px-4 bg-white border border-red-200 text-red-600 rounded-xl font-medium hover:bg-red-50 transition-colors text-left">
                        Деактивировать аккаунт
                    </button>
                    <button className="w-full py-3 px-4 bg-red-600 text-white rounded-xl font-medium hover:bg-red-700 transition-colors">
                        Удалить аккаунт навсегда
                    </button>
                </div>
            </div>
        </div>
    )
}