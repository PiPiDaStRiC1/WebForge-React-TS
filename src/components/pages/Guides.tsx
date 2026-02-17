import { useState } from "react";
import {
    BookOpen,
    Clock,
    Users,
    Shield,
    DollarSign,
    TrendingUp,
    Zap,
    Search,
    ArrowRight,
    Star,
} from "lucide-react";

interface Guide {
    id: number;
    title: string;
    description: string;
    category: string;
    readTime: string;
    difficulty: "Начинающий" | "Средний" | "Продвинутый";
    icon: typeof BookOpen;
    gradient: string;
}

const GUIDES_DATA: Guide[] = [
    // Для заказчиков
    {
        id: 1,
        title: "Как правильно составить техническое задание",
        description:
            "Подробное руководство по созданию ТЗ, которое поможет исполнителю точно понять вашу задачу и выполнить её качественно.",
        category: "Для заказчиков",
        readTime: "10 мин",
        difficulty: "Начинающий",
        icon: BookOpen,
        gradient: "from-blue-500 to-indigo-600",
    },
    {
        id: 2,
        title: "Выбор исполнителя: на что обратить внимание",
        description:
            "Критерии оценки исполнителей: рейтинг, портфолио, отзывы, стоимость работ. Как не ошибиться с выбором.",
        category: "Для заказчиков",
        readTime: "8 мин",
        difficulty: "Начинающий",
        icon: Users,
        gradient: "from-indigo-500 to-purple-600",
    },
    {
        id: 3,
        title: "Эффективная коммуникация с исполнителем",
        description:
            "Как правильно общаться, давать обратную связь и контролировать ход работы для достижения лучшего результата.",
        category: "Для заказчиков",
        readTime: "7 мин",
        difficulty: "Средний",
        icon: Users,
        gradient: "from-purple-500 to-pink-600",
    },
    {
        id: 4,
        title: "Разрешение спорных ситуаций",
        description:
            "Что делать, если результат не устраивает, как запросить доработки и когда обращаться в арбитраж.",
        category: "Для заказчиков",
        readTime: "12 мин",
        difficulty: "Продвинутый",
        icon: Shield,
        gradient: "from-pink-500 to-red-600",
    },

    // Для исполнителей
    {
        id: 5,
        title: "Создание привлекательного профиля",
        description:
            "Как оформить профиль, написать продающее описание, загрузить портфолио и получить первые заказы.",
        category: "Для исполнителей",
        readTime: "15 мин",
        difficulty: "Начинающий",
        icon: Star,
        gradient: "from-emerald-500 to-teal-600",
    },
    {
        id: 6,
        title: "Стратегия ценообразования",
        description:
            "Как правильно установить цены на свои услуги, учитывая опыт, конкуренцию и рыночные ставки.",
        category: "Для исполнителей",
        readTime: "10 мин",
        difficulty: "Средний",
        icon: DollarSign,
        gradient: "from-teal-500 to-cyan-600",
    },
    {
        id: 7,
        title: "Повышение рейтинга и репутации",
        description:
            "Практические советы по увеличению рейтинга, получению положительных отзывов и выходу в топ исполнителей.",
        category: "Для исполнителей",
        readTime: "12 мин",
        difficulty: "Средний",
        icon: TrendingUp,
        gradient: "from-cyan-500 to-blue-600",
    },
    {
        id: 8,
        title: "Автоматизация и масштабирование",
        description:
            "Инструменты и методы для увеличения количества заказов без потери качества. Шаблоны, чек-листы, CRM.",
        category: "Для исполнителей",
        readTime: "18 мин",
        difficulty: "Продвинутый",
        icon: Zap,
        gradient: "from-orange-500 to-amber-600",
    },

    // Оплата и безопасность
    {
        id: 9,
        title: "Безопасная сделка: как это работает",
        description:
            "Подробное объяснение механизма защиты платежей, этапов сделки и гарантий для обеих сторон.",
        category: "Оплата и безопасность",
        readTime: "8 мин",
        difficulty: "Начинающий",
        icon: Shield,
        gradient: "from-green-500 to-emerald-600",
    },
    {
        id: 10,
        title: "Способы оплаты и вывода средств",
        description:
            "Все доступные методы пополнения счета и вывода заработанных денег. Лимиты, комиссии, сроки.",
        category: "Оплата и безопасность",
        readTime: "10 мин",
        difficulty: "Начинающий",
        icon: DollarSign,
        gradient: "from-lime-500 to-green-600",
    },
    {
        id: 11,
        title: "Налоги для фрилансеров",
        description:
            "Нужно ли платить налоги с дохода на платформе, как оформить самозанятость или ИП, какие отчеты сдавать.",
        category: "Оплата и безопасность",
        readTime: "20 мин",
        difficulty: "Продвинутый",
        icon: BookOpen,
        gradient: "from-yellow-500 to-orange-600",
    },
    {
        id: 12,
        title: "Защита от мошенничества",
        description:
            "Распространенные схемы обмана, признаки мошенников, как защитить свой аккаунт и средства.",
        category: "Оплата и безопасность",
        readTime: "15 мин",
        difficulty: "Средний",
        icon: Shield,
        gradient: "from-red-500 to-pink-600",
    },
];

const CATEGORIES = [
    { id: "all", name: "Все гайды" },
    { id: "Для заказчиков", name: "Для заказчиков" },
    { id: "Для исполнителей", name: "Для исполнителей" },
    { id: "Оплата и безопасность", name: "Оплата и безопасность" },
];

const DIFFICULTY_COLORS = {
    Начинающий: "bg-green-100 text-green-700",
    Средний: "bg-yellow-100 text-yellow-700",
    Продвинутый: "bg-red-100 text-red-700",
};

const Guides = () => {
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");

    const filteredGuides = GUIDES_DATA.filter((guide) => {
        const matchesCategory = selectedCategory === "all" || guide.category === selectedCategory;
        const matchesSearch =
            guide.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            guide.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div>
            <section className="relative">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-100 rounded-full blur-3xl opacity-40" />
                    <div className="absolute -bottom-32 -left-32 w-[28rem] h-[28rem] bg-purple-100 rounded-full blur-3xl opacity-40" />
                </div>

                <div className="relative pt-14 pb-10">
                    <div className="text-center max-w-3xl mx-auto">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-indigo-100 text-sm font-medium text-indigo-600 mb-5">
                            <BookOpen size={16} className="text-indigo-500" />
                            База знаний для успешной работы
                        </div>

                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-gray-900 mb-4">
                            Руководства и гайды
                        </h1>
                        <p className="text-lg text-gray-600">
                            Пошаговые инструкции для эффективной работы на платформе
                        </p>

                        <div className="mt-8 max-w-2xl mx-auto">
                            <div className="relative">
                                <Search
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                                    size={20}
                                />
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Поиск по гайдам..."
                                    className="w-full h-14 pl-12 pr-4 bg-white/70 backdrop-blur-sm border border-gray-200 rounded-xl outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all shadow-lg"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 flex flex-wrap justify-center gap-2">
                        {CATEGORIES.map((cat) => (
                            <button
                                key={cat.id}
                                type="button"
                                onClick={() => setSelectedCategory(cat.id)}
                                className={`cursor-pointer px-4 py-2 rounded-xl font-semibold text-sm transition-all ${
                                    selectedCategory === cat.id
                                        ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/25"
                                        : "bg-white/70 backdrop-blur-sm border border-gray-200 text-gray-700 hover:border-indigo-200 hover:text-indigo-700"
                                }`}
                            >
                                {cat.name}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-10">
                {filteredGuides.length === 0 ? (
                    <div className="text-center py-20">
                        <div className="text-6xl mb-4">🔍</div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">Гайды не найдены</h3>
                        <p className="text-gray-600">
                            Попробуйте изменить запрос или выбрать другую категорию
                        </p>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredGuides.map((guide, index) => {
                            const Icon = guide.icon;
                            return (
                                <div
                                    key={guide.id}
                                    className="group cursor-pointer bg-white/70 backdrop-blur-sm border border-gray-200 rounded-2xl overflow-hidden hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 animate-slide-in-left"
                                    style={{ animationDelay: `${index * 50}ms` }}
                                >
                                    <div
                                        className={`h-32 bg-gradient-to-br ${guide.gradient} relative overflow-hidden`}
                                    >
                                        <div className="absolute inset-0 opacity-20">
                                            <div className="absolute top-0 right-0 w-24 h-24 bg-white rounded-full -translate-y-12 translate-x-12" />
                                            <div className="absolute bottom-0 left-0 w-20 h-20 bg-white rounded-full translate-y-10 -translate-x-10" />
                                        </div>
                                        <div className="relative h-full flex items-center justify-center">
                                            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                                <Icon size={32} className="text-white" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-6">
                                        <div className="flex items-center justify-between mb-3">
                                            <span className="text-xs font-semibold text-indigo-600">
                                                {guide.category}
                                            </span>
                                            <span
                                                className={`text-xs font-semibold px-2 py-1 rounded-lg ${DIFFICULTY_COLORS[guide.difficulty]}`}
                                            >
                                                {guide.difficulty}
                                            </span>
                                        </div>
                                        <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
                                            {guide.title}
                                        </h3>
                                        <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                                            {guide.description}
                                        </p>
                                        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                            <div className="flex items-center gap-1 text-sm text-gray-500">
                                                <Clock size={14} />
                                                <span>{guide.readTime}</span>
                                            </div>
                                            <div className="flex items-center gap-1 text-indigo-600 font-semibold text-sm group-hover:gap-2 transition-all">
                                                <span className="hover:underline">Читать</span>
                                                <ArrowRight size={16} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </section>
        </div>
    );
};

export default Guides;
