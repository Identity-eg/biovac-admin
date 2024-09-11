import { create } from 'zustand';
import { TLoginResponse } from '@/apis/auth';

type TAuthState = {
  accessToken: string | null;
  isAuthenticated: boolean;
  authenticateUser: (data: TLoginResponse) => void;
  logUserOut: () => void;
};

export const useAuthStore = create<TAuthState>()((set) => ({
  accessToken: null,
  isAuthenticated: false,
  authenticateUser: (data: TLoginResponse) =>
    set(() => ({
      isAuthenticated: true,
      accessToken: data.accessToken,
    })),
  logUserOut: () =>
    set(() => ({ accessToken: null, isAuthenticated: false })),
}));

export const setAccessTokenToStore = (accessToken: string) =>
  useAuthStore.setState({ accessToken });

export const removeAccessTokenFromStore = () =>
  useAuthStore.setState({ accessToken: null });
