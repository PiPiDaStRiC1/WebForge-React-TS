import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "react-router-dom";
import { Calendar, Clock, DollarSign, MessageCircle, Briefcase, TrendingUp } from "lucide-react";
import { apiClient } from "@/lib/api";
import { ErrorAlert } from "@/components/common";
import { ClientCard, ResponseCard, OrderInfoSkeleton } from "@/components/ui";
import type {
    OrderWithResponsesCount,
    Client,
    Freelancer,
    FreelancersData,
    Response,
} from "@shared/types";

const STATUS_CONFIG = {
    new: { label: "Новый", color: "bg-green-100 text-green-700 border-green-200", icon: "🆕" },
    "in-progress": {
        label: "В работе",
        color: "bg-blue-100 text-blue-700 border-blue-200",
        icon: "⚡",
    },
    completed: {
        label: "Завершен",
        color: "bg-gray-100 text-gray-700 border-gray-200",
        icon: "✅",
    },
};

const isClient = (user: Client | Freelancer | undefined): user is Client => {
    return user?.role === "client";
};

const OrderInfo = () => {
    const { orderId } = useParams<{ orderId: string }>();

    const {
        data: order,
        isLoading: isLoadingOrder,
        isError: isErrorOrder,
    } = useQuery<OrderWithResponsesCount>({
        queryKey: ["orders", orderId],
        queryFn: () => apiClient.getSingleOrder(orderId!),
        enabled: !!orderId,
        staleTime: 30 * 60 * 1000,
    });

    const {
        data: user,
        isLoading: isLoadingUser,
        isError: isErrorUser,
    } = useQuery<Client | Freelancer | undefined>({
        queryKey: ["users", order?.clientId],
        queryFn: () => apiClient.getSingleClient(String(order!.clientId)),
        enabled: !!order?.clientId,
        staleTime: 30 * 60 * 1000,
    });

    const {
        data: freelancers,
        isLoading: isLoadingFreelancers,
        isError: isErrorFreelancers,
    } = useQuery<FreelancersData>({
        queryKey: ["freelancers"],
        queryFn: apiClient.getAllFreelancers,
        enabled: !!order,
    });

    const {
        data: responses,
        isLoading: isLoadingResponses,
        isError: isErrorResponses,
    } = useQuery<Response[]>({
        queryKey: ["responses", orderId],
        queryFn: () => apiClient.getSingleOrderResponses(orderId!),
        enabled: !!orderId,
        staleTime: 10 * 60 * 1000,
    });

    const client = isClient(user) ? user : undefined;

    if (isLoadingOrder || isLoadingUser || isLoadingFreelancers || isLoadingResponses) {
        return <OrderInfoSkeleton />;
    }

    if (isErrorOrder || isErrorUser || isErrorFreelancers || isErrorResponses || !order) {
        return (
            <ErrorAlert
                message="Заказ не найден"
                instructions="Возможно, он был удален или не существует"
            />
        );
    }

    const statusConfig = STATUS_CONFIG[order.status];

    return (
        <div className="min-h-screen pb-10">
            <section className="relative">
                <div className="absolute inset-0 h-64 via-purple-50">
                    <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-200 rounded-full blur-3xl opacity-40" />
                    <div className="absolute -bottom-32 -left-32 w-[28rem] h-[28rem] bg-purple-200 rounded-full blur-3xl opacity-40" />
                </div>

                <div className="relative pt-20 pb-32">
                    <div className="max-w-4xl">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-indigo-100 text-sm font-medium text-indigo-600 mb-4">
                            <Briefcase size={16} />
                            Детали заказа
                        </div>

                        <div className="flex items-start gap-3 mb-4">
                            <span
                                className={`px-4 py-1.5 rounded-xl text-sm font-semibold border ${statusConfig.color}`}
                            >
                                {statusConfig.icon} {statusConfig.label}
                            </span>
                            <span className="px-4 py-1.5 rounded-xl text-sm font-medium bg-white/80 backdrop-blur-sm border border-gray-200 text-gray-700">
                                ID: #{order.id}
                            </span>
                        </div>

                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            {order.title}
                        </h1>

                        <div className="flex flex-wrap items-center gap-4 text-gray-600">
                            <div className="flex items-center gap-2">
                                <Calendar size={18} />
                                <span className="text-sm">
                                    Опубликовано{" "}
                                    {new Date(order.createdAt).toLocaleDateString("ru-RU", {
                                        day: "numeric",
                                        month: "long",
                                        year: "numeric",
                                    })}
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <MessageCircle size={18} />
                                <span className="text-sm">{order.responsesCount} откликов</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="relative -mt-20">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <aside className="lg:col-span-1 space-y-6">
                        <div className="bg-white/70 backdrop-blur-sm border border-gray-200 rounded-2xl p-6 shadow-xl">
                            <h2 className="text-lg font-bold text-gray-900 mb-4">Условия</h2>
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center flex-shrink-0">
                                        <DollarSign size={24} className="text-green-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">Бюджет</p>
                                        <p className="text-xl font-bold text-gray-900">
                                            ₽{order.budgetMin.toLocaleString()} - ₽
                                            {order.budgetMax.toLocaleString()}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0">
                                        <Clock size={24} className="text-blue-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">Срок выполнения</p>
                                        <p className="text-xl font-bold text-gray-900">
                                            {order.deadlineDays} дней
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center flex-shrink-0">
                                        <TrendingUp size={24} className="text-purple-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">Откликов</p>
                                        <p className="text-xl font-bold text-gray-900">
                                            {responses?.length ?? 0}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {order.status === "new" && (
                                <Link
                                    to={`/messages/${order.clientId}`}
                                    className="cursor-pointer w-full mt-6 h-12 flex items-center justify-center gap-2 bg-indigo-600 text-white rounded-xl font-semibold shadow-lg shadow-indigo-500/25 hover:bg-indigo-700 hover:shadow-indigo-500/35 transition-all"
                                >
                                    <MessageCircle size={20} />
                                    Откликнуться на заказ
                                </Link>
                            )}
                        </div>

                        {client && <ClientCard client={client} />}
                    </aside>

                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white/70 backdrop-blur-sm border border-gray-200 rounded-2xl p-6 shadow-xl">
                            <h2 className="text-lg font-bold text-gray-900 mb-4">
                                Описание задачи
                            </h2>
                            <p className="max-w-3xl whitespace-pre-line break-words h-full text-gray-700 leading-relaxed whitespace-pre-line">
                                {order.description}
                            </p>
                        </div>

                        <div className="bg-white/70 backdrop-blur-sm border border-gray-200 rounded-2xl p-6 shadow-xl">
                            <h2 className="text-lg font-bold text-gray-900 mb-4">
                                Требуемые навыки
                            </h2>
                            <div className="flex flex-wrap gap-2">
                                {order.skills.map((skill) => (
                                    <span
                                        key={skill}
                                        className="px-4 py-2 text-sm font-medium bg-indigo-50 text-indigo-700 rounded-xl border border-indigo-100 hover:bg-indigo-100 transition-colors"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="bg-white/70 backdrop-blur-sm border border-gray-200 rounded-2xl p-6 shadow-xl">
                            {responses && freelancers && responses.length > 0 ? (
                                <div className="max-h-[28rem] overflow-y-auto">
                                    {responses.map((response) => {
                                        const freelancer = Object.values(
                                            freelancers.freelancersById,
                                        ).find((f) => f.id === response.freelancerId);

                                        return (
                                            <ResponseCard
                                                key={response.id}
                                                response={response}
                                                freelancer={freelancer}
                                            />
                                        );
                                    })}
                                </div>
                            ) : (
                                <div className="text-center py-12">
                                    <div className="text-5xl mb-4">💬</div>
                                    <p className="text-gray-600">Откликов пока нет</p>
                                    <p className="text-sm text-gray-500 mt-1">
                                        Станьте первым исполнителем
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default OrderInfo;
