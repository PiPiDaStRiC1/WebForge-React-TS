import { useQuery } from "@tanstack/react-query";
import { useParams, Navigate } from "react-router-dom";
import { useUser } from "@/hooks";
import { fetchOneOrder } from "@/lib/api";
import { Preloader } from "@/components/common";
import { useEffect } from "react";
import toast from "react-hot-toast";

interface OrderGuardProps {
    children: React.ReactNode;
}

export const OrderGuard = ({ children }: OrderGuardProps) => {
    const { orderId } = useParams<{ orderId: string }>();
    const { isAuthenticated } = useUser();

    const { data: order, isLoading } = useQuery({
        queryKey: ["order", orderId],
        queryFn: async () => await fetchOneOrder(Number(orderId)),
        enabled: !!orderId,
        staleTime: 10 * 60 * 1000,
    });

    useEffect(() => {
        if (
            !isLoading &&
            (!isAuthenticated || order?.status === "completed" || order?.status === "in-progress")
        ) {
            toast.error("Данный заказ сейчас недоступен", { duration: 3000 });
        }
    }, [isAuthenticated, order?.status, isLoading]);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Preloader />
            </div>
        );
    }

    if (!isAuthenticated || order?.status === "completed" || order?.status === "in-progress") {
        return <Navigate to="/orders" replace />;
    }

    return <>{children}</>;
};
