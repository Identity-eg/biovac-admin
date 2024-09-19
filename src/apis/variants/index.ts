import { useMutation } from '@tanstack/react-query';

import { request } from '../client';
import { TVariant } from '@/types/variant';

// ####################### Add Variant #######################
export const addVariant = async (
  variantData: TVariant
): Promise<{ variant: TVariant }> => {
  const { data } = await request({
    url: 'variants',
    method: 'POST',
    data: variantData,
  });
  return data;
};

export function useAddVariant() {
  return useMutation({
    mutationFn: addVariant,
  });
}

// ####################### Update Product #######################
const updateVariant = async ({
  data: variantData,
  id,
}: {
  data: Partial<TVariant>;
  id: string;
}): Promise<{ variant: TVariant }> => {
  const { data } = await request({
    url: `variants/${id}`,
    method: 'PATCH',
    data: variantData,
  });
  return data;
};

export function useUpdateVariant() {
  return useMutation({
    mutationFn: updateVariant,
  });
}

// ####################### Delete Variant #######################
export const deleteVariant = async (variantId: string) => {
  const { data } = await request({
    url: `variants/${variantId}`,
    method: 'DELETE',
  });
  return data;
};

export function useDeleteVariant() {
  return useMutation({
    mutationFn: deleteVariant,
  });
}
