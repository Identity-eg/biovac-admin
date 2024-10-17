import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { USER_ROLES } from '@/constants';
import { useGetMe } from '@/apis/users';

export default function SuperAdminRoute({ children }: { children: ReactNode }) {
  const getMeQuery = useGetMe();
  return getMeQuery.data?.role === USER_ROLES.superAdmin.value ? (
    children
  ) : (
    <Navigate to='/' />
  );
}
