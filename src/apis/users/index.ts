import { useMutation, useQuery } from '@tanstack/react-query';

import { request } from '../client';
import { TUser } from '@/types/user';

// ####################### Get Me #######################
export const getMe = async (): Promise<TUser> => {
  const { data } = await request({
    url: 'users/getMe',
    method: 'GET',
  });
  return data.user;
};

export function useGetMe() {
  return useQuery({
    queryKey: ['get-me'],
    queryFn: getMe,
  });
}

// ##################### Update User Password #####################
const updateUserPassword = async ({
  data: userData,
}: {
  data: { oldPassword: string; newPassword: string };
}) => {
  const { data } = await request({
    url: 'users/updateUserPassword',
    method: 'PATCH',
    data: userData,
  });
  return data;
};

export function useUpdateUserPassword() {
  return useMutation({
    mutationFn: updateUserPassword,
  });
}
