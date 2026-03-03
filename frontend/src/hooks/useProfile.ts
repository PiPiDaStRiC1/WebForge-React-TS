import { useEffect, useRef, useState } from "react";
import { useUser } from "@/hooks";
import toast from "react-hot-toast";
import type { UserData } from "@/types";

export const useProfile = () => {
    const { changeUserData } = useUser();
    const [isEditing, setIsEditing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const controllerRef = useRef<AbortController | null>(null);

    const handleExit = () => {
        setIsEditing(false);
        setIsSaving(false);
    };

    const handleEdit = () => {
        setIsEditing(true);
        setIsSaving(false);
    };

    const handleSaveForm = async (formData: Partial<UserData>) => {
        controllerRef.current?.abort();
        controllerRef.current = new AbortController();
        const signal = controllerRef.current.signal;
        setIsEditing(false);
        setIsSaving(true);

        try {
            await changeUserData(
                Object.entries(formData) as [keyof UserData, UserData[keyof UserData]][],
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

    useEffect(() => {
        return () => controllerRef.current?.abort();
    }, []);

    return { isEditing, isSaving, handleEdit, handleSaveForm, handleAbort, handleExit };
};
