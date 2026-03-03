export const HowWork = () => {
    return (
        <section className="relative bg-white/60 backdrop-blur-sm py-16">
            <div>
                <div className="text-center mb-12">
                    <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                        Как это работает
                    </h2>
                    <p className="text-lg text-gray-600">Три простых шага до начала работы</p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    <div className="text-center">
                        <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold text-2xl mx-auto mb-6">
                            1
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">Создайте заказ</h3>
                        <p className="text-gray-600 max-w-[300px] mx-auto">
                            Опишите задачу, укажите бюджет и сроки выполнения
                        </p>
                    </div>

                    <div className="text-center">
                        <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold text-2xl mx-auto mb-6">
                            2
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">
                            Выберите исполнителя
                        </h3>
                        <p className="text-gray-600 max-w-[300px] mx-auto">
                            Получите предложения от проверенных специалистов
                        </p>
                    </div>

                    <div className="text-center">
                        <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold text-2xl mx-auto mb-6">
                            3
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">Получите результат</h3>
                        <p className="text-gray-600 max-w-[300px] mx-auto">
                            Оплачивайте только после проверки и одобрения работы
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};
