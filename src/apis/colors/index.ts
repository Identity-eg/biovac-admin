import { useQuery } from '@tanstack/react-query';
import { request } from '../client';

// ####################### Get Colors #######################
const getColors = async () => {
  const { data } = await request({
    url: `colors`,
    method: 'GET',
  });
  return data;
};

export function useGetColors() {
  return useQuery({
    queryKey: ['get-colors'],
    queryFn: getColors,
  });
}
