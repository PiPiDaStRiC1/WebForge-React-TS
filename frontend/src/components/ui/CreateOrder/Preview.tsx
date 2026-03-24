import { useEffect } from "react";
import { X, Clock, Calendar, Briefcase, DollarSign, MessageCircle } from "lucide-react";
import type { OrderFormData } from "@/hooks";

interface PreviewProps {
    onClose: () => void;
    data: OrderFormData;
}

export const Preview = ({ onClose, data }: PreviewProps) => {
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };

        document.body.addEventListener("keydown", handleEscape);
        return () => {
            document.body.removeEventListener("keydown", handleEscape);
        };
    });

    useEffect(() => {
        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = "";
        };
    });

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
            <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 rounded-2xl shadow-2xl animate-scale-in">
                <button
                    onClick={onClose}
                    className="cursor-pointer sticky top-4 right-4 z-10 ml-auto mb-4 flex items-center justify-center w-10 h-10 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-xl text-gray-600 hover:text-red-500 hover:border-red-300 hover:bg-red-50 transition-all shadow-lg"
                    aria-label="Закрыть"
                >
                    <X size={20} />
                </button>
                <div className="px-8 pb-6">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-indigo-100 text-sm font-medium text-indigo-600 mb-4">
                        <Briefcase size={16} />
                        Предпросмотр заказа
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                        Так будет выглядеть ваш заказ
                    </h2>
                    <p className="text-sm text-gray-600">Проверьте всё перед публикацией</p>
                </div>
                <div className="px-8 pb-8">
                    <div className="bg-white/70 backdrop-blur-sm border border-gray-200 rounded-2xl p-6 shadow-xl">
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="px-3 py-1 rounded-lg text-xs font-semibold bg-green-100 text-green-700">
                                        🆕 Новый
                                    </span>
                                    <span className="text-xs text-gray-500">
                                        <Calendar size={12} className="inline mr-1" />
                                        {new Date().toLocaleDateString("ru-RU")}
                                    </span>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900">
                                    {data.title || "Название заказа"}
                                </h3>
                            </div>
                            <div className="text-right ml-4">
                                <div className="text-2xl font-bold text-indigo-600">
                                    {data.budgetMin ? Number(data.budgetMin).toLocaleString() : "0"}{" "}
                                    -{" "}
                                    {data.budgetMax ? Number(data.budgetMax).toLocaleString() : "0"}
                                    ₽
                                </div>
                                <div className="text-xs text-gray-500">Бюджет проекта</div>
                            </div>
                        </div>

                        <p className="text-gray-700 mb-4 whitespace-pre-line">
                            Описание задачи будет здесь...
                        </p>

                        {data.skills && data.skills.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-4">
                                {data.skills.map((skill) => (
                                    <span
                                        key={skill}
                                        className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-lg text-xs font-medium border border-indigo-100"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        )}

                        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                            <div className="flex items-center gap-4 text-sm text-gray-600">
                                <div className="flex items-center gap-1">
                                    <Clock size={16} />
                                    <span>{data.deadlineDays || "0"} дней</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <DollarSign size={16} />
                                    <span>{data.category}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <MessageCircle size={16} />
                                    <span>0 откликов</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    ID: <span># 000</span>
                                </div>
                            </div>
                            <button
                                type="button"
                                className="cursor-pointer px-6 py-2 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-colors"
                            >
                                Откликнуться
                            </button>
                        </div>
                    </div>
                    <div className="mt-4 bg-blue-50/70 backdrop-blur-sm border border-blue-100 rounded-xl p-4">
                        <p className="text-sm text-gray-700">
                            <strong className="text-blue-700">💡 Обратите внимание:</strong> После
                            публикации заказ появится в общей ленте и будет доступен всем
                            исполнителям. Вы сможете редактировать его в течение 24 часов.
                        </p>
                    </div>
                    <div className="mt-6 flex items-center gap-3">
                        <button
                            onClick={onClose}
                            className="cursor-pointer flex-1 h-12 bg-white border border-gray-200 text-gray-700 rounded-xl font-semibold hover:border-indigo-200 hover:text-indigo-700 transition-all"
                        >
                            Вернуться к редактированию
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
