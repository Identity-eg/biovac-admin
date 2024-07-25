import { useCallback } from 'react';
import { Loader, UploadCloud } from 'lucide-react';
import { useFormContext } from 'react-hook-form';
import { useDropzone } from 'react-dropzone';
// UI
import { Input } from '@/components/ui/input';
import ImagesView from './UploadedImagesView';
// Utils
import { useUploadImage } from '@/apis/products';

export default function UploadImage() {
  const { setValue, getValues } = useFormContext();
  const uploadImage = useUploadImage();

  const onDrop = useCallback((droppedFiles: File[]) => {
    // console.log("droppedFiles", droppedFiles);
    const imageFile = droppedFiles[0];
    const formData = new FormData();
    formData.append('image', imageFile);
    uploadImage.mutate(
      { formData },
      {
        onSuccess: ({ image }) => {
          setValue(
            'image',
            [{ name: imageFile.name, size: imageFile.size, url: image }],
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
    multiple: false,
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
            <Loader size={30} className='animate-spin' />
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
      <ImagesView images={[...getValues('image')]} />
    </>
  );
}
