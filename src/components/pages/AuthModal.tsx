import { useEffect, useState } from 'react';
import { X, Mail, Lock, User, Briefcase, Code } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

type TabType = 'login' | 'register';
type RoleType = 'freelancer' | 'client';

export const AuthModal = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<TabType>('login');
    const [selectedRole, setSelectedRole] = useState<RoleType>('freelancer');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const onClose = () => {
        navigate(-1);
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form submitted:', { ...formData, role: selectedRole, type: activeTab });
        // Здесь будет логика отправки на backend
    };

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') navigate(-1);
        }

        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [navigate]);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
            <div 
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={onClose}
            />
            <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl animate-scale-in max-h-[95vh] overflow-y-auto">
            <button
                onClick={onClose}
                className="cursor-pointer absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-xl text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all"
                aria-label="Закрыть"
            >
                <X size={20} />
            </button>
            <div className="p-6 pb-4 border-b border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {activeTab === 'login' ? 'Вход в аккаунт' : 'Регистрация'}
                </h2>
                <p className="text-sm text-gray-600">
                {activeTab === 'login' 
                    ? 'Войдите чтобы продолжить работу' 
                    : 'Создайте аккаунт и начните зарабатывать'}
                </p>
            </div>
            <div className="flex border-b border-gray-200">
                <button
                    type="button"
                    onClick={() => setActiveTab('login')}
                    className={`cursor-pointer flex-1 py-3 text-sm font-semibold transition-colors relative ${
                        activeTab === 'login'
                        ? 'text-indigo-600'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                >
                    Вход
                    {activeTab === 'login' && (
                        <div className="absolute bottom-0 max-w-[7rem] left-1/2 -translate-1/2 right-0 h-0.5 bg-indigo-600" />
                    )}
                </button>
                <button
                    type="button"
                    onClick={() => setActiveTab('register')}
                    className={`cursor-pointer flex-1 py-3 text-sm font-semibold transition-colors relative ${
                        activeTab === 'register'
                        ? 'text-indigo-600'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                >
                    Регистрация
                    {activeTab === 'register' && (
                        <div className="absolute bottom-0 max-w-[7rem] left-1/2 -translate-1/2 right-0 h-0.5 bg-indigo-600" />
                    )}
                </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 pt-5">
                {activeTab === 'login' ? (
                <>
                    <div className="space-y-4">
                    <div>
                        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                            <Mail size={16} className="text-gray-400" />
                            Email
                        </label>
                        <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            placeholder="example@mail.com"
                            className="w-full h-11 px-4 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                            required
                        />
                    </div>

                    <div>
                        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                            <Lock size={16} className="text-gray-400" />
                            Пароль
                        </label>
                        <input
                            type="password"
                            value={formData.password}
                            onChange={(e) => handleInputChange('password', e.target.value)}
                            placeholder="••••••••"
                            className="w-full h-11 px-4 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                            required
                        />
                    </div>

                    <div className="flex items-center justify-between text-sm">
                        <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="checkbox"
                            className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                        <span className="text-gray-600">Запомнить меня</span>
                        </label>
                        <button
                            type="button"
                            className="text-indigo-600 hover:text-indigo-700 font-medium"
                        >
                            Забыли пароль?
                        </button>
                    </div>
                    </div>

                    <button
                        type="submit"
                        className="cursor-pointer w-full mt-6 h-12 bg-indigo-600 text-white rounded-xl font-semibold shadow-lg shadow-indigo-500/25 hover:bg-indigo-700 hover:shadow-indigo-500/35 transition-all"
                    >
                        Войти
                    </button>
                </>
                ) : (
                <>
                    <div className="mb-4">
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                        Выберите роль
                    </label>
                    <div className="flex gap-2">
                        <button
                            type="button"
                            onClick={() => setSelectedRole('freelancer')}
                            className={`cursor-pointer flex-1 p-2.5 rounded-xl border-2 transition-all flex items-center gap-2.5 ${
                                selectedRole === 'freelancer'
                                ? 'border-indigo-500 bg-indigo-50'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                        >
                            <Code size={20} className={`flex-shrink-0 ${
                                selectedRole === 'freelancer' ? 'text-indigo-600' : 'text-gray-400'
                            }`} />
                            <div className="text-left">
                                <div className={`text-sm font-semibold ${
                                    selectedRole === 'freelancer' ? 'text-indigo-600' : 'text-gray-700'
                                }`}>
                                    Фрилансер
                                </div>
                                <div className="text-[11px] text-gray-500">
                                    Выполняю заказы
                                </div>
                            </div>
                        </button>

                        <button
                            type="button"
                            onClick={() => setSelectedRole('client')}
                            className={`cursor-pointer flex-1 p-2.5 rounded-xl border-2 transition-all flex items-center gap-2.5 ${
                                selectedRole === 'client'
                                ? 'border-indigo-500 bg-indigo-50'
                                : 'border-gray-200 hover:border-gray-300'
                        }`}
                        >
                            <Briefcase size={20} className={`flex-shrink-0 ${
                                selectedRole === 'client' ? 'text-indigo-600' : 'text-gray-400'
                            }`} />
                            <div className="text-left">
                                <div className={`text-sm font-semibold ${
                                    selectedRole === 'client' ? 'text-indigo-600' : 'text-gray-700'
                                }`}>
                                    Заказчик
                                </div>
                                <div className="text-[11px] text-gray-500">
                                    Размещаю заказы
                                </div>
                            </div>
                        </button>
                    </div>
                    </div>

                    <div className="space-y-3">
                    <div>
                        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1.5">
                            <User size={16} className="text-gray-400" />
                            Имя
                        </label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => handleInputChange('name', e.target.value)}
                            placeholder="Ваше имя"
                            className="w-full h-10 px-4 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                            required
                        />
                    </div>

                    <div>
                        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1.5">
                            <Mail size={16} className="text-gray-400" />
                            Email
                        </label>
                        <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            placeholder="example@mail.com"
                            className="w-full h-10 px-4 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                            required
                        />
                    </div>

                    <div>
                        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1.5">
                            <Lock size={16} className="text-gray-400" />
                            Пароль
                        </label>
                        <input
                            type="password"
                            value={formData.password}
                            onChange={(e) => handleInputChange('password', e.target.value)}
                            placeholder="Минимум 8 символов"
                            className="w-full h-10 px-4 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                            required
                            minLength={8}
                        />
                    </div>

                    <div>
                        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1.5">
                            <Lock size={16} className="text-gray-400" />
                            Подтвердите пароль
                        </label>
                        <input
                            type="password"
                            value={formData.confirmPassword}
                            onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                            placeholder="••••••••"
                            className="w-full h-10 px-4 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                            required
                        />
                    </div>

                    <label className="flex items-start gap-2 text-[11px] text-gray-600 cursor-pointer pt-1">
                        <input
                            type="checkbox"
                            className="mt-0.5 w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            required
                        />
                        <span>
                            Я согласен с{' '}
                            <Link to="/terms" className="text-indigo-600 hover:underline">
                                условиями использования
                            </Link>{' '}
                            и{' '}
                            <Link to="/privacy" className="text-indigo-600 hover:underline">
                                политикой конфиденциальности
                            </Link>
                        </span>
                    </label>
                    </div>

                    <button
                        type="submit"
                        className="cursor-pointer w-full mt-4 h-11 bg-indigo-600 text-white rounded-xl font-semibold shadow-lg shadow-indigo-500/25 hover:bg-indigo-700 hover:shadow-indigo-500/35 transition-all"
                    >
                        Создать аккаунт
                    </button>
                </>
                )}
            </form>
            </div>
        </div>
    );
};