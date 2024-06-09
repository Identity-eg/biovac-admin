import { useQuery } from '@tanstack/react-query';
import { request } from '../client';

// ####################### Get Brands #######################
const getBrands = async () => {
  const { data } = await request({
    url: `brands`,
    method: 'GET',
  });
  return data;
};

export function useGetBrands() {
  return useQuery({
    queryKey: ['get-brands'],
    queryFn: getBrands,
  });
}
