import {
  keepPreviousData,
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { request } from '../client';
import { TProduct } from '@/types/product';

// ####################### Get Products #######################
type GetProductsReturnType = {
  currentPage: number;
  lastPage: number;
  products: TProduct[];
  totalCount: number;
};

const getProducts = async ({
  pageParam,
  ...rest
}: {
  pageParam: number;
}): Promise<GetProductsReturnType> => {
  const params = { page: pageParam, ...rest };

  const { data } = await request({
    url: 'products',
    method: 'GET',
    params,
  });
  return data;
};

export function useGetProducts(props?: any) {
  return useInfiniteQuery({
    queryKey: ['get-products', props],
    queryFn: ({ pageParam }) => getProducts({ pageParam, ...props }),
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

// ####################### View Product #######################
type GetProductReturnType = {
  product: TProduct;
};
export const viewProduct = async ({
  id,
}: {
  id: string | undefined;
}): Promise<GetProductReturnType> => {
  const { data } = await request({
    url: `products/${id}`,
    method: 'GET',
  });
  return data;
};

export function useViewProduct(props: { id: string | undefined }) {
  return useQuery({
    queryKey: ['single-product', props],
    queryFn: () => viewProduct(props),
    select: (data) => data.product,
    enabled: !!props.id,
  });
}

// ####################### Create Product #######################
const createProduct = async ({
  data: productData,
}: {
  data: Record<string, any>;
}) => {
  const { data } = await request({
    url: `products`,
    method: 'POST',
    data: productData,
  });
  return data;
};

export function useCreateProduct() {
  return useMutation({
    mutationFn: createProduct,
  });
}

// ####################### Update Product #######################
const updateProduct = async ({
  data: productData,
  id,
}: {
  data: Record<string, any>;
  id: string | undefined;
}) => {
  const { data } = await request({
    url: `products/${id}`,
    method: 'PATCH',
    data: productData,
  });
  return data;
};

export function useUpdateProduct() {
  return useMutation({
    mutationFn: updateProduct,
  });
}

// ####################### Delete Product #######################
const deleteProduct = async ({
  id,
}: {
  id: string | undefined;
}): Promise<{ msg: string }> => {
  const { data } = await request({
    url: `products/${id}`,
    method: 'DELETE',
  });
  return data;
};

export function useDeleteProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteProduct,
    onSettled: () => {
      // parameters: data, error, variables, context
      queryClient.invalidateQueries({
        queryKey: ['get-products'],
      });
    },
  });
}

// ####################### Upload Product Image #######################
const uploadImage = async ({ formData }: { formData: FormData }) => {
  const { data } = await request({
    url: `products/uploadImage`,
    method: 'POST',
    data: formData,
  });
  return data;
};

export function useUploadImage() {
  return useMutation({ mutationFn: uploadImage, retry: false });
}
