import { useCallback } from 'react';
import { Loader, UploadCloud } from 'lucide-react';
import { UseFormGetValues, UseFormSetValue } from 'react-hook-form';
import { useDropzone } from 'react-dropzone';
import { z } from 'zod';
// UI
import { Input } from '../ui/input';
import ImagesView from './ImagesView';
// Utils
import { useUploadImage } from '@/apis/products';
import { variantsSchema } from './Schema';

export default function UploadImage({
  setValue,
  getValues,
}: {
  getValues: UseFormGetValues<z.infer<typeof variantsSchema>>;
  setValue: UseFormSetValue<z.infer<typeof variantsSchema>>;
}) {
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
            'images',
            [
              ...getValues('images'),
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
            'flex flex-col items-center justify-center w-full h-20 border cursor-pointer hover:bg-gray-50' +
            (isDragActive ? ' ' : ' ')
          }
        >
          {uploadImage.isPending ? (
            <>
              <Loader color='gray ' size={30} className='animate-spin' />
              <p className='text-gray-400'>Please wait while uploading...</p>
            </>
          ) : (
            <>
              <UploadCloud size={40} color='gray' />
              <p className='text-gray-600'>
                Drop image here or click to upload.
              </p>
            </>
          )}
        </div>
      </div>
      <article className='grid grid-cols-2 gap-4'>
        <ImagesView
          images={[...getValues('images')]}
          setValue={setValue}
          getValues={getValues}
        />
      </article>
    </>
  );
}
