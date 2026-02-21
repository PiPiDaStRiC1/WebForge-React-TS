import { ChevronRight } from "lucide-react";

export const Security = () => {
    return (
        <div>
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Безопасность</h2>
                <p className="text-sm text-gray-600 mt-1">Пароль и двухфакторная аутентификация</p>
            </div>

            <div className="space-y-3 max-w-lg">
                <button className="cursor-pointer w-full py-4 px-5 bg-gray-50 border border-gray-200 rounded-xl text-left hover:bg-gray-100 transition-colors group">
                    <div className="flex items-center justify-between">
                        <div>
                            <button className="cursor-pointer font-medium text-gray-900">
                                Изменить пароль
                            </button>
                        </div>
                        <ChevronRight
                            className="text-gray-400 group-hover:text-gray-600"
                            size={20}
                        />
                    </div>
                </button>

                <button className="cursor-pointer w-full py-4 px-5 bg-gray-50 border border-gray-200 rounded-xl text-left hover:bg-gray-100 transition-colors group">
                    <div className="flex items-center justify-between">
                        <div>
                            <button className="cursor-pointer font-medium text-gray-900">
                                Двухфакторная аутентификация
                            </button>
                            <div className="text-sm text-gray-500 mt-1">Отключена</div>
                        </div>
                        <ChevronRight
                            className="text-gray-400 group-hover:text-gray-600"
                            size={20}
                        />
                    </div>
                </button>
            </div>
        </div>
    );
};
