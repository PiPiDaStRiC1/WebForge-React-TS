import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api";
import { wait } from "@/lib/utils";
import toast from "react-hot-toast";

export type OrderFormData = z.infer<typeof createOrderSchema>;

export const BASE_CATEGORY = "web-dev";

const initFormData = (): OrderFormData => {
    const raw = sessionStorage.getItem("create-order-draft");

    if (!raw) {
        sessionStorage.setItem("create-order-draft", JSON.stringify(initialFormData));
        return initialFormData;
    }

    try {
        const parsed = JSON.parse(raw) as OrderFormData;
        if (typeof parsed !== "object" || parsed === null) return initialFormData;
        return parsed;
    } catch (error) {
        console.error("Failed to parse create-order-draft:", error);

        sessionStorage.setItem("create-order-draft", JSON.stringify(initialFormData));
        return initialFormData;
    }
};

const handleSubmitForm = async (data: OrderFormData, signal: AbortSignal): Promise<void> => {
    await wait(2000, signal);
    await apiClient.postSingleOrder(data, signal);
};

const initialFormData: OrderFormData = {
    title: "",
    description: "",
    category: BASE_CATEGORY,
    budgetMin: 0,
    budgetMax: 0,
    deadlineDays: 0,
    skills: [],
};

const createOrderSchema = z
    .object({
        title: z.string().min(5, { error: "Название должно быть не менее 5 символов" }),
        description: z.string().min(20, { error: "Описание должно быть не менее 20 символов" }),
        category: z.string().min(3, { error: "Выберите категорию" }),
        budgetMin: z
            .number({ error: "Сумма должна быть числом" })
            .min(1, { error: "Минимальный бюджет должен быть больше 0" }),
        budgetMax: z
            .number({ error: "Сумма должна быть числом" })
            .min(1, { error: "Максимальный бюджет должен быть больше 0" }),
        deadlineDays: z
            .number({ error: "Сумма должна быть числом" })
            .min(1, { error: "Срок должен быть больше 0" }),
        skills: z.array(z.string()),
    })
    .refine((date) => date.budgetMax > date.budgetMin, {
        error: "Максимальный бюджет должен быть больше минимального",
        path: ["budgetMax"],
    });

export const useCreateOrder = () => {
    const navigate = useNavigate();
    const [isLoadingSubmitting, setIsLoadingSubmitting] = useState(false);
    const controllerRef = useRef<AbortController | null>(null);
    const { refetch } = useQuery({ queryKey: ["orders"], queryFn: apiClient.getAllOrders });

    const {
        register,
        handleSubmit,
        formState: { errors, isValid, isSubmitSuccessful },
        watch,
        setValue,
    } = useForm<OrderFormData>({
        resolver: zodResolver(createOrderSchema),
        defaultValues: initFormData(),
        mode: "onChange",
    });

    const currentFormValues = watch();

    const submitForm = async (formData: OrderFormData) => {
        setIsLoadingSubmitting(true);
        controllerRef.current?.abort();

        controllerRef.current = new AbortController();
        const signal = controllerRef.current.signal;

        try {
            await handleSubmitForm(formData, signal);

            toast.success("Заказ успешно создан!");
            sessionStorage.removeItem("create-order-draft");
            navigate(`/orders?category=${formData.category}`);
            refetch();
        } catch (error) {
            if ((error as DOMException).name === "AbortError") {
                toast.error("Публикация заказа отменена");
            } else {
                toast.error("Что-то пошло не так");
            }
        } finally {
            setIsLoadingSubmitting(false);
            controllerRef.current = null;
        }
    };

    const handleAbort = () => {
        controllerRef.current?.abort();
        setIsLoadingSubmitting(false);
    };

    useEffect(() => {
        return () => controllerRef.current?.abort();
    }, [controllerRef]);

    return {
        register,
        handleSubmit: handleSubmit(submitForm),
        errors,
        isValid,
        isSubmitSuccessful,
        isLoadingSubmitting,
        handleAbort,
        currentFormValues,
        setValue,
    };
};
