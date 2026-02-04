import { useUser } from '@/hooks';
import { Navigate } from 'react-router-dom';

interface PublicRouteProps {
    children: React.ReactNode;
}

export const ProtectedRoute = ({children}: PublicRouteProps) => {
    const { isAuthenticated, isLoadingLogOut } = useUser();
    if (isLoadingLogOut) return null;

    if (!isAuthenticated) {
        return <Navigate to='/auth' replace/>
    }

    return children;
}