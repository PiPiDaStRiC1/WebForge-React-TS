import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/hooks";
import { Camera, Mail, Code, Briefcase, Settings, LogOut, User, UserCircle } from "lucide-react";
import { ProfileSkeleton, SettingsTab, ProfileTab } from "@/components/ui";
import { ErrorAlert } from "@/components/common";

type TabType = "profile" | "settings";

const formatRegisterDate = (value?: string) => {
    if (!value) return "Дата регистрации не указана";

    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "Дата регистрации не указана";

    return new Intl.DateTimeFormat("ru-RU", {
        month: "long",
        year: "numeric",
        timeZone: "UTC",
    }).format(date);
};

const MyProfile = () => {
    const navigate = useNavigate();
    const { user, error, logOutUser } = useUser();
    const [activeTab, setActiveTab] = useState<TabType>("profile");

    const registerDate = formatRegisterDate(user?.registeredAt);

    if (error) {
        return <ErrorAlert />;
    }

    const handleLogOut = () => {
        // Редиректим на главную до изменения состояния,
        // чтобы ProtectedRoute не успел средиректить на /auth
        navigate("/");

        // Очищаем данные после перехода (в следующем тике)
        setTimeout(() => logOutUser(), 100);
    };

    if (!user) {
        return <ProfileSkeleton />;
    }

    return (
        <div className="min-h-screen py-4 sm:py-6 md:py-8">
            <div className="max-w-4xl mx-auto px-3 sm:px-4 md:px-6">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6 md:p-8 mb-5 sm:mb-6">
                    <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-6">
                        <div className="relative group">
                            <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-3xl sm:text-4xl font-bold">
                                {user.name?.charAt(0).toUpperCase() || "U"}
                            </div>
                            <button className="cursor-pointer absolute inset-0 bg-black/50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <Camera className="text-white" size={24} />
                            </button>
                        </div>

                        <div className="flex-1">
                            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                                <div>
                                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 break-words">
                                        {user.name} {user.lastName}
                                    </h1>
                                    <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                                        <span
                                            className={`px-3 py-1 rounded-lg text-sm font-medium ${
                                                user.role === "freelancer"
                                                    ? "bg-indigo-50 text-indigo-600"
                                                    : "bg-purple-50 text-purple-600"
                                            }`}
                                        >
                                            {user.role === "freelancer" ? (
                                                <span className="flex items-center gap-1.5">
                                                    <Code size={14} />
                                                    Фрилансер
                                                </span>
                                            ) : (
                                                <span className="flex items-center gap-1.5">
                                                    <Briefcase size={14} />
                                                    Заказчик
                                                </span>
                                            )}
                                        </span>
                                        <span className="text-sm text-gray-500">
                                            {registerDate}
                                        </span>
                                    </div>
                                </div>
                                <button
                                    onClick={handleLogOut}
                                    className="cursor-pointer w-full sm:w-auto justify-center px-4 py-2 bg-red-50 text-red-600 rounded-xl font-medium hover:bg-red-100 transition-colors inline-flex items-center gap-2"
                                    title="Выйти"
                                >
                                    <LogOut size={18} />
                                    <span>Выйти</span>
                                </button>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-2 sm:gap-5">
                                <div className="flex items-center gap-2 text-gray-600 min-w-0">
                                    <UserCircle size={16} />
                                    <span className="text-sm">
                                        {user.gender === "male" ? "Мужчина" : "Женщина"}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-600 min-w-0">
                                    <Mail size={16} />
                                    <span className="text-sm break-all">{user.email}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mb-6 overflow-x-auto">
                    <div className="inline-flex min-w-full sm:min-w-0 gap-2">
                    <button
                        onClick={() => setActiveTab("profile")}
                        className={`cursor-pointer flex-1 sm:flex-none justify-center px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-medium transition-all inline-flex items-center gap-2 whitespace-nowrap ${
                            activeTab === "profile"
                                ? "bg-white text-indigo-600"
                                : "text-gray-600 hover:bg-white/50"
                        }`}
                    >
                        <User size={18} />
                        Профиль
                    </button>
                    <button
                        onClick={() => setActiveTab("settings")}
                        className={`cursor-pointer flex-1 sm:flex-none justify-center px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-medium transition-all inline-flex items-center gap-2 whitespace-nowrap ${
                            activeTab === "settings"
                                ? "bg-white text-indigo-600"
                                : "text-gray-600 hover:bg-white/50"
                        }`}
                    >
                        <Settings size={18} />
                        Настройки
                    </button>
                    </div>
                </div>

                {activeTab === "profile" ? <ProfileTab /> : <SettingsTab />}
            </div>
        </div>
    );
};

export default MyProfile;
