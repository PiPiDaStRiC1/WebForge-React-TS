import { useState, useRef, useMemo, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { AuthStore } from "@/lib/storage/authStore";
import { useQuery } from "@tanstack/react-query";
import { fetchAllOrders } from "@/lib/api";
import toast from "react-hot-toast";
import type { Order, AllUserLSData } from "@/types";

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

const handleSubmitForm = async (
    data: Order,
    signal: AbortSignal,
    userId: number,
): Promise<void> => {
    await new Promise((resolve, reject) => {
        const timer = setTimeout(() => {
            const raw = localStorage.getItem("users-data");
            const allUsersData: Record<string, AllUserLSData> = raw ? JSON.parse(raw) : {};

            if (!allUsersData[userId]) {
                allUsersData[userId] = { messages: {}, favorites: {}, createdOrders: {} };
            }

            if (!allUsersData[userId].createdOrders) {
                allUsersData[userId].createdOrders = {};
            }

            const prevCreatedOrders = allUsersData[userId].createdOrders;

            allUsersData[userId].createdOrders = { ...prevCreatedOrders, [data.id]: data };

            localStorage.setItem("users-data", JSON.stringify(allUsersData));
            resolve(true);
        }, 2000);

        if (signal) {
            if (signal.aborted) {
                clearTimeout(timer);
                reject(new DOMException("Aborted", "AbortError"));
                return;
            }

            signal.addEventListener(
                "abort",
                () => {
                    clearTimeout(timer);
                    reject(new DOMException("Aborted", "AbortError"));
                },
                { once: true },
            );
        }
    });
};

const initialFormData: OrderFormData = {
    title: "",
    description: "",
    category: BASE_CATEGORY,
    budgetMin: 0,
    budgetMax: 0,
    deadline: 0,
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
        deadline: z
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
    const currentUserId = useMemo(() => new AuthStore().getUserId(), []);
    const { refetch } = useQuery({ queryKey: ["orders"], queryFn: fetchAllOrders });

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
        watch,
        setValue,
    } = useForm<OrderFormData>({
        resolver: zodResolver(createOrderSchema),
        defaultValues: initFormData(),
        mode: "onBlur",
    });

    const currentFormValues = watch();

    const submitForm = async (formData: OrderFormData) => {
        setIsLoadingSubmitting(true);
        controllerRef.current?.abort();

        controllerRef.current = new AbortController();
        const signal = controllerRef.current.signal;
        const data: Order = {
            ...formData,
            id: Math.floor(Math.random() * 10000000),
            status: "new",
            responsesCount: 0,
            createdAt: new Date().toISOString().split("T")[0],
            completedById: null,
            clientId: currentUserId!, // we are sure, what user exist, because this page is protected by ProtectedRoute
        };

        try {
            await handleSubmitForm(data, signal, currentUserId!);

            toast.success("Заказ успешно создан!");
            refetch();
            navigate(`/orders?category=${formData.category}`);
        } catch (error) {
            if ((error as DOMException).name === "AbortError") {
                toast.error("Публикация заказа отменена");
            } else {
                toast.error("Что-то пошло не так");
            }
        } finally {
            setIsLoadingSubmitting(false);
            sessionStorage.removeItem("create-order-draft");
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
        isLoadingSubmitting,
        handleAbort,
        currentFormValues,
        setValue,
    };
};
