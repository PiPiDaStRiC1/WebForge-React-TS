import { useState } from "react";
import { useUser } from "./useUser";
import toast from "react-hot-toast";
import { emailRegExp, passwordRegExp, nameRegExp } from "@/lib/constants/regExpFormValidation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

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
    } = useForm<FormDataLogin>({ resolver: zodResolver(loginSchema), mode: "onChange" });

    const {
        register: registerRegister,
        handleSubmit: handleSubmitRegister,
        formState: { errors: errorsRegister, isValid: isValidRegister },
    } = useForm<FormDataRegister>({ resolver: zodResolver(registerSchema), mode: "onChange" });

    const submitForm = async (formData: FormDataLogin | FormDataRegister) => {
        setIsLoadingSubmitting(true);

        if (activeTab === "register" && isValidRegister && "confirmPassword" in formData) {
            try {
                await new Promise((resolve) => setTimeout(resolve, LOG_TIMER));

                // eslint-disable-next-line
                const { confirmPassword, ...rest } = formData;
                await registerUser({ ...rest, role: selectedRole });
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

                await logInUser(formData.email, formData.password);
                toast.success("Успешно вошли в систему!");
            } catch (error) {
                if (error instanceof Error && error.message !== "Unauthorized") {
                    console.error("Login error:", error);
                }
                toast.error("Ошибка при входе");
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
