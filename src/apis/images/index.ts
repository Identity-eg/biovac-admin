import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { request } from '../client';
import { TImage, TPath } from '@/global';

// ####################### Get Images #######################
type GetImagesReturnType = {
  images: TImage[];
};

const getImages = async ({
  path,
}: {
  path?: TPath;
}): Promise<GetImagesReturnType> => {
  const { data } = await request({
    url: `images?path=${path}`,
    method: 'GET',
  });
  return data;
};
export function useGetImages(props: { path?: TPath }) {
  return useQuery({
    queryKey: ['get-images'],
    queryFn: () => getImages(props),
  });
}
// ####################### View Image #######################
export const viewImage = async ({
  id,
}: {
  id: string | undefined;
}): Promise<{ image: TImage }> => {
  const { data } = await request({
    url: `images/${id}`,
    method: 'GET',
  });
  return data;
};

export function useViewImage(props: { id: string | undefined }) {
  return useQuery({
    queryKey: ['single-image', props],
    queryFn: () => viewImage(props),
    select: (data) => data.image,
    enabled: !!props.id,
  });
}

// ####################### Create Image #######################

const createImage = async ({
  data: imageData,
}: {
  data: Record<string, any>;
}) => {
  const { data } = await request({
    url: `images`,
    method: 'POST',
    data: imageData,
  });
  return data;
};

export function useCreateImage() {
  return useMutation({
    mutationFn: createImage,
  });
}

// ####################### Update Image #######################
const updateImage = async ({
  data: imageData,
  id,
}: {
  data: Record<string, any>;
  id: string | undefined;
}) => {
  const { data } = await request({
    url: `images/${id}`,
    method: 'PATCH',
    data: imageData,
  });
  return data;
};

export function useUpdateImage() {
  return useMutation({
    mutationFn: updateImage,
  });
}

// ####################### Delete Image #######################
const deleteImage = async ({
  id,
}: {
  id: string | undefined;
}): Promise<{ msg: string }> => {
  const { data } = await request({
    url: `images/${id}`,
    method: 'DELETE',
  });
  return data;
};

export function useDeleteImage() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteImage,
    onSettled: () => {
      // parameters: data, error, variables, context
      queryClient.invalidateQueries({ queryKey: ['get-images'] });
    },
  });
}
