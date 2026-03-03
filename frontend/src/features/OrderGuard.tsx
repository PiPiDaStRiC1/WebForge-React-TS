import { useParams, Navigate } from "react-router-dom";
import { useUser } from "@/hooks";
import { useEffect } from "react";
import toast from "react-hot-toast";

interface OrderGuardProps {
    children: React.ReactNode;
}

export const OrderGuard = ({ children }: OrderGuardProps) => {
    const { orderId } = useParams<{ orderId: string }>();
    const { isAuthenticated } = useUser();

    useEffect(() => {
        if (!isAuthenticated || !orderId) {
            toast.error("Данный заказ сейчас недоступен. Пройдите регистрацию", {
                duration: 3000,
                style: { textAlign: "center" },
            });
        }
    }, [isAuthenticated, orderId]);

    if (!isAuthenticated) {
        return <Navigate to="/orders" replace />;
    }

    return <>{children}</>;
};
