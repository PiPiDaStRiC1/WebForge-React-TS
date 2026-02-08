import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/hooks";
import toast from "react-hot-toast";
import type { UserData, FreelancerData } from "@/types";

export const useProfile = () => {
    const navigate = useNavigate();
    const { user, logOutUser, changeUserData } = useUser();
    const [isEditing, setIsEditing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    // Используем UserData вместо Partial, так как user всегда существует в компонентах
    // Инициализация с пустым объектом as UserData безопасна, так как компоненты проверяют user
    const [changedData, setChangedData] = useState<UserData>(user ?? ({} as UserData));
    const controllerRef = useRef<AbortController | null>(null);

    const handleExit = () => {
        setIsEditing(false);
        setIsSaving(false);
        setChangedData(user ?? ({} as UserData));
    };

    const handleEdit = () => {
        setIsEditing(true);
        setIsSaving(false);
    };

    const handleSave = async () => {
        controllerRef.current?.abort();
        controllerRef.current = new AbortController();
        const signal = controllerRef.current.signal;
        setIsEditing(false);
        setIsSaving(true);

        try {
            await changeUserData(
                Object.entries(changedData) as [keyof UserData, UserData[keyof UserData]][],
                signal,
            );

            toast.success("Изменения успешно сохранены");
        } catch (error) {
            if (error instanceof DOMException && error.name === "AbortError") {
                toast.error("Сохранение изменений отменено");
            } else {
                toast.error("Ошибка при сохранении изменений");
            }
        } finally {
            controllerRef.current = null;
            setIsSaving(false);
        }
    };

    const handleAbort = () => {
        controllerRef.current?.abort();
        controllerRef.current = null;
        setIsSaving(false);
    };

    const handleChangeBaseUser = <T extends keyof UserData>(field: T, value: UserData[T]) => {
        setChangedData((prev) => ({ ...prev, [field]: value }));
    };

    const handleChangeFreelancer = <T extends keyof FreelancerData>(
        field: T,
        value: FreelancerData[T],
    ) => {
        setChangedData((prev) => ({ ...prev, [field]: value }));
    };

    const handleLogOut = () => {
        // Редиректим на главную до изменения состояния,
        // чтобы ProtectedRoute не успел средиректить на /auth
        navigate("/");

        // Очищаем данные после перехода (в следующем тике)
        setTimeout(() => logOutUser(), 100);
    };

    useEffect(() => {
        return () => controllerRef.current?.abort();
    }, []);

    return {
        isEditing,
        isSaving,
        changedData,
        handleEdit,
        handleSave,
        handleAbort,
        handleChangeBaseUser,
        handleChangeFreelancer,
        handleLogOut,
        handleExit,
    };
};
