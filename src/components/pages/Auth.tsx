import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useAuth } from "@/hooks";
import { AuthTab, RegisterTab } from "@/components/ui";

export const Auth = () => {
    const {
        activeTab,
        errorsLogin,
        errorsRegister,
        isValidLogin,
        isValidRegister,
        isLoadingSubmitting,
        selectedRole,
        setActiveTab,
        setSelectedRole,
        registerLogin,
        registerRegister,
        handleSubmitLogin,
        handleSubmitRegister,
        submitForm,
    } = useAuth();

    return (
        <div className="min-h-screen flex items-center justify-center py-6 px-4 relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-200 rounded-full blur-3xl opacity-30 animate-pulse" />
                <div className="absolute bottom-0 right-1/4 w-[28rem] h-[28rem] bg-purple-200 rounded-full blur-3xl opacity-30 animate-pulse delay-1000" />
                <div className="absolute top-1/2 left-0 w-64 h-64 bg-pink-200 rounded-full blur-3xl opacity-20 animate-pulse delay-500" />
            </div>

            <div className="relative w-full max-w-md">
                <Link
                    to="/"
                    className="inline-flex items-center gap-2 text-gray-600 hover:text-indigo-600 transition-colors mb-6 group"
                >
                    <ArrowLeft
                        size={20}
                        className="group-hover:-translate-x-1 transition-transform"
                    />
                    <span className="font-medium">На главную</span>
                </Link>

                <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-gray-200/60 overflow-hidden">
                    <div className="p-8 pb-6 bg-gradient-to-br from-indigo-50/50 to-purple-50/30 border-b border-gray-200">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">
                            {activeTab === "login" ? "Добро пожаловать!" : "Создайте аккаунт"}
                        </h1>
                        <p className="text-gray-600">
                            {activeTab === "login"
                                ? "Войдите, чтобы продолжить работу"
                                : "Присоединяйтесь к нашему сообществу"}
                        </p>
                    </div>

                    <div className="flex border-b border-gray-200">
                        <button
                            type="button"
                            onClick={() => setActiveTab("login")}
                            className={`cursor-pointer flex-1 py-4 text-sm font-semibold transition-colors relative ${
                                activeTab === "login"
                                    ? "text-indigo-600"
                                    : "text-gray-600 hover:text-gray-900"
                            }`}
                        >
                            Вход
                            {activeTab === "login" && (
                                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600" />
                            )}
                        </button>
                        <button
                            type="button"
                            onClick={() => setActiveTab("register")}
                            className={`cursor-pointer flex-1 py-4 text-sm font-semibold transition-colors relative ${
                                activeTab === "register"
                                    ? "text-indigo-600"
                                    : "text-gray-600 hover:text-gray-900"
                            }`}
                        >
                            Регистрация
                            {activeTab === "register" && (
                                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600" />
                            )}
                        </button>
                    </div>

                    <form
                        onSubmit={
                            activeTab === "login"
                                ? handleSubmitLogin(submitForm)
                                : handleSubmitRegister(submitForm)
                        }
                        className="p-8"
                    >
                        {activeTab === "login" ? (
                            <AuthTab
                                register={registerLogin}
                                errors={errorsLogin}
                                isLoginTabValid={isValidLogin}
                                loadingSubmit={isLoadingSubmitting}
                            />
                        ) : (
                            <RegisterTab
                                register={registerRegister}
                                errors={errorsRegister}
                                loadingSubmit={isLoadingSubmitting}
                                isRegisterTabValid={isValidRegister}
                                selectedRole={selectedRole}
                                setSelectedRole={setSelectedRole}
                            />
                        )}
                    </form>

                    <div className="px-8 pb-8 text-center">
                        <p className="text-sm text-gray-600">
                            {activeTab === "login" ? (
                                <>
                                    Нет аккаунта?{" "}
                                    <button
                                        type="button"
                                        onClick={() => setActiveTab("register")}
                                        className="text-indigo-600 font-semibold hover:text-indigo-700 transition-colors"
                                    >
                                        Зарегистрируйтесь
                                    </button>
                                </>
                            ) : (
                                <>
                                    Уже есть аккаунт?{" "}
                                    <button
                                        type="button"
                                        onClick={() => setActiveTab("login")}
                                        className="text-indigo-600 font-semibold hover:text-indigo-700 transition-colors"
                                    >
                                        Войдите
                                    </button>
                                </>
                            )}
                        </p>
                    </div>
                </div>

                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-600">
                        Продолжая, вы соглашаетесь с{" "}
                        <Link
                            to="/terms"
                            className="text-indigo-600 hover:text-indigo-700 font-medium"
                        >
                            Условиями использования
                        </Link>{" "}
                        и{" "}
                        <Link
                            to="/privacy"
                            className="text-indigo-600 hover:text-indigo-700 font-medium"
                        >
                            Политикой конфиденциальности
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};
