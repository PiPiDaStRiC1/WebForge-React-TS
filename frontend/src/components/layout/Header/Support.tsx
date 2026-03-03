import { Link } from "react-router-dom";
import { MessageCircle, FileText, Shield, Book } from "lucide-react";

interface SupportProps {
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
}

export const Support = ({ isOpen, setIsOpen }: SupportProps) => {

    return (
        <div 
            className={`absolute top-full right-0 mt-2 w-72 bg-white/95 backdrop-blur-sm border border-gray-200 rounded-xl shadow-xl overflow-hidden transition-all duration-300 origin-top ${
                isOpen 
                    ? 'opacity-100 scale-y-100 translate-y-0' 
                    : 'opacity-0 scale-y-0 -translate-y-2 pointer-events-none'
            }`}
        >
            <div className="p-4">
                <div className="mb-3">
                    <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                        Помощь
                    </h3>
                    <div className="space-y-1">
                        {/* <Link 
                            to="/support" 
                            className="flex items-center gap-3 px-3 py-2.5 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 rounded-lg transition-colors group"
                            onClick={() => setIsOpen(false)}
                        >
                            <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center group-hover:bg-indigo-200 transition-colors">
                                <HelpCircle size={16} className="text-indigo-600" />
                            </div>
                            <div className="flex-1">
                                <div className="font-medium">Центр помощи</div>
                                <div className="text-xs text-gray-500">База знаний и статьи</div>
                            </div>
                        </Link> */}
                        <Link 
                            to="/faq" 
                            className="flex items-center gap-3 px-3 py-2.5 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 rounded-lg transition-colors group"
                            onClick={() => setIsOpen(false)}
                        >
                            <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center group-hover:bg-amber-200 transition-colors">
                                <MessageCircle size={16} className="text-amber-600" />
                            </div>
                            <div className="flex-1">
                                <div className="font-medium">FAQ</div>
                                <div className="text-xs text-gray-500">Частые вопросы</div>
                            </div>
                        </Link>
                        <Link 
                            to="/guides" 
                            className="flex items-center gap-3 px-3 py-2.5 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 rounded-lg transition-colors group"
                            onClick={() => setIsOpen(false)}
                        >
                            <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center group-hover:bg-emerald-200 transition-colors">
                                <Book size={16} className="text-emerald-600" />
                            </div>
                            <div className="flex-1">
                                <div className="font-medium">Руководства</div>
                                <div className="text-xs text-gray-500">Как начать работу</div>
                            </div>
                        </Link>
                    </div>
                </div>

                <div className="border-t border-gray-100 pt-3">
                    <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                        Документы
                    </h3>
                    <div className="space-y-1">
                        <Link 
                            to="/terms" 
                            className="flex items-center gap-3 px-3 py-2.5 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 rounded-lg transition-colors group"
                            onClick={() => setIsOpen(false)}
                        >
                            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                                <FileText size={16} className="text-blue-600" />
                            </div>
                            <div className="flex-1">
                                <div className="font-medium">Условия</div>
                                <div className="text-xs text-gray-500">Правила платформы</div>
                            </div>
                        </Link>
                        <Link 
                            to="/privacy" 
                            className="flex items-center gap-3 px-3 py-2.5 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 rounded-lg transition-colors group"
                            onClick={() => setIsOpen(false)}
                        >
                            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                                <Shield size={16} className="text-purple-600" />
                            </div>
                            <div className="flex-1">
                                <div className="font-medium">Конфиденциальность</div>
                                <div className="text-xs text-gray-500">Защита данных</div>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}