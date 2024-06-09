import { useQuery } from '@tanstack/react-query';
import { useLocation, Navigate, Outlet } from 'react-router-dom';
import Loader from '@/components/ui/loader';
import { useAuthStore } from '@/store/auth';
import { refreshAccessTokenFn } from '@/apis/auth';

export default function PrivateRoute() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const location = useLocation();
  const rememberMe = JSON.parse(localStorage.getItem('remember-me')!);

  const { isFetching } = useQuery({
    queryKey: ['refresh'],
    queryFn: refreshAccessTokenFn,
    enabled: !isAuthenticated && rememberMe ? true : false,
    retry: false
  });

  if (isFetching) return <Loader />;
  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
}
