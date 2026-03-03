import { Shield, Zap, Users } from "lucide-react";

export const Opportunity = () => {

    return (
        <section className="relative bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50 py-16 overflow-hidden">
            <div className="absolute inset-0 opacity-30">
                <div className="absolute top-10 right-10 w-72 h-72 bg-indigo-200 rounded-full filter blur-3xl"></div>
                <div className="absolute bottom-10 left-10 w-72 h-72 bg-purple-200 rounded-full filter blur-3xl"></div>
            </div>

            <div className="relative">
                <div className="text-center mb-12">
                    <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                        Почему выбирают нас
                    </h2>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    <div className="text-center group bg-white/60 backdrop-blur-sm p-8 rounded-2xl border border-white/60 hover:shadow-xl transition-all">
                        <div className="w-16 h-16 mx-auto mb-4 bg-indigo-100 rounded-2xl flex items-center justify-center group-hover:bg-indigo-200 transition-colors">
                            <Shield className="w-8 h-8 text-indigo-600" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Безопасные сделки</h3>
                        <p className="text-gray-600">
                            Платежи через систему гарантий. Деньги переводятся только после проверки
                        </p>
                    </div>

                    <div className="text-center group bg-white/60 backdrop-blur-sm p-8 rounded-2xl border border-white/60 hover:shadow-xl transition-all">
                        <div className="w-16 h-16 mx-auto mb-4 bg-indigo-100 rounded-2xl flex items-center justify-center group-hover:bg-indigo-200 transition-colors">
                            <Zap className="w-8 h-8 text-indigo-600" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Быстрый старт</h3>
                        <p className="text-gray-600">
                            Получите первые отклики в течение нескольких часов после публикации
                        </p>
                    </div>

                    <div className="text-center group bg-white/60 backdrop-blur-sm p-8 rounded-2xl border border-white/60 hover:shadow-xl transition-all">
                        <div className="w-16 h-16 mx-auto mb-4 bg-indigo-100 rounded-2xl flex items-center justify-center group-hover:bg-indigo-200 transition-colors">
                            <Users className="w-8 h-8 text-indigo-600" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Проверенные специалисты</h3>
                        <p className="text-gray-600">
                            Система рейтинга и отзывов помогает выбрать лучших исполнителей
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}