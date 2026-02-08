import {Link, useLocation} from "react-router-dom";
import {Mail, Phone, MapPin, Github, Twitter, Youtube} from "lucide-react";
import {Logo} from "@/components/common/index";

export const Footer = () => {
    const location = useLocation();
    const isChatPage = location.pathname.includes("/messages/");

    if (isChatPage) return null;

    return (
        <footer className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 border-t border-gray-200">
            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
                    <div className="lg:col-span-2">
                        <Link to="/" className="flex items-center gap-2.5 mb-4">
                            <Logo />
                        </Link>
                        <p className="text-gray-600 mb-4 max-w-sm">
                            Фриланс-платформа для веб-разработки. Находите лучших специалистов или зарабатывайте на своих навыках.
                        </p>
                        <div className="flex gap-3">
                            <a
                                href="https://github.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 bg-white border border-gray-200 rounded-lg flex items-center justify-center text-gray-600 hover:text-indigo-600 hover:border-indigo-300 hover:shadow-md transition-all">
                                <Github size={20} />
                            </a>
                            <a
                                href="https://twitter.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 bg-white border border-gray-200 rounded-lg flex items-center justify-center text-gray-600 hover:text-indigo-600 hover:border-indigo-300 hover:shadow-md transition-all">
                                <Twitter size={20} />
                            </a>
                            <a
                                href="https://youtube.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 bg-white border border-gray-200 rounded-lg flex items-center justify-center text-gray-600 hover:text-indigo-600 hover:border-indigo-300 hover:shadow-md transition-all">
                                <Youtube size={20} />
                            </a>
                        </div>
                    </div>
                    <div>
                        <h3 className="font-bold text-gray-900 mb-4">Платформа</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link to="/about" className="text-gray-600 hover:text-indigo-600 transition-colors">
                                    О нас
                                </Link>
                            </li>
                            <li>
                                <Link to="/how-it-works" className="text-gray-600 hover:text-indigo-600 transition-colors">
                                    Как это работает
                                </Link>
                            </li>
                            <li>
                                <Link to="/pricing" className="text-gray-600 hover:text-indigo-600 transition-colors">
                                    Тарифы
                                </Link>
                            </li>
                            <li>
                                <Link to="/blog" className="text-gray-600 hover:text-indigo-600 transition-colors">
                                    Блог
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-gray-200 pt-8 mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="flex items-center gap-3 text-gray-600">
                            <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-600">
                                <Mail size={18} />
                            </div>
                            <div>
                                <div className="text-sm text-gray-500">Email</div>
                                <a href="mailto:support@webforge.com" className="font-medium hover:text-indigo-600 transition-colors">
                                    support@webforge.com
                                </a>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 text-gray-600">
                            <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-600">
                                <Phone size={18} />
                            </div>
                            <div>
                                <div className="text-sm text-gray-500">Телефон</div>
                                <a href="tel:+78005553535" className="font-medium hover:text-indigo-600 transition-colors">
                                    +7 (800) 555-35-35
                                </a>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 text-gray-600">
                            <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-600">
                                <MapPin size={18} />
                            </div>
                            <div>
                                <div className="text-sm text-gray-500">Адрес</div>
                                <div className="font-medium">Москва, Россия</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="border-t border-gray-200 pt-8 flex items-center justify-center gap-4 text-sm text-gray-600">
                    <p>© {new Date().getFullYear()} WebForge. Все права защищены.</p>
                </div>
            </div>
        </footer>
    );
};
