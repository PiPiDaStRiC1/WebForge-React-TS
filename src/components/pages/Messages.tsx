import { MessageCircle } from "lucide-react";
import { Chats } from "@/components/ui";

const Messages = () => {
    return (
        <div className="min-h-screen pb-10">
            <section className="relative">
                <div className="absolute inset-0 h-64 pointer-events-none">
                    <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-200 rounded-full blur-3xl opacity-40" />
                    <div className="absolute -bottom-32 -left-32 w-[28rem] h-[28rem] bg-purple-200 rounded-full blur-3xl opacity-40" />
                </div>

                <div className="relative pt-20 pb-15">
                    <div className="max-w-7xl mx-auto">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-indigo-100 text-sm font-medium text-indigo-600 mb-4">
                            <MessageCircle size={16} />
                            Сообщения
                        </div>
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                            Чаты с исполнителями и заказчиками
                        </h1>
                        <p className="text-lg text-gray-600">
                            Обсудите детали проекта напрямую с фрилансерами, уточните детали у
                            заказчиков
                        </p>
                    </div>
                </div>
            </section>
            <Chats />
        </div>
    );
};

export default Messages;
