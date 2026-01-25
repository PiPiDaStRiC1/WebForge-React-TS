import { Link } from "react-router-dom";
import {ArrowRight} from 'lucide-react';

export const LastOrders = () => {
    
    return (
        <section className="py-16">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Последние заказы</h2>
                    <p className="text-gray-600">Актуальные предложения от заказчиков</p>
                </div>
                <Link to="/orders" className="flex items-center gap-2 text-indigo-600 font-semibold hover:gap-3 transition-all">
                    Все заказы <ArrowRight size={20} />
                </Link>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-gray-200 hover:shadow-lg transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-lg">
                            Frontend
                        </span>
                        <span className="text-sm text-gray-500">2 часа назад</span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                        Разработка лендинга для стартапа
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        Нужен современный лендинг на React с анимациями. Дизайн готов в Figma.
                    </p>
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <div className="text-xl font-bold text-gray-900">₽25,000</div>
                        <div className="text-sm text-gray-500">3 отклика</div>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-gray-200 hover:shadow-lg transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                        <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs font-semibold rounded-lg">
                            Backend
                        </span>
                        <span className="text-sm text-gray-500">5 часов назад</span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                        API для мобильного приложения
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        Требуется REST API на Node.js + PostgreSQL. Интеграция с платежной системой.
                    </p>
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <div className="text-xl font-bold text-gray-900">₽40,000</div>
                        <div className="text-sm text-gray-500">7 откликов</div>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-gray-200 hover:shadow-lg transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                        <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-lg">
                            SEO
                        </span>
                        <span className="text-sm text-gray-500">1 день назад</span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                        Продвижение интернет-магазина
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        SEO-оптимизация и продвижение в Яндекс и Google. Магазин на WooCommerce.
                    </p>
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <div className="text-xl font-bold text-gray-900">₽30,000</div>
                        <div className="text-sm text-gray-500">5 откликов</div>
                    </div>
                </div>
            </div>
        </section>
    )
}