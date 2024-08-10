import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { USER_ROLES } from '@/constants';
import { useAuthStore } from '@/store/auth';

export default function SuperAdminRoute({ children }: { children: ReactNode }) {
  const user = useAuthStore((state) => state.userData);
  return user?.role === USER_ROLES.superAdmin ? children : <Navigate to='/' />;
}
