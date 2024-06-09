import { refreshAccessTokenFn } from './auth';

export const refreshAuth = async (failedRequest: any) => {
  const { accessToken } = await refreshAccessTokenFn();
  if (accessToken) {
    failedRequest.response.config.headers.Authorization = `Bearer ${accessToken}`;
    return Promise.resolve(accessToken);
  } else {
    return Promise.reject();
  }
};
