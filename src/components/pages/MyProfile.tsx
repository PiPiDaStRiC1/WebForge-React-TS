import { useState } from "react";
import { useUser, useProfile } from "@/hooks";
import { Camera, Mail, Code, Briefcase, Settings, LogOut, User } from "lucide-react";
import { ProfileSkeleton, SettingsTab, ProfileTab } from "@/components/ui";
import { ErrorAlert } from "@/components/common";

type TabType = "profile" | "settings";

export const MyProfile = () => {
    const { user, error } = useUser();
    const { handleLogOut } = useProfile();
    const [activeTab, setActiveTab] = useState<TabType>("profile");

    if (error) {
        return <ErrorAlert />;
    }

    // временно, т.к нет бекенда
    if (!user) {
        return <ProfileSkeleton />;
    }

    return (
        <div className="min-h-screen py-8">
            <div className="max-w-4xl mx-auto px-6">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-6">
                    <div className="flex items-start gap-6">
                        <div className="relative group">
                            <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-4xl font-bold">
                                {user.name?.charAt(0).toUpperCase() || "U"}
                            </div>
                            <button className="cursor-pointer absolute inset-0 bg-black/50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <Camera className="text-white" size={24} />
                            </button>
                        </div>

                        <div className="flex-1">
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                                        {user.name} {user.lastName}
                                    </h1>
                                    <div className="flex items-center gap-3">
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
                                            {new Date(user.registeredAt).toLocaleDateString(
                                                "ru-RU",
                                                { month: "long", year: "numeric" },
                                            )}
                                        </span>
                                    </div>
                                </div>
                                <button
                                    onClick={handleLogOut}
                                    className="cursor-pointer px-4 py-2 bg-red-50 text-red-600 rounded-xl font-medium hover:bg-red-100 transition-colors flex items-center gap-2"
                                    title="Выйти"
                                >
                                    <LogOut size={18} />
                                    <span>Выйти</span>
                                </button>
                            </div>

                            <div className="flex items-center gap-2 text-gray-600">
                                <Mail size={16} />
                                <span className="text-sm">{user.email}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex gap-2 mb-6">
                    <button
                        onClick={() => setActiveTab("profile")}
                        className={`cursor-pointer px-6 py-3 rounded-xl font-medium transition-all flex items-center gap-2 ${
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
                        className={`cursor-pointer px-6 py-3 rounded-xl font-medium transition-all flex items-center gap-2 ${
                            activeTab === "settings"
                                ? "bg-white text-indigo-600"
                                : "text-gray-600 hover:bg-white/50"
                        }`}
                    >
                        <Settings size={18} />
                        Настройки
                    </button>
                </div>

                {activeTab === "profile" ? <ProfileTab /> : <SettingsTab />}
            </div>
        </div>
    );
};
