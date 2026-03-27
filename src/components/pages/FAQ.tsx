import { useState } from "react";
import {
    Shield,
    Users,
    BookOpen,
    ChevronDown,
    Search,
    HelpCircle,
    MessageCircle,
} from "lucide-react";

interface FAQItem {
    question: string;
    answer: string;
    category: string;
}

const FAQ_DATA: FAQItem[] = [
    // Для заказчиков
    {
        category: "Для заказчиков",
        question: "Как разместить заказ на платформе?",
        answer: 'Нажмите кнопку "Разместить заказ", заполните описание задачи, укажите бюджет и сроки. Исполнители начнут откликаться на ваш заказ в течение нескольких минут.',
    },
    {
        category: "Для заказчиков",
        question: "Как выбрать подходящего исполнителя?",
        answer: "Обратите внимание на рейтинг, количество выполненных заказов, отзывы других заказчиков и портфолио. Вы можете задать дополнительные вопросы исполнителю перед началом работы.",
    },
    {
        category: "Для заказчиков",
        question: "Когда происходит оплата?",
        answer: "Средства замораживаются на вашем счете при начале работы и передаются исполнителю только после того, как вы подтвердите выполнение заказа. Это гарантирует безопасность сделки.",
    },
    {
        category: "Для заказчиков",
        question: "Что делать, если результат не устраивает?",
        answer: "Вы можете запросить доработки согласно условиям заказа. Если исполнитель не выполняет обязательства, обратитесь в службу поддержки для разрешения спора.",
    },

    // Для исполнителей
    {
        category: "Для исполнителей",
        question: "Как начать работать на платформе?",
        answer: "Зарегистрируйтесь, заполните профиль с указанием навыков и опыта, добавьте примеры работ в портфолио. После модерации (1-2 дня) вы сможете откликаться на заказы.",
    },
    {
        category: "Для исполнителей",
        question: "Какова комиссия платформы?",
        answer: "Стандартная комиссия составляет 10% от суммы заказа. Для исполнителей с премиум-аккаунтом комиссия снижается до 5%. Первые 3 заказа - без комиссии для новых пользователей.",
    },
    {
        category: "Для исполнителей",
        question: "Как повысить свой рейтинг?",
        answer: "Выполняйте заказы качественно и в срок, поддерживайте профессиональное общение с заказчиками, быстро отвечайте на сообщения. Положительные отзывы автоматически повышают рейтинг.",
    },
    {
        category: "Для исполнителей",
        question: "Как вывести заработанные деньги?",
        answer: "Вывод доступен на банковскую карту, электронные кошельки или счет ИП. Минимальная сумма вывода - 500₽. Средства зачисляются в течение 1-3 рабочих дней.",
    },

    // Оплата и безопасность
    {
        category: "Оплата и безопасность",
        question: "Какие способы оплаты доступны?",
        answer: "Принимаем банковские карты (Visa, MasterCard, МИР), электронные кошельки (ЮMoney, QIWI), безналичный перевод для юридических лиц.",
    },
    {
        category: "Оплата и безопасность",
        question: "Безопасно ли проводить сделки на платформе?",
        answer: "Да, мы используем систему безопасной сделки. Деньги хранятся на защищенном счете платформы до завершения работы. SSL-шифрование защищает все платежные данные.",
    },
    {
        category: "Оплата и безопасность",
        question: "Что такое безопасная сделка?",
        answer: "При размещении заказа деньги блокируются на вашем счете, но не передаются исполнителю. Они переводятся только после подтверждения выполнения работы заказчиком.",
    },
    {
        category: "Оплата и безопасность",
        question: "Можно ли вернуть деньги?",
        answer: "Да, если исполнитель не приступил к работе или не выполнил условия заказа. Возврат производится в течение 5-7 рабочих дней на тот же способ оплаты.",
    },

    // Общие вопросы
    {
        category: "Общие вопросы",
        question: "Как связаться с поддержкой?",
        answer: "Напишите нам через форму обратной связи, отправьте email на support@webforge.ru или позвоните по телефону 8-800-555-35-35 (звонок бесплатный).",
    },
    {
        category: "Общие вопросы",
        question: "Есть ли мобильное приложение?",
        answer: "Нет, но уже в разработке. Будет доступно в течении этого года на платформах App Store и Goggle Play",
    },
    {
        category: "Общие вопросы",
        question: "Как оставить отзыв о работе?",
        answer: "После завершения заказа вам придет уведомление с просьбой оценить работу. Вы можете поставить оценку от 1 до 5 звезд и написать текстовый отзыв.",
    },
    {
        category: "Общие вопросы",
        question: "Можно ли отменить заказ?",
        answer: "До начала работы - бесплатно. После начала работы возможна отмена с компенсацией исполнителю за уже выполненный объем работ (по соглашению сторон).",
    },
];

const FAQ_CATEGORIES = [
    { id: "all", name: "Все вопросы", icon: HelpCircle },
    { id: "Для заказчиков", name: "Для заказчиков", icon: Users },
    { id: "Для исполнителей", name: "Для исполнителей", icon: BookOpen },
    { id: "Оплата и безопасность", name: "Оплата и безопасность", icon: Shield },
    { id: "Общие вопросы", name: "Общие вопросы", icon: MessageCircle },
];

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");

    const filteredFAQs = FAQ_DATA.filter((faq: FAQItem) => {
        const matchesCategory = selectedCategory === "all" || faq.category === selectedCategory;
        const matchesSearch =
            faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
            faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const toggleAccordion = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="min-h-screen">
            <section className="relative">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-100 rounded-full blur-3xl opacity-40" />
                    <div className="absolute -bottom-32 -left-32 w-[28rem] h-[28rem] bg-purple-100 rounded-full blur-3xl opacity-40" />
                </div>

                <div className="relative pt-14 pb-10">
                    <div className="text-center max-w-3xl mx-auto">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-indigo-100 text-sm font-medium text-indigo-600 mb-5">
                            <HelpCircle size={16} className="text-indigo-500" />
                            Ответы на частые вопросы
                        </div>

                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-gray-900 mb-4">
                            Часто задаваемые вопросы
                        </h1>
                        <p className="text-lg text-gray-600">
                            Не нашли ответ? Свяжитесь с нашей службой поддержки
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
                                    placeholder="Поиск по вопросам..."
                                    className="w-full h-14 pl-12 pr-4 bg-white/70 backdrop-blur-sm border border-gray-200 rounded-xl outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all shadow-lg"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="mt-8 flex flex-wrap justify-center gap-2">
                        {FAQ_CATEGORIES.map((cat) => {
                            const Icon = cat.icon;
                            return (
                                <button
                                    key={cat.id}
                                    type="button"
                                    onClick={() => setSelectedCategory(cat.id)}
                                    className={`cursor-pointer inline-flex items-center gap-2 px-4 py-2 rounded-xl font-semibold text-sm transition-all ${
                                        selectedCategory === cat.id
                                            ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/25"
                                            : "bg-white/70 backdrop-blur-sm border border-gray-200 text-gray-700 hover:border-indigo-200 hover:text-indigo-700"
                                    }`}
                                >
                                    <Icon size={16} />
                                    {cat.name}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </section>

            <section className="py-10">
                <div className="max-w-4xl mx-auto">
                    {filteredFAQs.length === 0 ? (
                        <div className="text-center py-20">
                            <div className="text-6xl mb-4">🔍</div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">
                                Ничего не найдено
                            </h3>
                            <p className="text-gray-600">
                                Попробуйте изменить запрос или выбрать другую категорию
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {filteredFAQs.map((faq, index) => (
                                <div
                                    key={index}
                                    className="bg-white/70 backdrop-blur-sm border border-gray-200 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-lg animate-slide-in-left"
                                    style={{ animationDelay: `${index * 50}ms` }}
                                >
                                    <button
                                        type="button"
                                        onClick={() => toggleAccordion(index)}
                                        className="cursor-pointer w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50/50 transition-colors"
                                    >
                                        <div className="flex items-start gap-3 flex-1">
                                            <div className="mt-1 flex-shrink-0">
                                                <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
                                                    <HelpCircle
                                                        size={18}
                                                        className="text-indigo-600"
                                                    />
                                                </div>
                                            </div>
                                            <div className="flex-1">
                                                <span className="text-xs font-semibold text-indigo-600 mb-1 block">
                                                    {faq.category}
                                                </span>
                                                <h3 className="text-lg font-bold text-gray-900">
                                                    {faq.question}
                                                </h3>
                                            </div>
                                        </div>
                                        <ChevronDown
                                            size={24}
                                            className={`flex-shrink-0 text-gray-400 transition-transform duration-300 ${
                                                openIndex === index ? "rotate-180" : "rotate-0"
                                            }`}
                                        />
                                    </button>

                                    <div
                                        className={`overflow-hidden transition-all duration-300 ${
                                            openIndex === index ? "max-h-96" : "max-h-0"
                                        }`}
                                    >
                                        <div className="px-6 pb-5 pl-[4.5rem]">
                                            <p className="text-gray-700 leading-relaxed">
                                                {faq.answer}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>
            <section className="py-16">
                <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full -translate-y-32 translate-x-32" />
                        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full translate-y-24 -translate-x-24" />
                    </div>

                    <div className="relative">
                        <MessageCircle size={48} className="mx-auto mb-4 opacity-90" />
                        <h2 className="text-3xl font-bold mb-4">Не нашли ответ на свой вопрос?</h2>
                        <p className="text-white/90 mb-6 max-w-2xl mx-auto">
                            Наша команда поддержки работает 24/7 и готова помочь вам в любое время
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                            <a
                                href="mailto:support@webforge.ru"
                                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-indigo-600 rounded-xl font-semibold hover:bg-white/90 transition-colors shadow-lg"
                            >
                                <MessageCircle size={18} />
                                Написать в поддержку
                            </a>
                            <a
                                href="tel:88005553535"
                                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/20 backdrop-blur-sm text-white rounded-xl font-semibold hover:bg-white/30 transition-colors border border-white/30"
                            >
                                📞 8-800-555-35-35
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default FAQ;
