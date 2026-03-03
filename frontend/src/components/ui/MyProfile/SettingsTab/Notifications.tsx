export const Notifications = () => {
    return (
        <div>
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Уведомления</h2>
                <p className="text-sm text-gray-600 mt-1">Управление оповещениями</p>
            </div>

            <div className="space-y-6 max-w-2xl">
                <label className="flex items-center justify-between cursor-pointer p-4 rounded-xl hover:bg-gray-50 transition-colors">
                    <div>
                        <div className="font-medium text-gray-900">Email-уведомления</div>
                        <div className="text-sm text-gray-500">Получать письма о новых заказах</div>
                    </div>
                    <input
                        type="checkbox"
                        defaultChecked
                        className="w-5 h-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                    />
                </label>

                <label className="flex items-center justify-between cursor-pointer p-4 rounded-xl hover:bg-gray-50 transition-colors">
                    <div>
                        <div className="font-medium text-gray-900">Push-уведомления</div>
                        <div className="text-sm text-gray-500">Уведомления в браузере</div>
                    </div>
                    <input
                        type="checkbox"
                        className="w-5 h-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                    />
                </label>

                <label className="flex items-center justify-between cursor-pointer p-4 rounded-xl hover:bg-gray-50 transition-colors">
                    <div>
                        <div className="font-medium text-gray-900">Новостная рассылка</div>
                        <div className="text-sm text-gray-500">Советы и обновления платформы</div>
                    </div>
                    <input
                        type="checkbox"
                        defaultChecked
                        className="w-5 h-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                    />
                </label>
            </div>
        </div>
    );
};
