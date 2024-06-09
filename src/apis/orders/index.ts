import {
  keepPreviousData,
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { request } from '../client';
import { TOrder } from '@/global';

// ####################### Get Orders #######################
type GetOrdersReturnType = {
  currentPage: number;
  lastPage: number;
  orders: TOrder[];
  totalCount: number;
};

const getOrders = async ({
  pageParam,
  ...rest
}: {
  pageParam: number;
}): Promise<GetOrdersReturnType> => {
  const params = { page: pageParam, ...rest };
  const { data } = await request({
    url: 'orders',
    method: 'GET',
    params,
  });
  return data;
};

export function useGetOrders(props?: any) {
  return useInfiniteQuery({
    queryKey: ['get-orders', props],
    queryFn: ({ pageParam }) => getOrders({ pageParam, ...props }),
    placeholderData: keepPreviousData,
    initialPageParam: 1,
    getNextPageParam: ({ currentPage, lastPage }) => {
      if (currentPage < lastPage) {
        return currentPage + 1;
      } else {
        return undefined;
      }
    },
  });
}

// ####################### View Order #######################
type GetOrderReturnType = {
  order: TOrder;
};
export const viewOrder = async ({
  id,
}: {
  id: string | undefined;
}): Promise<GetOrderReturnType> => {
  const { data } = await request({
    url: `orders/${id}`,
    method: 'GET',
  });
  return data;
};

export function useViewOrder(props: { id: string | undefined }) {
  return useQuery({
    queryKey: ['single-order', props],
    queryFn: () => viewOrder(props),
    select: (data) => data.order,
    enabled: !!props.id,
  });
}

// ####################### Create Order #######################
const createOrder = async ({
  data: orderData,
}: {
  data: Record<string, any>;
}) => {
  const { data } = await request({
    url: `orders`,
    method: 'POST',
    data: orderData,
  });
  return data;
};

export function useCreateOrder() {
  return useMutation({
    mutationFn: createOrder,
  });
}

// ####################### Update Order #######################
const updateOrder = async ({
  data: orderData,
  id,
}: {
  data: Record<string, any>;
  id: string | undefined;
}) => {
  const { data } = await request({
    url: `orders/${id}`,
    method: 'PUT',
    data: orderData,
  });
  return data;
};

export function useUpdateOrder() {
  return useMutation({
    mutationFn: updateOrder,
  });
}

// ####################### Delete Order #######################
const deleteOrder = async ({
  id,
}: {
  id: string | undefined;
}): Promise<{ msg: string }> => {
  const { data } = await request({
    url: `orders/${id}`,
    method: 'DELETE',
  });
  return data;
};

export function useDeleteOrder() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteOrder,
    onSettled: () => {
      // parameters: data, error, variables, context
      queryClient.invalidateQueries({ queryKey: ['get-orders'] });
    },
  });
}
