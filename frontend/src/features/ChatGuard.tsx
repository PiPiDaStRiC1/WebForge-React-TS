import { Navigate, useParams } from "react-router-dom";
import { useEffect, useRef } from "react";
import { AuthStore } from "@/lib/storage/authStore";
import toast from "react-hot-toast";

interface ChatGuardProps {
    children: React.ReactNode;
}

export const ChatGuard = ({ children }: ChatGuardProps) => {
    const { userId } = useParams<{ userId: string }>();
    const isToastNotification = useRef(false);
    const currentUserId = new AuthStore().getUserId();

    useEffect(() => {
        if (userId && currentUserId === Number(userId) && !isToastNotification.current) {
            toast.error("Вы не можете отправлять сообщения самому себе", {
                style: { textAlign: "center" },
                duration: 3000,
            });
            isToastNotification.current = true;
        }
    }, [currentUserId, userId]);

    if (currentUserId === Number(userId)) {
        return <Navigate to="/auth" replace />;
    }

    return <>{children}</>;
};
