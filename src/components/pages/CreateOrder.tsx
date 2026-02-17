import { useEffect, useState } from "react";
import { useCreateOrder, BASE_CATEGORY, type OrderFormData } from "@/hooks";
import { Briefcase, FileText, DollarSign, Clock, Tag, Layers, ChevronDown, X } from "lucide-react";
import { CATEGORIES, allSkills } from "@/lib/constants";
import { Preview } from "@/components/ui";
import toast from "react-hot-toast";

const initSelectedSkills = () => {
    const savedOrderDraft = sessionStorage.getItem("create-order-draft");
    const parsedDraft: OrderFormData = savedOrderDraft ? JSON.parse(savedOrderDraft) : null;

    if (parsedDraft) {
        return CATEGORIES.find((cat) => cat.id === parsedDraft.category)?.subcategories || [];
    } else {
        return CATEGORIES.find((cat) => cat.id === BASE_CATEGORY)?.subcategories || [];
    }
};

const CreateOrder = () => {
    const {
        register,
        errors,
        handleAbort,
        handleSubmit,
        isLoadingSubmitting,
        isValid,
        currentFormValues,
        setValue,
    } = useCreateOrder();

    const [showSkillsDropdown, setShowSkillsDropdown] = useState(false);
    const [showPreview, setShowPreview] = useState(false);
    const [selectedSkills, setSelectedSkills] = useState<string[]>(initSelectedSkills);

    const toggleSkill = (skill: string) => {
        setSelectedSkills((prev) =>
            prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill],
        );

        setValue(
            "skills",
            selectedSkills.includes(skill)
                ? selectedSkills.filter((s) => s !== skill)
                : [...selectedSkills, skill],
        );
    };

    const addSkillsFromSubCat = (category: string) => {
        const subCatSkills = CATEGORIES.find((cat) => cat.id === category)?.subcategories;

        if (subCatSkills) {
            setSelectedSkills(subCatSkills);
            setValue("skills", subCatSkills);
        } else {
            setSelectedSkills([]);
            setValue("skills", []);
        }
    };

    const removeSkill = (skill: string) => {
        if (selectedSkills.length > 1) {
            setSelectedSkills((prev) => prev.filter((s) => s !== skill));
            setValue(
                "skills",
                selectedSkills.filter((s) => s !== skill),
            );
        } else {
            toast.error("Должен быть хотя бы один навык");
        }
    };

    useEffect(() => {
        sessionStorage.setItem("create-order-draft", JSON.stringify(currentFormValues));
    }, [currentFormValues]);

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
                                {...register("title")}
                                placeholder="Например: Разработка landing page для стартапа"
                                className={`w-full h-12 px-4 bg-white border ${
                                    errors.title
                                        ? "border-red-300 focus:ring-red-500/10"
                                        : "border-gray-200 focus:ring-indigo-500/10"
                                } rounded-xl outline-none focus:ring-4 focus:border-indigo-500 transition-all`}
                            />
                            {errors.title && (
                                <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
                            )}
                        </div>

                        <div className="mb-6">
                            <label className="flex items-center gap-2 text-sm font-semibold text-gray-900 mb-2">
                                <FileText size={18} className="text-indigo-500" />
                                Описание задачи
                                <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                {...register("description")}
                                placeholder="Подробно опишите что нужно сделать, требования к работе, желаемый результат..."
                                rows={6}
                                className={`w-full px-4 py-3 bg-white border ${
                                    errors.description
                                        ? "border-red-300 focus:ring-red-500/10"
                                        : "border-gray-200 focus:ring-indigo-500/10"
                                } rounded-xl outline-none focus:ring-4 focus:border-indigo-500 transition-all resize-none`}
                            />
                            {errors.description && (
                                <p className="mt-1 text-sm text-red-600">
                                    {errors.description.message}
                                </p>
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
                                    {...register("category")}
                                    className="w-full h-12 px-4 pr-10 bg-white border border-gray-200 rounded-xl outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all appearance-none cursor-pointer"
                                    onClick={() => addSkillsFromSubCat(currentFormValues.category)}
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
                                    className="cursor-pointer w-full h-12 px-4 bg-white border rounded-xl text-left text-gray-600 hover:border-indigo-200 transition-all flex items-center justify-between"
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
                                    {...register("budgetMin", { valueAsNumber: true })}
                                    placeholder="5000"
                                    className={`w-full h-12 px-4 bg-white border ${
                                        errors.budgetMin
                                            ? "border-red-300 focus:ring-red-500/10"
                                            : "border-gray-200 focus:ring-indigo-500/10"
                                    } rounded-xl outline-none focus:ring-4 focus:border-indigo-500 transition-all`}
                                />
                                {errors.budgetMin && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.budgetMin.message}
                                    </p>
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
                                    {...register("budgetMax", { valueAsNumber: true })}
                                    placeholder="15000"
                                    className={`w-full h-12 px-4 bg-white border ${
                                        errors.budgetMax
                                            ? "border-red-300 focus:ring-red-500/10"
                                            : "border-gray-200 focus:ring-indigo-500/10"
                                    } rounded-xl outline-none focus:ring-4 focus:border-indigo-500 transition-all`}
                                />
                                {errors.budgetMax && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.budgetMax.message}
                                    </p>
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
                                {...register("deadline", { valueAsNumber: true })}
                                placeholder="7"
                                className={`w-full md:w-64 h-12 px-4 bg-white border ${
                                    errors.deadline
                                        ? "border-red-300 focus:ring-red-500/10"
                                        : "border-gray-200 focus:ring-indigo-500/10"
                                } rounded-xl outline-none focus:ring-4 focus:border-indigo-500 transition-all`}
                            />
                            {errors.deadline && (
                                <p className="mt-1 text-sm text-red-600">
                                    {errors.deadline.message}
                                </p>
                            )}
                        </div>

                        <div className="flex items-center gap-2 pt-6 border-t border-gray-200">
                            <button
                                type="submit"
                                className="disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer flex-1 md:flex-none h-14 px-8 bg-indigo-600 text-white rounded-xl font-semibold shadow-lg shadow-indigo-500/25 hover:bg-indigo-700 hover:shadow-indigo-500/35 transition-all flex items-center justify-center gap-2"
                                disabled={!isValid}
                            >
                                {isLoadingSubmitting ? (
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
                            {isLoadingSubmitting && (
                                <button
                                    className="cursor-pointer text-white rounded-md bg-indigo-600 h-14 w-14 flex items-center justify-center"
                                    onClick={handleAbort}
                                >
                                    <X size={20} />
                                </button>
                            )}
                            <button
                                type="button"
                                className="disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer h-14 px-6 bg-white border border-gray-200 text-gray-700 rounded-xl font-semibold hover:border-indigo-200 hover:text-indigo-700 transition-all"
                                onClick={() => setShowPreview(true)}
                                disabled={!isValid}
                            >
                                Предпросмотр
                            </button>
                        </div>
                    </form>
                    {showPreview && (
                        <Preview
                            onClose={() => setShowPreview(false)}
                            data={{ ...currentFormValues, skills: selectedSkills }}
                        />
                    )}
                </div>
            </section>
        </div>
    );
};

export default CreateOrder;
