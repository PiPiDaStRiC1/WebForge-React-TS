import { useState } from "react";

interface DangerProps {
    handleDeleteAccount: () => void;
}

export const Danger = ({ handleDeleteAccount }: DangerProps) => {
    const [isWarning, setIsWarning] = useState(false);

    return (
        <div>
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-red-900">Опасная зона</h2>
                <p className="text-sm text-red-600 mt-1">Необратимые действия с аккаунтом</p>
            </div>

            <div className="space-y-4 max-w-lg">
                <div className="bg-red-100 border-2 border-red-300 rounded-xl p-4">
                    <h3 className="font-semibold text-red-900 mb-2">Удаление аккаунта</h3>
                    <p className="text-sm text-red-700 mb-4">
                        Безвозвратное удаление всех данных. Это действие нельзя отменить.
                    </p>
                    {!isWarning ? (
                        <button
                            className="cursor-pointer px-4 py-2 bg-red-600 text-white rounded-lg font-medium text-sm"
                            onClick={() => setIsWarning(!isWarning)}
                        >
                            Удалить аккаунт на всегда
                        </button>
                    ) : (
                        <div className="flex gap-3">
                            <button
                                className="cursor-pointer px-3 py-2 bg-red-600 text-white rounded-lg font-medium text-sm"
                                onClick={handleDeleteAccount}
                            >
                                Вы уверены?
                            </button>
                            <button
                                className="cursor-pointer px-4 py-2 bg-gray-600 text-white rounded-lg font-medium text-sm"
                                onClick={() => setIsWarning(false)}
                            >
                                Отмена
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
