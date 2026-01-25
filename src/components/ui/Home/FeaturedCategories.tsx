import { Link } from "react-router-dom";
import {Code, Layout, Palette, TrendingUp} from 'lucide-react'

export const FeaturedCategories = () => {

    return (
        <section className="py-6">
            <div className="text-center mb-12">
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                    Популярные категории
                </h2>
                <p className="text-lg text-gray-600">
                    Выберите направление и начните работать
                </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <Link to="/categories/frontend" className="group bg-white p-6 rounded-2xl border border-gray-200 hover:border-indigo-500 hover:shadow-xl transition-all">
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform">
                        <Layout size={28} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Frontend</h3>
                    <p className="text-gray-600 text-sm mb-3">React, Vue, Angular разработка</p>
                    <div className="text-indigo-600 font-semibold text-sm">245 заказов →</div>
                </Link>

                <Link to="/categories/backend" className="group bg-white p-6 rounded-2xl border border-gray-200 hover:border-indigo-500 hover:shadow-xl transition-all">
                    <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform">
                        <Code size={28} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Backend</h3>
                    <p className="text-gray-600 text-sm mb-3">Node.js, Python, PHP серверы</p>
                    <div className="text-indigo-600 font-semibold text-sm">189 заказов →</div>
                </Link>

                <Link to="/categories/design" className="group bg-white p-6 rounded-2xl border border-gray-200 hover:border-indigo-500 hover:shadow-xl transition-all">
                    <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform">
                        <Palette size={28} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Дизайн</h3>
                    <p className="text-gray-600 text-sm mb-3">UI/UX, прототипирование</p>
                    <div className="text-indigo-600 font-semibold text-sm">156 заказов →</div>
                </Link>

                <Link to="/categories/seo" className="group bg-white p-6 rounded-2xl border border-gray-200 hover:border-indigo-500 hover:shadow-xl transition-all">
                    <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform">
                        <TrendingUp size={28} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">SEO</h3>
                    <p className="text-gray-600 text-sm mb-3">Продвижение и оптимизация</p>
                    <div className="text-indigo-600 font-semibold text-sm">98 заказов →</div>
                </Link>
            </div>
        </section>
    )
}