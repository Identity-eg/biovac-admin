import { useMutation, useQuery } from '@tanstack/react-query';
import { jwtDecode } from 'jwt-decode';
import { request } from '../client';
import { useAuthStore } from '@/store/auth';
import { TUser } from '@/global';

export type TLoginResponse = {
  accessToken: string;
  user: TUser;
};

// ######################## Login ############################
const login = async (user: {
  email: string;
  password: string;
}): Promise<TLoginResponse> => {
  const { data } = await request({
    url: '/auth/login',
    method: 'POST',
    data: user,
  });
  return data;
};

export function useLogin() {
  return useMutation({ mutationFn: login });
}

// ######################## Refresh Token #####################
export const refreshAccessTokenFn = async () => {
  const { data } = await request({ url: 'auth/refresh', method: 'GET' });
  if (data) {
    const user = jwtDecode<TUser>(data.accessToken);
    useAuthStore.getState().authenticateUser({
      accessToken: data.accessToken,
      user,
    });
  }
  return data;
};

// ######################## LogOut ############################
const logout = async () => {
  const { data } = await request({ url: '/auth/logout' });
  return data;
};

export function useLogout() {
  const logOutUser = useAuthStore(state => state.logUserOut)
  return useMutation({
    mutationFn: logout,
    onSuccess: logOutUser,
  });
}
