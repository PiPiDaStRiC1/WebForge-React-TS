import { useCurrentUser } from "@/hooks";
import { useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { Navigate, useParams } from "react-router-dom";

interface ChatGuardProps {
    children: React.ReactNode;
}

export const ChatGuard = ({ children }: ChatGuardProps) => {
    const { userId } = useParams<{ userId: string }>();
    const isToastNotification = useRef(false);
    const { data: currentUser } = useCurrentUser();

    useEffect(() => {
        if (
            currentUser &&
            userId &&
            currentUser.id === Number(userId) &&
            !isToastNotification.current
        ) {
            toast.error("Вы не можете отправлять сообщения самому себе", {
                style: { textAlign: "center" },
                duration: 3000,
            });
            isToastNotification.current = true;
        }
    }, [currentUser, userId]);

    if (!currentUser || currentUser.id === Number(userId)) {
        return <Navigate to="/auth" replace />;
    }

    return <>{children}</>;
};
