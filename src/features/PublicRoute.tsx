import { useUser } from "@/hooks";
import { Navigate, useLocation } from "react-router-dom";

interface PublicRouteProps {
    children: React.ReactNode;
}

export const PublicRoute = ({ children }: PublicRouteProps) => {
    const { isAuthenticated } = useUser();
    const location = useLocation();
    const state = location.state as { background?: Location; redirectTo?: string };

    if (isAuthenticated) {
        return <Navigate to={state?.redirectTo || "/my-profile"} replace />;
    }

    return children;
};
