import { useUser } from '@/hooks';
import { Navigate } from 'react-router-dom';

interface PublicRouteProps {
    children: React.ReactNode;
}

export const PublicRoute = ({children}: PublicRouteProps) => {
    const { isAuthenticated } = useUser();

    if (isAuthenticated) {
        return <Navigate to='/my-profile' replace/>
    }

    return (
        <>{children}</>
    )
}