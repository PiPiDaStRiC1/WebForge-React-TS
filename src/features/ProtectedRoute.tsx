import { useUser } from '@/hooks';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
    children: React.ReactNode;
}

export const ProtectedRoute = ({children}: ProtectedRouteProps) => {
    const { isAuthenticated } = useUser();

    if (!isAuthenticated) {
        return <Navigate to='/auth' replace />
    }

    return children;
}