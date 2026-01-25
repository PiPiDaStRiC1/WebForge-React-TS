import MainImg from '@/assets/Home/main-image.png'
import { Search, Zap} from "lucide-react"

export const Hero = () => {
    return (
        <section className="relative overflow-hidden">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
                <div className="absolute top-0 left-0 w-96 h-96 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-32 left-1/2 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
            </div>

            <div className="relative py-15 lg:py-20">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-indigo-100 text-sm font-medium text-indigo-600 mb-6">
                            <Zap size={16} className="text-indigo-500" />
                            Фриланс для веб-разработки
                        </div>
                        
                        <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight mb-6 text-gray-900">
                            Найди идеального <br/>
                            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">веб-разработчика</span>
                        </h1>
                        <p className="text-lg lg:text-xl text-gray-600 mb-8">
                            Фриланс-платформа для веб-проектов. Frontend, Backend, SEO и все, что нужно для вашего сайта.
                        </p>
                        
                        <div className="flex gap-3 mb-6">
                            <div className="flex-1 relative">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                <input
                                    type="text"
                                    placeholder="Найти заказ или исполнителя..."
                                    className="w-full h-14 pl-12 pr-4 text-gray-900 bg-white rounded-xl border border-gray-200 shadow-sm outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all"
                                />
                            </div>
                            <button className="px-8 h-14 bg-indigo-600 text-white font-semibold rounded-xl shadow-lg shadow-indigo-500/30 hover:bg-indigo-700 hover:shadow-xl hover:shadow-indigo-500/40 transition-all">
                                Найти
                            </button>
                        </div>

                        <div className="flex gap-8 text-sm">
                            <div>
                                <div className="text-2xl font-bold text-gray-900">100+</div>
                                <div className="text-gray-600">Исполнителей</div>
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-gray-900">300+</div>
                                <div className="text-gray-600">Заказов</div>
                            </div>
                        </div>
                    </div>

                    <div className="hidden lg:block">
                        <img src={MainImg} alt="main image" className='rounded-2xl'/>
                    </div>
                </div>
            </div>
    </section>
    )
}