import { useCallback } from 'react';
import { Loader, UploadCloud } from 'lucide-react';
import { useFormContext } from 'react-hook-form';
import { useDropzone } from 'react-dropzone';
// UI
import { Input } from '../ui/input';
import ImagesView from './ImagesView';
// Utils
import { useUploadImage } from '@/apis/products';

export default function VariantUploadImage({ index }: { index: number }) {
  const { setValue, getValues } = useFormContext();
  const uploadImage = useUploadImage();

  const onDrop = useCallback((droppedFiles: File[]) => {
    // console.log('droppedFiles', droppedFiles);
    const imageFiles = droppedFiles;
    const formData = new FormData();
    imageFiles.forEach((file) => {
      formData.append('image', file);
    });

    uploadImage.mutate(
      { formData },
      {
        onSuccess: ({ images }) => {
          setValue(
            `variants.${index}.images`,
            [
              ...getValues(`variants.${index}.images`),
              ...imageFiles.map((file, idx) => ({
                name: file.name,
                size: file.size,
                url: images[idx],
              })),
            ],
            {
              shouldValidate: true,
              shouldDirty: true,
              shouldTouch: true,
            }
          );
        },
      }
    );
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    multiple: true,
    onDrop,
    accept: {
      'image/*': [],
    },
  });

  return (
    <>
      <div {...getRootProps()}>
        <Input type='file' {...getInputProps({ name: 'base64' })} />
        <div
          className={
            'flex flex-col items-center justify-center w-full cursor-pointer' +
            (isDragActive ? ' ' : ' ')
          }
        >
          {uploadImage.isPending ? (
            <Loader size={30} className='animate-spin' />
          ) : (
            <UploadCloud
              size={25}
              className='text-gray-400 hover:text-gray-600'
            />
          )}
        </div>
      </div>
      {/* <ImagesView images={[...getValues('images')]} /> */}
    </>
  );
}
