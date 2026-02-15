import { useEffect } from "react";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks";
import { AuthTab, RegisterTab } from "@/components/ui";

export const AuthModal = () => {
    const navigate = useNavigate();
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

    const onClose = () => navigate(-1);

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") navigate(-1);
        };

        document.addEventListener("keydown", handleEscape);
        return () => document.removeEventListener("keydown", handleEscape);
    }, [navigate]);

    useEffect(() => {
        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = "auto";
        };
    }, []);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
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
                        {activeTab === "login" ? "Вход в аккаунт" : "Регистрация"}
                    </h2>
                    <p className="text-sm text-gray-600">
                        {activeTab === "login" ? "Войдите чтобы продолжить работу" : ""}
                    </p>
                </div>
                <div className="flex border-b border-gray-200">
                    <button
                        type="button"
                        onClick={() => setActiveTab("login")}
                        className={`cursor-pointer flex-1 py-3 text-sm font-semibold transition-colors relative ${
                            activeTab === "login"
                                ? "text-indigo-600"
                                : "text-gray-600 hover:text-gray-900"
                        }`}
                    >
                        Вход
                        {activeTab === "login" && (
                            <div className="absolute bottom-0 max-w-[7rem] left-1/2 -translate-1/2 right-0 h-0.5 bg-indigo-600" />
                        )}
                    </button>
                    <button
                        type="button"
                        onClick={() => setActiveTab("register")}
                        className={`cursor-pointer flex-1 py-3 text-sm font-semibold transition-colors relative ${
                            activeTab === "register"
                                ? "text-indigo-600"
                                : "text-gray-600 hover:text-gray-900"
                        }`}
                    >
                        Регистрация
                        {activeTab === "register" && (
                            <div className="absolute bottom-0 max-w-[7rem] left-1/2 -translate-1/2 right-0 h-0.5 bg-indigo-600" />
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
                            isRegisterTabValid={isValidRegister}
                            loadingSubmit={isLoadingSubmitting}
                            selectedRole={selectedRole}
                            setSelectedRole={setSelectedRole}
                        />
                    )}
                </form>
            </div>
        </div>
    );
};
