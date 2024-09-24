import { useMutation } from "@tanstack/react-query";
import { request } from "../client";


const uploadSingleImage = async ({ formData }: { formData: FormData }) => {
  const { data } = await request({
    url: `upload/single`,
    method: 'POST',
    data: formData,
  });
  return data;
};

export function useUploadSingleImage() {
  return useMutation({ mutationFn: uploadSingleImage, retry: false });
}

const uploadMultipleImage = async ({ formData }: { formData: FormData }) => {
  const { data } = await request({
    url: `upload/multiple`,
    method: 'POST',
    data: formData,
  });
  return data;
};

export function useUploadMultipleImage() {
  return useMutation({ mutationFn: uploadMultipleImage, retry: false });
}
