import { useQuery } from '@tanstack/react-query';
import { Navigate, Outlet } from 'react-router-dom';
import { refreshAccessTokenFn } from '@/apis/auth';
import Loader from '@/components/ui/loader';
import { useAuthStore } from '@/store/auth';

export default function PersistLoggedIn() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const rememberMe = JSON.parse(localStorage.getItem('remember-me')!);

  const { isFetching } = useQuery({
    queryKey: ['refresh'],
    queryFn: refreshAccessTokenFn,
    enabled: !isAuthenticated && rememberMe ? true : false,
    retry: 0,
  });

  if (isFetching) return <Loader />;
  if (isAuthenticated) return <Navigate to="/" />;

  return <Outlet />;
}
