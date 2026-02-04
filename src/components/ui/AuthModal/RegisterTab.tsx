import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Lock, User, Briefcase, Code, Eye, EyeClosed } from "lucide-react";
import type { FormData } from '@/types';

interface RegisterTabProps {
    formData: FormData;
    handleChange: (field: keyof FormData, value: string) => void;
    selectedRole: 'freelancer' | 'client';
    setSelectedRole: (role: 'freelancer' | 'client') => void;
    validation: Partial<Record<keyof FormData, boolean>>;
    isRegisterTabValid: boolean;
    loadingSubmit: boolean;
}

export const RegisterTab = ({ formData, handleChange, selectedRole, setSelectedRole, validation, isRegisterTabValid, loadingSubmit }: RegisterTabProps) => {
    const [agreeTerms, setAgreeTerms] = useState(true);
    const [showPass, setShowPass] = useState(false);
    const [showConfirmPass, setShowConfirmPass] = useState(false);

    return (
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
                    <div className="flex gap-2">
                        <div>
                            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1.5">
                                <User size={16} className="text-gray-400" />
                                Имя
                            </label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => handleChange('name', e.target.value)}
                                placeholder="Ваше имя"
                                className="w-full h-10 px-4 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                                required
                            />
                            {!validation.name && (
                                <p className="mt-1 text-xs text-red-600">Имя должно содержать только буквы и быть от 2 до 30 символов</p>
                            )}
                        </div>
                        <div>
                            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1.5">
                                <User size={16} className="text-gray-400" />
                                Фамилия
                            </label>
                            <input
                                type="text"
                                value={formData.lastName}
                                onChange={(e) => handleChange('lastName', e.target.value)}
                                placeholder="Ваша фамилию"
                                className="w-full h-10 px-4 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                                required
                            />
                            {!validation.lastName && (
                                <p className="mt-1 text-xs text-red-600">Фамилия должна содержать только буквы и быть от 2 до 30 символов</p>
                            )}
                        </div>
                    </div>

                    <div>
                        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1.5">
                            <Mail size={16} className="text-gray-400" />
                            Email
                        </label>
                        <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleChange('email', e.target.value)}
                            placeholder="example@mail.com"
                            className="w-full h-10 px-4 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                            required
                        />
                        {!validation.email && (
                            <p className="mt-1 text-xs text-red-600">Некорректный email адрес</p>
                        )}
                    </div>

                    <div>
                        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1.5">
                            <Lock size={16} className="text-gray-400" />
                            Пароль
                        </label>
                        <label className="relative">
                            <input
                                type={showPass ? 'text' : 'password'}
                                value={formData.password}
                                onChange={(e) => handleChange('password', e.target.value)}
                                placeholder="Минимум 8 символов"
                                className="w-full h-10 px-4 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                                required
                                minLength={8}
                            />
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    setShowPass(!showPass);
                                }}
                                className="absolute top-1/2 right-4 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                            >
                                {showPass ? <Eye size={16} /> : <EyeClosed size={16} />}
                            </button>
                        </label>
                        {!validation.password && (
                            <p className="mt-1 text-xs text-red-600">Пароль должен содержать не менее 8 символов, включая заглавную букву и цифру</p>
                        )}
                    </div>

                    <div>
                        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1.5">
                            <Lock size={16} className="text-gray-400" />
                            Подтвердите пароль
                        </label>
                        <label className="relative">
                            <input
                                type={showConfirmPass ? 'text' : 'password'}
                                value={formData.confirmPassword}
                                onChange={(e) => handleChange('confirmPassword', e.target.value)}
                                placeholder="••••••••"
                                className="w-full h-10 px-4 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                                required
                            />
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    setShowConfirmPass(!showConfirmPass);
                                }}
                                className="absolute top-1/2 right-4 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                            >
                                {showConfirmPass ? <Eye size={16} /> : <EyeClosed size={16} />}
                            </button>
                        </label>
                        {!validation.confirmPassword && (
                            <p className="mt-1 text-xs text-red-600">Пароли не совпадают</p>
                        )}
                    </div>

                    <label className="flex items-start gap-2 text-[11px] text-gray-600 cursor-pointer pt-1">
                        <input
                            checked={agreeTerms}
                            type="checkbox"
                            className="mt-0.5 w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            required
                            onChange={() => setAgreeTerms(!agreeTerms)}
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
                
                {loadingSubmit ? (
                    <button
                        type="button"
                        className="cursor-pointer w-full mt-4 h-11 bg-indigo-600 text-white rounded-xl font-semibold shadow-lg shadow-indigo-500/25 flex items-center justify-center gap-2 opacity-50"
                    >
                        <div className="w-7 h-7 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />
                    </button>
                ) : (
                    <button
                        type="submit"
                        className="cursor-pointer w-full mt-4 h-11 bg-indigo-600 text-white rounded-xl font-semibold shadow-lg shadow-indigo-500/25 hover:bg-indigo-700 hover:shadow-indigo-500/35 transition-all disabled:opacity-50"
                        disabled={!isRegisterTabValid || !agreeTerms}
                    >
                        Создать аккаунт
                    </button>
                )}
        </>
    )
}