import { Shield, FileText, AlertCircle, Mail } from 'lucide-react';

export const Terms = () => {
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
                            <FileText size={16} className="text-indigo-500" />
                            Юридическая информация
                        </div>

                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-gray-900 mb-4">
                            Условия использования
                        </h1>
                        <p className="text-lg text-gray-600">
                            Последнее обновление: 26 января 2026 г.
                        </p>
                    </div>
                </div>
            </section>

            <section className="py-10">
                <div className="max-w-4xl mx-auto bg-white/70 backdrop-blur-sm border border-gray-200 rounded-2xl p-8 md:p-12">
                    <div className="mb-10">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center">
                                <FileText size={20} className="text-indigo-600" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900">1. Общие положения</h2>
                        </div>
                        <div className="text-gray-700 leading-relaxed space-y-3">
                            <p>
                                Настоящие Условия использования («Условия») регулируют использование платформы Kwork Clone («Платформа») и связанных с ней услуг.
                            </p>
                            <p>
                                Регистрируясь и используя Платформу, вы соглашаетесь соблюдать настоящие Условия. Если вы не согласны с любым из положений, пожалуйста, не используйте наши услуги.
                            </p>
                        </div>
                    </div>

                    <div className="mb-10">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                                <Shield size={20} className="text-purple-600" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900">2. Права и обязанности пользователей</h2>
                        </div>
                        <div className="text-gray-700 leading-relaxed space-y-3">
                            <p className="font-semibold">Вы имеете право:</p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Размещать заказы и откликаться на существующие заказы</li>
                                <li>Получать поддержку от администрации Платформы</li>
                                <li>Использовать систему безопасной сделки</li>
                                <li>Оставлять отзывы о выполненных работах</li>
                            </ul>
                            <p className="font-semibold mt-4">Вы обязуетесь:</p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Предоставлять достоверную информацию при регистрации</li>
                                <li>Не нарушать права интеллектуальной собственности третьих лиц</li>
                                <li>Не использовать Платформу в незаконных целях</li>
                                <li>Соблюдать профессиональную этику в общении</li>
                            </ul>
                        </div>
                    </div>

                    <div className="mb-10">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                                <span className="text-green-600 text-xl">💳</span>
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900">3. Оплата и комиссии</h2>
                        </div>
                        <div className="text-gray-700 leading-relaxed space-y-3">
                            <p>
                                Платформа взимает комиссию в размере 10% от стоимости заказа для исполнителей. Для премиум-аккаунтов комиссия составляет 5%.
                            </p>
                            <p>
                                Все платежи осуществляются через систему безопасной сделки. Средства передаются исполнителю только после подтверждения выполнения работы заказчиком.
                            </p>
                            <p>
                                Возврат средств возможен в случае невыполнения обязательств исполнителем или по соглашению сторон.
                            </p>
                        </div>
                    </div>

                    <div className="mb-10">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
                                <AlertCircle size={20} className="text-red-600" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900">4. Ответственность и гарантии</h2>
                        </div>
                        <div className="text-gray-700 leading-relaxed space-y-3">
                            <p>
                                Платформа выступает посредником между заказчиками и исполнителями. Мы не несем ответственности за качество выполненных работ, но предоставляем механизмы разрешения споров.
                            </p>
                            <p>
                                Пользователи несут полную ответственность за содержание размещаемой информации и соблюдение законодательства.
                            </p>
                            <p>
                                Платформа не гарантирует бесперебойную работу сервиса и не несет ответственности за технические сбои.
                            </p>
                        </div>
                    </div>

                    <div className="mb-10">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-yellow-100 rounded-xl flex items-center justify-center">
                                <span className="text-yellow-600 text-xl">📝</span>
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900">5. Изменение условий</h2>
                        </div>
                        <div className="text-gray-700 leading-relaxed space-y-3">
                            <p>
                                Мы оставляем за собой право изменять настоящие Условия в любое время. Об изменениях будет сообщено через email или уведомление на Платформе.
                            </p>
                            <p>
                                Продолжение использования сервиса после внесения изменений означает ваше согласие с новыми Условиями.
                            </p>
                        </div>
                    </div>

                    <div className="pt-8 border-t border-gray-200">
                        <div className="flex items-start gap-3">
                            <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center flex-shrink-0">
                                <Mail size={20} className="text-indigo-600" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-gray-900 mb-2">Контакты</h3>
                                <p className="text-gray-700 leading-relaxed">
                                    По вопросам, связанным с настоящими Условиями, пишите на:
                                    <a href="mailto:support@webforge.ru" className="text-indigo-600 hover:underline ml-1">
                                        support@webforge.ru
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}