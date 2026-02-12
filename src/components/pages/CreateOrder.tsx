import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Briefcase,
    FileText,
    DollarSign,
    Clock,
    Tag,
    Layers,
    ChevronDown,
    X,
    Plus,
} from "lucide-react";
import { CATEGORIES, allSkills } from "@/lib/constants";
import { Preview } from "@/components/ui";
import toast from "react-hot-toast";
import type { Order } from "@/types";
import { useUser } from "@/hooks";
import { useQuery } from "@tanstack/react-query";
import { fetchAllOrders } from "@/lib/api/fetchAllOrders";

export interface OrderFormData {
    title: string;
    description: string;
    category: string;
    budgetMin: number;
    budgetMax: number;
    deadline: number;
    skills?: string[];
}

interface ErrorData extends Omit<OrderFormData, "skills" | "budgetMin" | "budgetMax" | "deadline"> {
    skills: string;
    budgetMax: string;
    budgetMin: string;
    deadline: string;
}

const BASE_CATEGORY = "web-dev";

const initialFormData: OrderFormData = {
    title: "",
    description: "",
    category: BASE_CATEGORY,
    budgetMin: 0,
    budgetMax: 0,
    deadline: 0,
};

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
        console.error("Failed to parse auth-data:", error);

        sessionStorage.setItem("create-order-draft", JSON.stringify(initialFormData));

        return initialFormData;
    }
};

const initSelectedSkills = () => {
    const category = BASE_CATEGORY;
    return CATEGORIES.find((cat) => cat.id === category)?.subcategories || [];
};

const handleSubmitForm = async (data: Order, signal: AbortSignal): Promise<void> => {
    await new Promise((resolve, reject) => {
        const timer = setTimeout(() => {
            const raw = localStorage.getItem("custom-orders");
            const customOrders = raw ? (JSON.parse(raw) as Record<string, Order>) : {};

            localStorage.setItem(
                "custom-orders",
                JSON.stringify({ ...customOrders, [data.id]: data }),
            );
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

export const CreateOrder = () => {
    const navigate = useNavigate();
    const { refetch } = useQuery({ queryKey: ["orders"], queryFn: fetchAllOrders });
    const { user } = useUser();
    const [formData, setFormData] = useState<OrderFormData>(initFormData);

    const [selectedSkills, setSelectedSkills] = useState<string[]>(initSelectedSkills);
    const [customSkill, setCustomSkill] = useState("");
    const [showSkillsDropdown, setShowSkillsDropdown] = useState(false);
    const [showPreview, setShowPreview] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<Partial<ErrorData>>({});
    const controllerRef = useRef<AbortController | null>(null);

    const handleInputChange = (field: keyof OrderFormData, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors((prev) => ({ ...prev, [field]: "" }));
        }
    };

    const toggleSkill = (skill: string) => {
        setSelectedSkills((prev) =>
            prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill],
        );
    };

    const addSkillsFromSubCat = (category: string) => {
        const subCatSkills = CATEGORIES.find((cat) => cat.id === category)?.subcategories;

        if (subCatSkills) {
            setSelectedSkills(subCatSkills);
        } else {
            setSelectedSkills([]);
        }
        setErrors((prev) => ({ ...prev, skills: "" }));
    };

    const addCustomSkill = () => {
        if (customSkill.trim() && !selectedSkills.includes(customSkill.trim())) {
            setSelectedSkills((prev) => [...prev, customSkill.trim()]);
            setCustomSkill("");
        }
    };

    const removeSkill = (skill: string) => {
        setSelectedSkills((prev) => prev.filter((s) => s !== skill));
    };

    const validateForm = () => {
        const newErrors: Partial<ErrorData> = {};

        if (!formData.title.trim()) newErrors.title = "Введите название заказа";
        if (!formData.description.trim()) newErrors.description = "Опишите задачу";
        if (selectedSkills.length === 0) newErrors.skills = "Выберите хотя бы один навык";
        if (!formData.budgetMin) newErrors.budgetMin = "Укажите минимальный бюджет";
        if (!formData.budgetMax) newErrors.budgetMax = "Укажите максимальный бюджет";
        if (Number(formData.budgetMin) >= Number(formData.budgetMax)) {
            newErrors.budgetMax = "Максимум должен быть больше минимума";
        }
        if (!formData.deadline) newErrors.deadline = "Укажите срок выполнения";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleAbort = () => {
        controllerRef.current?.abort();
        setLoading(false);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            setLoading(true);
            controllerRef.current?.abort();

            controllerRef.current = new AbortController();
            const signal = controllerRef.current.signal;
            const data: Order = {
                ...formData,
                skills: selectedSkills,
                id: Math.floor(Math.random() * 10000000),
                status: "new",
                responsesCount: 0,
                createdAt: new Date().toISOString().split("T")[0],
                completedById: null,
                clientId: user!.id, // we are sure, what user exist, because this page is protected by ProtectedRoute
            };

            try {
                await handleSubmitForm(data, signal);

                toast.success("Заказ успешно создан!");
                refetch();
                navigate(`/orders?category=${formData.category}`);
                setFormData(initialFormData);
            } catch (error) {
                if ((error as DOMException).name === "AbortError") {
                    toast.error("Публикация заказа отменена");
                } else {
                    toast.error("Что-то пошло не так");
                }
            } finally {
                setLoading(false);
                sessionStorage.removeItem("create-order-draft");
                controllerRef.current = null;
            }
        }
    };

    useEffect(() => {
        sessionStorage.setItem("create-order-draft", JSON.stringify(formData));
    }, [formData]);

    useEffect(() => {
        return () => controllerRef.current?.abort();
    }, []);

    return (
        <div className="min-h-screen pb-10">
            <section className="relative">
                <div className="absolute inset-0 h-64 via-purple-50">
                    <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-200 rounded-full blur-3xl opacity-40" />
                    <div className="absolute -bottom-32 -left-32 w-[28rem] h-[28rem] bg-purple-200 rounded-full blur-3xl opacity-40" />
                </div>

                <div className="relative pt-20 pb-32">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-indigo-100 text-sm font-medium text-indigo-600 mb-4">
                            <Briefcase size={16} />
                            Создание заказа
                        </div>

                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                            Разместите свой заказ
                        </h1>
                        <p className="text-lg text-gray-600">
                            Опишите задачу детально, чтобы исполнители могли дать точную оценку
                        </p>
                    </div>
                </div>
            </section>

            <section className="relative -mt-20">
                <div className="max-w-4xl mx-auto">
                    <form
                        onSubmit={handleSubmit}
                        className="bg-white/70 backdrop-blur-sm border border-gray-200 rounded-2xl shadow-xl p-8"
                    >
                        <div className="mb-6">
                            <label className="flex items-center gap-2 text-sm font-semibold text-gray-900 mb-2">
                                <FileText size={18} className="text-indigo-500" />
                                Название заказа
                                <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                value={formData.title}
                                onChange={(e) => handleInputChange("title", e.target.value)}
                                placeholder="Например: Разработка landing page для стартапа"
                                className={`w-full h-12 px-4 bg-white border ${
                                    errors.title
                                        ? "border-red-300 focus:ring-red-500/10"
                                        : "border-gray-200 focus:ring-indigo-500/10"
                                } rounded-xl outline-none focus:ring-4 focus:border-indigo-500 transition-all`}
                            />
                            {errors.title && (
                                <p className="mt-1 text-sm text-red-600">{errors.title}</p>
                            )}
                        </div>

                        <div className="mb-6">
                            <label className="flex items-center gap-2 text-sm font-semibold text-gray-900 mb-2">
                                <FileText size={18} className="text-indigo-500" />
                                Описание задачи
                                <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                value={formData.description}
                                onChange={(e) => handleInputChange("description", e.target.value)}
                                placeholder="Подробно опишите что нужно сделать, требования к работе, желаемый результат..."
                                rows={6}
                                className={`w-full px-4 py-3 bg-white border ${
                                    errors.description
                                        ? "border-red-300 focus:ring-red-500/10"
                                        : "border-gray-200 focus:ring-indigo-500/10"
                                } rounded-xl outline-none focus:ring-4 focus:border-indigo-500 transition-all resize-none`}
                            />
                            {errors.description && (
                                <p className="mt-1 text-sm text-red-600">{errors.description}</p>
                            )}
                            <p className="mt-1 text-xs text-gray-500">
                                Минимум 20 символов. Чем детальнее описание, тем точнее будут
                                предложения исполнителей
                            </p>
                        </div>

                        <div className="mb-6">
                            <label className="flex items-center gap-2 text-sm font-semibold text-gray-900 mb-2">
                                <Layers size={18} className="text-indigo-500" />
                                Категория
                            </label>
                            <div className="relative">
                                <select
                                    value={formData.category}
                                    onChange={(e) => {
                                        handleInputChange("category", e.target.value);
                                        addSkillsFromSubCat(e.target.value);
                                    }}
                                    className="w-full h-12 px-4 pr-10 bg-white border border-gray-200 rounded-xl outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all appearance-none cursor-pointer"
                                >
                                    {CATEGORIES.map((cat) => (
                                        <option key={cat.id} value={cat.id}>
                                            {cat.name}
                                        </option>
                                    ))}
                                </select>
                                <ChevronDown
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                                    size={20}
                                />
                            </div>
                        </div>

                        <div className="mb-6">
                            <label className="flex items-center gap-2 text-sm font-semibold text-gray-900 mb-2">
                                <Tag size={18} className="text-indigo-500" />
                                Требуемые навыки
                                <span className="text-red-500">*</span>
                            </label>

                            {selectedSkills.length > 0 && (
                                <div className="flex flex-wrap gap-2 mb-3 p-3 bg-indigo-50/50 border border-indigo-100 rounded-xl">
                                    {selectedSkills.map((skill) => (
                                        <span
                                            key={skill}
                                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-indigo-200 text-indigo-700 rounded-lg text-sm font-medium"
                                        >
                                            {skill}
                                            <button
                                                type="button"
                                                onClick={() => removeSkill(skill)}
                                                className="hover:text-red-600 transition-colors"
                                            >
                                                <X size={14} className="cursor-pointer" />
                                            </button>
                                        </span>
                                    ))}
                                </div>
                            )}

                            <div className="relative mb-3">
                                <button
                                    type="button"
                                    onClick={() => setShowSkillsDropdown(!showSkillsDropdown)}
                                    className={`cursor-pointer w-full h-12 px-4 bg-white border ${
                                        errors.skills ? "border-red-300" : "border-gray-200"
                                    } rounded-xl text-left text-gray-600 hover:border-indigo-200 transition-all flex items-center justify-between`}
                                >
                                    <span>Выберите из популярных навыков</span>
                                    <ChevronDown
                                        size={20}
                                        className={`transition-transform ${showSkillsDropdown ? "rotate-180" : ""}`}
                                    />
                                </button>

                                {showSkillsDropdown && (
                                    <div className="absolute top-full left-0 right-0 mt-2 p-3 bg-white border border-gray-200 rounded-xl shadow-xl z-10 max-h-64 overflow-y-auto">
                                        <div className="flex flex-wrap gap-2">
                                            {allSkills.map((skill) => (
                                                <button
                                                    key={skill}
                                                    type="button"
                                                    onClick={() => toggleSkill(skill)}
                                                    className={`cursor-pointer px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                                                        selectedSkills.includes(skill)
                                                            ? "bg-indigo-600 text-white"
                                                            : "bg-gray-100 text-gray-700 hover:bg-indigo-50 hover:text-indigo-700"
                                                    }`}
                                                >
                                                    {skill}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={customSkill}
                                    onChange={(e) => setCustomSkill(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            e.preventDefault();
                                            addCustomSkill();
                                        }
                                    }}
                                    placeholder="Или добавьте свой навык"
                                    className="flex-1 h-10 px-4 bg-white border border-gray-200 rounded-lg outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all text-md"
                                />
                                <button
                                    type="button"
                                    onClick={addCustomSkill}
                                    className="cursor-pointer h-10 px-4 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors flex items-center gap-1.5"
                                >
                                    <Plus size={16} />
                                    Добавить
                                </button>
                            </div>
                            {errors.skills && (
                                <p className="mt-1 text-sm text-red-600">{errors.skills}</p>
                            )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                            <div>
                                <label className="flex items-center gap-2 text-sm font-semibold text-gray-900 mb-2">
                                    <DollarSign size={18} className="text-indigo-500" />
                                    Минимальный бюджет (₽)
                                    <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="number"
                                    value={formData.budgetMin}
                                    onChange={(e) => handleInputChange("budgetMin", e.target.value)}
                                    placeholder="5000"
                                    className={`w-full h-12 px-4 bg-white border ${
                                        errors.budgetMin
                                            ? "border-red-300 focus:ring-red-500/10"
                                            : "border-gray-200 focus:ring-indigo-500/10"
                                    } rounded-xl outline-none focus:ring-4 focus:border-indigo-500 transition-all`}
                                />
                                {errors.budgetMin && (
                                    <p className="mt-1 text-sm text-red-600">{errors.budgetMin}</p>
                                )}
                            </div>
                            <div>
                                <label className="flex items-center gap-2 text-sm font-semibold text-gray-900 mb-2">
                                    <DollarSign size={18} className="text-indigo-500" />
                                    Максимальный бюджет (₽)
                                    <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="number"
                                    value={formData.budgetMax}
                                    onChange={(e) => handleInputChange("budgetMax", e.target.value)}
                                    placeholder="15000"
                                    className={`w-full h-12 px-4 bg-white border ${
                                        errors.budgetMax
                                            ? "border-red-300 focus:ring-red-500/10"
                                            : "border-gray-200 focus:ring-indigo-500/10"
                                    } rounded-xl outline-none focus:ring-4 focus:border-indigo-500 transition-all`}
                                />
                                {errors.budgetMax && (
                                    <p className="mt-1 text-sm text-red-600">{errors.budgetMax}</p>
                                )}
                            </div>
                        </div>

                        <div className="mb-8">
                            <label className="flex items-center gap-2 text-sm font-semibold text-gray-900 mb-2">
                                <Clock size={18} className="text-indigo-500" />
                                Срок выполнения (дней)
                                <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="number"
                                value={formData.deadline}
                                onChange={(e) => handleInputChange("deadline", e.target.value)}
                                placeholder="7"
                                className={`w-full md:w-64 h-12 px-4 bg-white border ${
                                    errors.deadline
                                        ? "border-red-300 focus:ring-red-500/10"
                                        : "border-gray-200 focus:ring-indigo-500/10"
                                } rounded-xl outline-none focus:ring-4 focus:border-indigo-500 transition-all`}
                            />
                            {errors.deadline && (
                                <p className="mt-1 text-sm text-red-600">{errors.deadline}</p>
                            )}
                        </div>

                        <div className="flex items-center gap-2 pt-6 border-t border-gray-200">
                            <button
                                type="submit"
                                className="cursor-pointer flex-1 md:flex-none h-14 px-8 bg-indigo-600 text-white rounded-xl font-semibold shadow-lg shadow-indigo-500/25 hover:bg-indigo-700 hover:shadow-indigo-500/35 transition-all flex items-center justify-center gap-2"
                            >
                                {loading ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />
                                        Публикуем...
                                    </>
                                ) : (
                                    <>
                                        <Briefcase size={20} />
                                        Опубликовать заказ
                                    </>
                                )}
                            </button>
                            {loading && (
                                <button
                                    className="cursor-pointer text-white rounded-md bg-indigo-600 h-14 w-14 flex items-center justify-center"
                                    onClick={handleAbort}
                                >
                                    <X size={20} />
                                </button>
                            )}
                            <button
                                type="button"
                                className="cursor-pointer h-14 px-6 bg-white border border-gray-200 text-gray-700 rounded-xl font-semibold hover:border-indigo-200 hover:text-indigo-700 transition-all"
                                onClick={() => setShowPreview(true)}
                            >
                                Предпросмотр
                            </button>
                        </div>
                    </form>
                    {showPreview && (
                        <Preview
                            onClose={() => setShowPreview(false)}
                            data={{ ...formData, skills: selectedSkills }}
                        />
                    )}
                </div>
            </section>
        </div>
    );
};
