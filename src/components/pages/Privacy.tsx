import { Shield, Lock, Eye, Cookie, Mail } from 'lucide-react';

export const Privacy = () => {
    return (
        <div>
            <section className="relative">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-100 rounded-full blur-3xl opacity-40" />
                    <div className="absolute -bottom-32 -left-32 w-[28rem] h-[28rem] bg-teal-100 rounded-full blur-3xl opacity-40" />
                </div>

                <div className="relative pt-14 pb-10">
                    <div className="text-center max-w-3xl mx-auto">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-emerald-100 text-sm font-medium text-emerald-600 mb-5">
                            <Shield size={16} className="text-emerald-500" />
                            Защита ваших данных
                        </div>

                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-gray-900 mb-4">
                            Политика конфиденциальности
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
                            <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
                                <Shield size={20} className="text-emerald-600" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900">1. Общая информация</h2>
                        </div>
                        <div className="text-gray-700 leading-relaxed space-y-3">
                            <p>
                                Мы серьезно относимся к защите ваших персональных данных. Настоящая Политика конфиденциальности описывает, какую информацию мы собираем, как используем и защищаем её.
                            </p>
                            <p>
                                Используя нашу Платформу, вы соглашаетесь с условиями настоящей Политики.
                            </p>
                        </div>
                    </div>

                    <div className="mb-10">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                                <Eye size={20} className="text-blue-600" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900">2. Какие данные мы собираем</h2>
                        </div>
                        <div className="text-gray-700 leading-relaxed space-y-3">
                            <p className="font-semibold">При регистрации:</p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Имя, фамилия, email</li>
                                <li>Номер телефона (опционально)</li>
                                <li>Профессиональная информация (навыки, опыт, портфолио)</li>
                            </ul>
                            <p className="font-semibold mt-4">При использовании:</p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>IP-адрес и данные об устройстве</li>
                                <li>История просмотров и действий на Платформе</li>
                                <li>Переписка с другими пользователями</li>
                                <li>Платежная информация (обрабатывается платежными системами)</li>
                            </ul>
                        </div>
                    </div>

                    <div className="mb-10">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                                <span className="text-purple-600 text-xl">🎯</span>
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900">3. Как мы используем данные</h2>
                        </div>
                        <div className="text-gray-700 leading-relaxed space-y-3">
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Для предоставления и улучшения наших услуг</li>
                                <li>Для обработки платежей и транзакций</li>
                                <li>Для отправки важных уведомлений и новостей</li>
                                <li>Для защиты от мошенничества и злоупотреблений</li>
                                <li>Для персонализации контента и рекомендаций</li>
                                <li>Для соблюдения законодательных требований</li>
                            </ul>
                            <p className="mt-4">
                                Мы <strong>не продаем и не передаем</strong> ваши персональные данные третьим лицам в коммерческих целях.
                            </p>
                        </div>
                    </div>

                    <div className="mb-10">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                                <Cookie size={20} className="text-orange-600" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900">4. Файлы cookie и технологии отслеживания</h2>
                        </div>
                        <div className="text-gray-700 leading-relaxed space-y-3">
                            <p>
                                Мы используем файлы cookie для улучшения работы сайта, аналитики и персонализации.
                            </p>
                            <p className="font-semibold">Типы используемых cookie:</p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li><strong>Необходимые:</strong> для работы основных функций (авторизация, корзина)</li>
                                <li><strong>Аналитические:</strong> для изучения поведения пользователей (Google Analytics)</li>
                                <li><strong>Функциональные:</strong> для запоминания ваших предпочтений</li>
                            </ul>
                            <p className="mt-4">
                                Вы можете отключить cookie в настройках браузера, но это может ограничить функциональность сайта.
                            </p>
                        </div>
                    </div>

                    <div className="mb-10">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
                                <Lock size={20} className="text-red-600" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900">5. Безопасность данных</h2>
                        </div>
                        <div className="text-gray-700 leading-relaxed space-y-3">
                            <p>
                                Мы применяем современные технологии защиты:
                            </p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>SSL/TLS шифрование для передачи данных</li>
                                <li>Шифрование паролей с использованием bcrypt</li>
                                <li>Регулярные проверки безопасности и аудит</li>
                                <li>Ограниченный доступ сотрудников к персональным данным</li>
                            </ul>
                            <p className="mt-4">
                                Однако, ни один метод передачи данных в интернете не является абсолютно безопасным. Мы прилагаем все усилия для защиты ваших данных, но не можем гарантировать 100% безопасность.
                            </p>
                        </div>
                    </div>

                    <div className="mb-10">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center">
                                <span className="text-indigo-600 text-xl">✋</span>
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900">6. Ваши права</h2>
                        </div>
                        <div className="text-gray-700 leading-relaxed space-y-3">
                            <p>Вы имеете право:</p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Запросить доступ к своим персональным данным</li>
                                <li>Исправить неточные или неполные данные</li>
                                <li>Удалить свои данные (право на забвение)</li>
                                <li>Ограничить обработку ваших данных</li>
                                <li>Экспортировать данные в машиночитаемом формате</li>
                                <li>Отозвать согласие на обработку данных</li>
                            </ul>
                            <p className="mt-4">
                                Для реализации этих прав напишите на
                                <a href="mailto:privacy@kwork-clone.ru" className="text-emerald-600 hover:underline ml-1">
                                    privacy@kwork-clone.ru
                                </a>
                            </p>
                        </div>
                    </div>

                    <div className="pt-8 border-t border-gray-200">
                        <div className="flex items-start gap-3">
                            <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center flex-shrink-0">
                                <Mail size={20} className="text-emerald-600" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-gray-900 mb-2">Вопросы о конфиденциальности?</h3>
                                <p className="text-gray-700 leading-relaxed">
                                    По вопросам, связанным с обработкой персональных данных:
                                    <a href="mailto:support@webforge.ru" className="text-emerald-600 hover:underline ml-1">
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