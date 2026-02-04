import { useState } from "react";
import { Mail, Lock, Eye, EyeClosed } from "lucide-react";
import type { FormData } from '@/types';

interface AuthTabProps {
    formData: FormData;
    handleChange: (field: keyof FormData, value: string) => void;
    validation: Partial<Record<keyof FormData, boolean>>;
    isLoginTabValid: boolean;
    loadingSubmit: boolean;
}

export const AuthTab = ({ formData, handleChange, validation, isLoginTabValid, loadingSubmit }: AuthTabProps) => {
    const [rememberMe, setRememberMe] = useState(true);
    const [showPass, setShowPass] = useState(false);

    return (
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
                        onChange={(e) => handleChange('email', e.target.value)}
                        placeholder="example@mail.com"
                        className="w-full h-11 px-4 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                        required
                    />
                    {!validation.email && (
                        <p className="mt-1 text-xs text-red-600">Некорректный email адрес</p>
                    )}
                </div>

                <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                        <Lock size={16} className="text-gray-400" />
                        Пароль
                    </label>
                    <label className="relative">
                        <input
                            type={showPass ? 'text' : 'password'}
                            value={formData.password}
                            onChange={(e) => handleChange('password', e.target.value)}
                            placeholder="••••••••"
                            className="w-full h-11 px-4 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                            required
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

                <div className="flex items-center justify-between text-sm">
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            checked={rememberMe}
                            type="checkbox"
                            className="cursor-pointer w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            onChange={() => setRememberMe(!rememberMe)}
                        />
                        <span className="text-gray-600">Запомнить меня</span>
                    </label>
                    <button
                        type="button"
                        className="cursor-pointer text-indigo-600 hover:text-indigo-700 font-medium"
                    >
                        Забыли пароль?
                    </button>
                </div>
            </div>
            {loadingSubmit ? (
                <button
                    type="button"
                    className="cursor-pointer w-full mt-4 h-11 bg-indigo-600 text-white rounded-xl font-semibold shadow-lg shadow-indigo-500/25 flex items-center justify-center gap-2 disabled:opacity-50 opacity-50"
                >
                    <div className="w-7 h-7 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />
                </button>
            ) : (
                <button
                    type="submit"
                    className="cursor-pointer w-full mt-4 h-11 bg-indigo-600 text-white rounded-xl font-semibold shadow-lg shadow-indigo-500/25 hover:bg-indigo-700 hover:shadow-indigo-500/35 transition-all disabled:opacity-50"
                    disabled={!isLoginTabValid}
                >
                    Войти
                </button>
            )}
        </>
    )
}