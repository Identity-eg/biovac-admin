import { useQuery } from '@tanstack/react-query';
import qs from 'query-string';
import { request } from '../client';

// ####################### Get Categories #######################
const getSubCategories = async (props: { parent?: string }) => {
  const queryStr = qs.stringify(props, {
    skipEmptyString: true,
    skipNull: true,
  });
  const { data } = await request({
    url: `sub-categories?${queryStr}`,
    method: 'GET',
  });
  return data;
};

export function useGetSubCategories(props: { parent?: string } = {}) {
  return useQuery({
    queryKey: ['get-sub-categories', props],
    queryFn: () => getSubCategories(props),
    enabled: !!props.parent
  });
}
