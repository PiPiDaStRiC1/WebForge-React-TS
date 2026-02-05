import { useEffect, useMemo, useState } from 'react';
import { X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { AuthTab, RegisterTab } from '@/components/ui';
import { emailRegExp, nameRegExp, passwordRegExp } from '@/lib/constants/regExpFormValidation';
import type { FormData, UserData } from '@/types';
import toast from 'react-hot-toast';
import { useUser } from '@/hooks';

type TabType = 'login' | 'register';
type RoleType = 'freelancer' | 'client';

const hashPassword = async (password: string) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hash = await crypto.subtle.digest('SHA-256', data);

    return Array.from(new Uint8Array(hash))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');
}

const initialFormData: FormData = {
    name: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
};

const LOG_TIMER = 1500;


export const AuthModal = () => {
    const navigate = useNavigate();
    const { registerUser, logInUser } = useUser();
    const [activeTab, setActiveTab] = useState<TabType>('login');
    const [selectedRole, setSelectedRole] = useState<RoleType>('freelancer');
    const [formData, setFormData] = useState<FormData>(initialFormData);
    const [loadingSubmit, setLoadingSubmit] = useState(false);

    const validation: Partial<Record<keyof FormData, boolean>> = useMemo(() => ({
        name: activeTab === 'register' && nameRegExp.test(formData.name),
        lastName: activeTab === 'register' && nameRegExp.test(formData.lastName),
        email: emailRegExp.test(formData.email),
        password: passwordRegExp.test(formData.password),
        confirmPassword: activeTab === 'register' && formData.password === formData.confirmPassword,
    }), [formData, activeTab]);

    const isLoginTabValid = !!validation.email && !!validation.password;
    const isRegisterTabValid = !!validation.email && !!validation.name && !!validation.lastName && !!validation.password && !!validation.confirmPassword;
    
    const onClose = () => navigate(-1);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoadingSubmit(true);

        if (activeTab === 'register' && isRegisterTabValid) {
            try {
                await new Promise((resolve) => setTimeout(resolve, LOG_TIMER));
    
                const userId = Math.floor(Math.random() * 1000000000);
                const hashedPass = await hashPassword(formData.password);
                const registeredAt = new Date().toLocaleDateString('ru-RU');
                // eslint-disable-next-line
                const {confirmPassword, ...restFormData} = formData;

                const userData: UserData = selectedRole === 'freelancer' ? {
                    ...restFormData, 
                    id: userId,
                    password: hashedPass, 
                    role: 'freelancer',
                    registeredAt,
                    status: 'unverified',
                    bio: '',
                    location: '',
                    skills: [],
                    pricePerHour: 0,
                    completedOrders: 0,
                    rating: 0,
                    earning: 0,
                    experience: 0,
                    category: 'web-dev',
                    gender: 'male',
                    login: `${formData.name.toLowerCase()}${formData.lastName.toLowerCase()}${userId.toString().slice(0, 3)}`,
                    phone: '',
                    picture: null,
                } : {
                    ...restFormData, 
                    id: userId,
                    password: hashedPass, 
                    role: 'client',
                    registeredAt,
                    status: 'unverified',
                    bio: '',
                    location: '',
                    placedOrders: 0,
                    spending: 0,
                    gender: 'male',
                    login: `${formData.name.toLowerCase()}${formData.lastName.toLowerCase()}${userId.toString().slice(0, 3)}`,
                    phone: '',
                    picture: null,
                    category: null,
                    experience: null,
                    pricePerHour: null,
                    rating: 0,
                    skills: null,
                }

                 
                registerUser(userData);
                toast.success("Успешно!");
                navigate('/my-profile');
            } catch (error) {
                toast.error(error instanceof Error ? error.message : 'Ошибка при создании аккаунта. Пожалуйста, попробуйте еще раз.');
            } finally {
                setLoadingSubmit(false);
            }
        } else if (activeTab === 'login' && isLoginTabValid) {
            try {
                await new Promise((resolve) => setTimeout(resolve, LOG_TIMER));
    
                logInUser(formData.email);
                toast.success("Успешно!");
                navigate('/my-profile');
    
            } catch (error) {
                toast.error(error instanceof Error ? error.message : 'Ошибка при входе. Пожалуйста, попробуйте еще раз.');
            } finally {
                setLoadingSubmit(false);
            }
        }
    };

    const handleInputChange = (field: keyof FormData, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') navigate(-1);
        }

        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [navigate]);

    useEffect(() => {
        document.body.style.overflow = 'hidden';

        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [])

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
                    {activeTab === 'login' ? 'Войдите чтобы продолжить работу' : ''}
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
                    <AuthTab 
                        formData={formData}
                        handleChange={handleInputChange}
                        validation={validation}
                        isLoginTabValid={isLoginTabValid}
                        loadingSubmit={loadingSubmit}
                    />
                    ) : (
                    <RegisterTab 
                        formData={formData}
                        handleChange={handleInputChange}
                        selectedRole={selectedRole}
                        setSelectedRole={setSelectedRole}
                        validation={validation}
                        isRegisterTabValid={isRegisterTabValid}
                        loadingSubmit={loadingSubmit}
                    />
                )}
            </form>
            </div>
        </div>
    );
};