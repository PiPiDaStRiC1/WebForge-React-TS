import { useState } from "react";
import { useUser } from "./useUser";
import toast from "react-hot-toast";
import { emailRegExp, passwordRegExp, nameRegExp } from "@/lib/constants/regExpFormValidation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import type { UserData } from "@/types";

type TabType = "login" | "register";
type RoleType = "freelancer" | "client";

export type FormDataLogin = z.infer<typeof loginSchema>;
export type FormDataRegister = z.infer<typeof registerSchema>;

const loginSchema = z.object({
    email: z.string().regex(emailRegExp, { message: "Некорректный email адрес" }),
    password: z
        .string()
        .regex(passwordRegExp, {
            error: "Пароль должен быть не менее 8 символов и содержать хотя бы одну заглавную букву и одну цифру",
        }),
});

const registerSchema = z
    .object({
        name: z
            .string({ error: "В имени должны быть только буквы" })
            .min(2, { error: "Имя должно содержать только буквы и быть от 2 до 30 символов" })
            .max(30, { error: "Имя должно содержать только буквы и не превышать 30 символов" })
            .regex(nameRegExp, { error: "Имя должно содержать только буквы" }),
        lastName: z
            .string({ error: "В фамилии должны быть только буквы" })
            .min(2, { error: "Фамилия должно содержать только буквы и быть от 2 до 30 символов" })
            .max(30, { error: "Фамилия должно содержать только буквы и не превышать 30 символов" })
            .regex(nameRegExp, { error: "Фамилия должно содержать только буквы" }),
        email: z.string().regex(emailRegExp, { error: "Некорректный email адрес" }),
        password: z
            .string()
            .regex(passwordRegExp, {
                error: "Пароль должен быть не менее 8 символов и содержать хотя бы одну заглавную букву и одну цифру",
            }),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Пароли не совпадают",
        path: ["confirmPassword"],
    });

const hashPassword = async (password: string) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hash = await crypto.subtle.digest("SHA-256", data);

    return Array.from(new Uint8Array(hash))
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");
};

const LOG_TIMER = 1500;

export const useAuth = () => {
    const { registerUser, logInUser } = useUser();
    const [activeTab, setActiveTab] = useState<TabType>("login");
    const [selectedRole, setSelectedRole] = useState<RoleType>("freelancer");
    const [isLoadingSubmitting, setIsLoadingSubmitting] = useState(false);

    const {
        register: registerLogin,
        handleSubmit: handleSubmitLogin,
        formState: { errors: errorsLogin, isValid: isValidLogin },
    } = useForm<FormDataLogin>({ resolver: zodResolver(loginSchema), mode: "onBlur" });

    const {
        register: registerRegister,
        handleSubmit: handleSubmitRegister,
        formState: { errors: errorsRegister, isValid: isValidRegister },
    } = useForm<FormDataRegister>({ resolver: zodResolver(registerSchema), mode: "onBlur" });

    const submitForm = async (formData: FormDataLogin | FormDataRegister) => {
        setIsLoadingSubmitting(true);

        if (activeTab === "register" && isValidRegister && "confirmPassword" in formData) {
            try {
                await new Promise((resolve) => setTimeout(resolve, LOG_TIMER));

                const userId = Math.floor(Math.random() * 10000000);
                const hashedPass = await hashPassword(formData.password);
                const registeredAt = new Date().toISOString();
                // eslint-disable-next-line
                const { confirmPassword, ...restFormData } = formData;

                const userData: UserData =
                    selectedRole === "freelancer"
                        ? {
                              ...restFormData,
                              id: userId,
                              password: hashedPass,
                              role: "freelancer",
                              registeredAt,
                              status: "unverified",
                              bio: "",
                              location: "",
                              skills: [],
                              pricePerHour: 1000,
                              completedOrders: 0,
                              rating: 0,
                              earning: 0,
                              experience: 0,
                              category: "web-dev",
                              gender: "male",
                              login: `${formData.name.toLowerCase()}${formData.lastName.toLowerCase()}${userId.toString().slice(0, 3)}`,
                              phone: "",
                              picture: null,
                          }
                        : {
                              ...restFormData,
                              id: userId,
                              password: hashedPass,
                              role: "client",
                              registeredAt,
                              status: "unverified",
                              bio: "",
                              location: "",
                              placedOrders: 0,
                              spending: 0,
                              gender: "male",
                              login: `${formData.name.toLowerCase()}${formData.lastName.toLowerCase()}${userId.toString().slice(0, 3)}`,
                              phone: "",
                              category: null,
                              experience: null,
                              pricePerHour: null,
                              rating: 0,
                              skills: null,
                              picture: null,
                          };

                registerUser(userData);
                toast.success("Успешно зарегистрированы!");
            } catch (error) {
                toast.error(
                    error instanceof Error
                        ? error.message
                        : "Ошибка при создании аккаунта. Пожалуйста, попробуйте еще раз.",
                );
            } finally {
                setIsLoadingSubmitting(false);
            }
        } else if (activeTab === "login" && isValidLogin) {
            try {
                await new Promise((resolve) => setTimeout(resolve, LOG_TIMER));

                logInUser(formData.email);
                toast.success("Успешно вошли в систему!");
            } catch (error) {
                toast.error(
                    error instanceof Error
                        ? error.message
                        : "Ошибка при входе. Пожалуйста, попробуйте еще раз.",
                );
            } finally {
                setIsLoadingSubmitting(false);
            }
        }
    };

    return {
        activeTab,
        selectedRole,
        isValidLogin,
        isValidRegister,
        errorsLogin,
        errorsRegister,
        isLoadingSubmitting,
        handleSubmitLogin,
        handleSubmitRegister,
        submitForm,
        registerLogin,
        registerRegister,
        setActiveTab,
        setSelectedRole,
    };
};
