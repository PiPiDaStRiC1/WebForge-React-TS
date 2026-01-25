import { Link } from "react-router-dom";

export const CTA = () => {
    return (
        <section className="relative flex w-full justify-center items-center py-16">
            <div className="relative bg-white border-2 border-indigo-100 rounded-3xl p-12 text-center overflow-hidden shadow-xl">
                <div className="absolute inset-0 opacity-30">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-100 rounded-full filter blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-100 rounded-full filter blur-3xl"></div>
                </div>

                <div className="relative">
                    <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                        Готовы начать?
                    </h2>
                    <p className="text-xl text-gray-600 mb-8">
                        Создайте первый заказ или начните зарабатывать уже сегодня
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link to="/create-order" className="px-8 py-4 bg-indigo-600 text-white font-semibold rounded-xl shadow-lg shadow-indigo-500/30 hover:bg-indigo-700 hover:scale-105 hover:shadow-xl hover:shadow-indigo-500/40 transition-all">
                            Разместить заказ
                        </Link>
                        <Link to="/signup" className="px-8 py-4 bg-white text-indigo-600 font-semibold rounded-xl border-2 border-indigo-200 hover:border-indigo-300 hover:bg-indigo-50 transition-all">
                            Стать исполнителем
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}