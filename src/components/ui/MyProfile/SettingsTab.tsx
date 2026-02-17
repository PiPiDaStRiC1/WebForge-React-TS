import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Bell,
    Shield,
    CreditCard,
    User,
    ChevronRight,
    AlertTriangle,
    X,
    User2,
} from "lucide-react";
import { useUser, useProfile } from "@/hooks";
import { ErrorAlert } from "@/components/common";
import { nameRegExp, emailRegExp } from "@/lib/constants/regExpFormValidation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import type { LucideProps } from "lucide-react";

type SettingsTab = "account" | "notifications" | "security" | "payment" | "danger";

interface MenuItem {
    id: SettingsTab;
    label: string;
    icon: React.ForwardRefExoticComponent<
        Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
    >;
    color: string;
}

const accountSettingsSchema = z.object({
    name: z
        .string()
        .min(2, "Имя должно быть не менее 2 символов")
        .max(30, "Имя должно быть не более 30 символов")
        .regex(nameRegExp, "Имя должно содержать только буквы"),
    lastName: z
        .string()
        .min(2, "Фамилия должна быть не менее 2 символов")
        .max(30, "Фамилия должна быть не более 30 символов")
        .regex(nameRegExp, "Фамилия должна содержать только буквы"),
    email: z.string().regex(emailRegExp, "Некорректный email адрес"),
    gender: z.enum(["male", "female"]),
});

export const SettingsTab = () => {
    const navigate = useNavigate();
    const { user, deleteUser } = useUser();
    const { handleSaveForm, isSaving, handleAbort } = useProfile();
    const {
        register,
        handleSubmit,
        control,
        formState: { errors, isValid },
    } = useForm({ resolver: zodResolver(accountSettingsSchema), mode: "onTouched" });
    const [activeSettingsTab, setActiveSettingsTab] = useState<SettingsTab>("account");

    if (!user) {
        return <ErrorAlert />;
    }

    const menuItems: MenuItem[] = [
        { id: "account", label: "Аккаунт", icon: User, color: "indigo" },
        { id: "notifications", label: "Уведомления", icon: Bell, color: "purple" },
        { id: "security", label: "Безопасность", icon: Shield, color: "green" },
        { id: "payment", label: "Платежи", icon: CreditCard, color: "blue" },
        { id: "danger", label: "Опасная зона", icon: AlertTriangle, color: "red" },
    ];

    const handleDeleteAccount = () => {
        navigate("/");
        setTimeout(() => deleteUser(), 100);
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 h-fit">
                <nav className="space-y-1">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = activeSettingsTab === item.id;
                        return (
                            <button
                                key={item.id}
                                onClick={() => setActiveSettingsTab(item.id)}
                                className={`cursor-pointer w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all ${
                                    isActive
                                        ? "bg-indigo-50 text-indigo-600"
                                        : "text-gray-700 hover:bg-gray-50"
                                }`}
                            >
                                <div className="flex items-center gap-3">
                                    <Icon size={18} />
                                    <span className="font-medium text-sm">{item.label}</span>
                                </div>
                                {isActive && <ChevronRight size={16} />}
                            </button>
                        );
                    })}
                </nav>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                {activeSettingsTab === "account" && (
                    <div>
                        <div className="mb-6">
                            <h2 className="text-2xl font-bold text-gray-900">Настройки аккаунта</h2>
                            <p className="text-sm text-gray-600 mt-1">Управление личными данными</p>
                        </div>

                        <form
                            onSubmit={handleSubmit(handleSaveForm)}
                            className="space-y-4 max-w-lg"
                        >
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Имя
                                </label>
                                {!isSaving ? (
                                    <label>
                                        <input
                                            {...register("name")}
                                            type="text"
                                            className="w-full h-11 px-4 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                                            defaultValue={user.name}
                                        />
                                        {errors.name && (
                                            <p className="mt-1 text-xs text-red-600">
                                                {errors.name.message}
                                            </p>
                                        )}
                                    </label>
                                ) : (
                                    <div className="w-full h-11 bg-gray-200 animate-pulse rounded-xl" />
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Фамилия
                                </label>
                                {!isSaving ? (
                                    <label>
                                        <input
                                            {...register("lastName")}
                                            type="text"
                                            className="w-full h-11 px-4 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                                            defaultValue={user.lastName}
                                        />
                                        {errors.lastName && (
                                            <p className="mt-1 text-xs text-red-600">
                                                {errors.lastName.message}
                                            </p>
                                        )}
                                    </label>
                                ) : (
                                    <div className="w-full h-11 bg-gray-200 animate-pulse rounded-xl" />
                                )}
                            </div>

                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Пол
                            </label>
                            <Controller
                                name="gender"
                                control={control}
                                render={({ field }) => (
                                    <div className="w-full flex justify-between gap-5 items-center">
                                        {!isSaving ? (
                                            <button
                                                type="button"
                                                onClick={() => field.onChange("male")}
                                                className={`cursor-pointer flex-1 p-2.5 rounded-xl border-2 transition-all flex items-center gap-2.5 ${
                                                    field.value === "male"
                                                        ? "border-indigo-500 bg-indigo-50"
                                                        : "border-gray-200 hover:border-gray-300"
                                                }`}
                                            >
                                                <User2
                                                    size={20}
                                                    className={`flex-shrink-0 ${
                                                        field.value === "male"
                                                            ? "text-indigo-600"
                                                            : "text-gray-400"
                                                    }`}
                                                />
                                                <div className="text-left">
                                                    <div
                                                        className={`text-sm font-semibold ${
                                                            field.value === "male"
                                                                ? "text-indigo-600"
                                                                : "text-gray-700"
                                                        }`}
                                                    >
                                                        Мужской
                                                    </div>
                                                </div>
                                            </button>
                                        ) : (
                                            <div className="w-full h-11 bg-gray-200 animate-pulse rounded-xl" />
                                        )}
                                        {!isSaving ? (
                                            <button
                                                type="button"
                                                onClick={() => field.onChange("female")}
                                                className={`cursor-pointer flex-1 p-2.5 rounded-xl border-2 transition-all flex items-center gap-2.5 ${
                                                    field.value === "female"
                                                        ? "border-indigo-500 bg-indigo-50"
                                                        : "border-gray-200 hover:border-gray-300"
                                                }`}
                                            >
                                                <User2
                                                    size={20}
                                                    className={`flex-shrink-0 ${
                                                        field.value === "female"
                                                            ? "text-indigo-600"
                                                            : "text-gray-400"
                                                    }`}
                                                />
                                                <div className="text-left">
                                                    <div
                                                        className={`text-sm font-semibold ${
                                                            field.value === "female"
                                                                ? "text-indigo-600"
                                                                : "text-gray-700"
                                                        }`}
                                                    >
                                                        Женский
                                                    </div>
                                                </div>
                                            </button>
                                        ) : (
                                            <div className="w-full h-11 bg-gray-200 animate-pulse rounded-xl" />
                                        )}
                                    </div>
                                )}
                            />

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Email
                                </label>
                                {!isSaving ? (
                                    <label>
                                        <input
                                            {...register("email")}
                                            type="email"
                                            className="w-full h-11 px-4 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                                            defaultValue={user.email}
                                        />
                                        {errors.email && (
                                            <p className="mt-1 text-xs text-red-600">
                                                {errors.email.message}
                                            </p>
                                        )}
                                    </label>
                                ) : (
                                    <div className="w-full h-11 bg-gray-200 animate-pulse rounded-xl" />
                                )}
                            </div>
                            {isSaving ? (
                                <div className="cursor-pointer flex justify-center items-center gap-2 w-full max-w-[10rem] py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-colors">
                                    Сохранение...
                                    <button className="cursor-pointer" onClick={handleAbort}>
                                        <X />
                                    </button>
                                </div>
                            ) : (
                                <button
                                    type="submit"
                                    className="cursor-pointer w-full max-w-[8rem] py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    disabled={!isValid}
                                >
                                    Сохранить
                                </button>
                            )}
                        </form>
                    </div>
                )}

                {activeSettingsTab === "notifications" && (
                    <div>
                        <div className="mb-6">
                            <h2 className="text-2xl font-bold text-gray-900">Уведомления</h2>
                            <p className="text-sm text-gray-600 mt-1">Управление оповещениями</p>
                        </div>

                        <div className="space-y-6 max-w-2xl">
                            <label className="flex items-center justify-between cursor-pointer p-4 rounded-xl hover:bg-gray-50 transition-colors">
                                <div>
                                    <div className="font-medium text-gray-900">
                                        Email-уведомления
                                    </div>
                                    <div className="text-sm text-gray-500">
                                        Получать письма о новых заказах
                                    </div>
                                </div>
                                <input
                                    type="checkbox"
                                    defaultChecked
                                    className="w-5 h-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                                />
                            </label>

                            <label className="flex items-center justify-between cursor-pointer p-4 rounded-xl hover:bg-gray-50 transition-colors">
                                <div>
                                    <div className="font-medium text-gray-900">
                                        Push-уведомления
                                    </div>
                                    <div className="text-sm text-gray-500">
                                        Уведомления в браузере
                                    </div>
                                </div>
                                <input
                                    type="checkbox"
                                    className="w-5 h-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                                />
                            </label>

                            <label className="flex items-center justify-between cursor-pointer p-4 rounded-xl hover:bg-gray-50 transition-colors">
                                <div>
                                    <div className="font-medium text-gray-900">
                                        Новостная рассылка
                                    </div>
                                    <div className="text-sm text-gray-500">
                                        Советы и обновления платформы
                                    </div>
                                </div>
                                <input
                                    type="checkbox"
                                    defaultChecked
                                    className="w-5 h-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                                />
                            </label>
                        </div>
                    </div>
                )}

                {activeSettingsTab === "security" && (
                    <div>
                        <div className="mb-6">
                            <h2 className="text-2xl font-bold text-gray-900">Безопасность</h2>
                            <p className="text-sm text-gray-600 mt-1">
                                Пароль и двухфакторная аутентификация
                            </p>
                        </div>

                        <div className="space-y-3 max-w-lg">
                            <button className="cursor-pointer w-full py-4 px-5 bg-gray-50 border border-gray-200 rounded-xl text-left hover:bg-gray-100 transition-colors group">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <button className="cursor-pointer font-medium text-gray-900">
                                            Изменить пароль
                                        </button>
                                        <div className="text-sm text-gray-500 mt-1">
                                            Последнее изменение: {user.registeredAt.split("T")[0]}
                                        </div>
                                    </div>
                                    <ChevronRight
                                        className="text-gray-400 group-hover:text-gray-600"
                                        size={20}
                                    />
                                </div>
                            </button>

                            <button className="cursor-pointer w-full py-4 px-5 bg-gray-50 border border-gray-200 rounded-xl text-left hover:bg-gray-100 transition-colors group">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <button className="cursor-pointer font-medium text-gray-900">
                                            Двухфакторная аутентификация
                                        </button>
                                        <div className="text-sm text-gray-500 mt-1">Отключена</div>
                                    </div>
                                    <ChevronRight
                                        className="text-gray-400 group-hover:text-gray-600"
                                        size={20}
                                    />
                                </div>
                            </button>
                        </div>
                    </div>
                )}

                {activeSettingsTab === "payment" && user.role === "freelancer" && (
                    <div>
                        <div className="mb-6">
                            <h2 className="text-2xl font-bold text-gray-900">Платежи</h2>
                            <p className="text-sm text-gray-600 mt-1">
                                {user.role === "freelancer"
                                    ? "Способы вывода средств"
                                    : "Способ оплаты"}
                            </p>
                        </div>

                        <div className="text-center py-12 max-w-md mx-auto">
                            <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <CreditCard className="text-blue-600" size={32} />
                            </div>
                            <p className="text-gray-500 mb-6">Платежные реквизиты не добавлены</p>
                            <button className="cursor-pointer px-6 py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-colors">
                                Добавить карту
                            </button>
                        </div>
                    </div>
                )}

                {activeSettingsTab === "danger" && (
                    <div>
                        <div className="mb-6">
                            <h2 className="text-2xl font-bold text-red-900">Опасная зона</h2>
                            <p className="text-sm text-red-600 mt-1">
                                Необратимые действия с аккаунтом
                            </p>
                        </div>

                        <div className="space-y-4 max-w-lg">
                            <div className="bg-red-100 border-2 border-red-300 rounded-xl p-4">
                                <h3 className="font-semibold text-red-900 mb-2">
                                    Удаление аккаунта
                                </h3>
                                <p className="text-sm text-red-700 mb-4">
                                    Безвозвратное удаление всех данных. Это действие нельзя
                                    отменить.
                                </p>
                                <button
                                    className="cursor-pointer px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors text-sm"
                                    onClick={handleDeleteAccount}
                                >
                                    Удалить аккаунт навсегда
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
