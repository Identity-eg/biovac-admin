import axios from 'axios';
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import { refreshAuth } from './refreshAuth';
import { useAuthStore } from '@/store/auth';

const baseURL = import.meta.env.PROD
  ? import.meta.env.VITE_API_PROD_URL
  : import.meta.env.VITE_API_DEV_URL;

export const client = axios.create({
  baseURL,
  withCredentials: true,
});

export const setTokenToRequestHeader = (token: string) => {
  client.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const removeTokenFromRequestHeader = () => {
  delete client.defaults.headers.common.Authorization;
};

createAuthRefreshInterceptor(client, refreshAuth, {
  statusCodes: [403],
  pauseInstanceWhileRefreshing: true,
});

export const request = ({ ...options }) => {
  const accessToken = useAuthStore.getState().accessToken;
  client.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  client.defaults.headers.common['api-key'] = import.meta.env.VITE_API_KEY;
  return client(options);
};
