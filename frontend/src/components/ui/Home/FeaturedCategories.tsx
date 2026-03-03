import { Link } from "react-router-dom";
import {CATEGORIES} from '@/lib/constants'

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
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 items-center">  
                {CATEGORIES.slice(0, 4).map(cat => (
                    <Link 
                        key={cat.id}
                        to={`/performers?category=${cat.id}`}
                        className="group bg-white h-full p-6 rounded-2xl border border-gray-200 hover:border-indigo-500 hover:shadow-xl transition-all"
                    >
                        <div className={`w-14 h-14 bg-gradient-to-br ${cat.gradient} rounded-xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform`}>
                            <cat.icon />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{cat.name}</h3>
                        <p className="text-gray-600 text-sm mb-3">
                            {cat.subcategories.map((subCat, idx) => (
                                <span 
                                    key={subCat}
                                >   
                                    {subCat}{idx < cat.subcategories.length - 1 ? ', ' : ''}
                                </span>
                            ))}
                        </p>
                    </Link>
                ))}
            </div>
        </section>
    )
}