import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { request } from '../client';
import { TCategory } from '@/global';

// ####################### Get Categories #######################
const getCategories = async (): Promise<TCategory[]> => {
  const { data } = await request({
    url: `categories`,
    method: 'GET',
  });
  return data;
};
export function useGetCategories() {
  return useQuery({
    queryKey: ['get-categories'],
    queryFn: getCategories,
  });
}
// ####################### View Category #######################
type GetCategoryReturnType = {
  category: TCategory;
};
export const viewCategory = async ({
  id,
}: {
  id: string | undefined;
}): Promise<GetCategoryReturnType> => {
  const { data } = await request({
    url: `categories/${id}`,
    method: 'GET',
  });
  return data;
};

export function useViewCategory(props: { id: string | undefined }) {
  return useQuery({
    queryKey: ['single-category', props],
    queryFn: () => viewCategory(props),
    select: (data) => data.category,
    enabled: !!props.id,
  });
}

// ####################### Create Category #######################
const createCategory = async ({
  data: categoryData,
}: {
  data: { name: string };
}) => {
  const { data } = await request({
    url: `categories`,
    method: 'POST',
    data: categoryData,
  });
  return data;
};

export function useCreateCategory() {
  return useMutation({
    mutationFn: createCategory,
  });
}

// ####################### Update Category #######################
const updateCategory = async ({
  data: categoryData,
  id,
}: {
  data: Record<string, any>;
  id: string | undefined;
}) => {
  const { data } = await request({
    url: `categories/${id}`,
    method: 'PUT',
    data: categoryData,
  });
  return data;
};

export function useUpdateCategory() {
  return useMutation({
    mutationFn: updateCategory,
  });
}

// ####################### Delete Category #######################
const deleteCategory = async ({
  id,
}: {
  id: string | undefined;
}): Promise<{ msg: string }> => {
  const { data } = await request({
    url: `categories/${id}`,
    method: 'DELETE',
  });
  return data;
};

export function useDeleteCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteCategory,
    onSettled: () => {
      // parameters: data, error, variables, context
      queryClient.invalidateQueries({ queryKey: ['get-categories'] });
    },
  });
}
