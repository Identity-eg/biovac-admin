import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useOutletContext } from 'react-router-dom';
import { Loader, PencilIcon } from 'lucide-react';
// UI
import { Button } from '../ui/button';
import { Input } from '../ui/input';
// Utils
import { useUpdateCompany } from '@/apis/companies';
import { useUploadSingleImage } from '@/apis/upload';
import { TCompany } from '@/types/company';

export default function CompanyUploads({ type }: { type: 'logo' | 'cover' }) {
  const { _id } = useOutletContext<Pick<TCompany, '_id'>>();

  const uploadImage = useUploadSingleImage();
  const updateCompanyMutation = useUpdateCompany();

  const onDrop = useCallback((droppedFiles: File[]) => {
    // console.log("droppedFiles", droppedFiles);
    const imageFile = droppedFiles[0];
    const formData = new FormData();

    formData.append('image', imageFile);

    uploadImage.mutate(
      { formData },
      {
        onSuccess: ({ image }) => {
          console.log("onsuce",{ type });
          updateCompanyMutation.mutate({ id: _id, data: { [type]: image } });
        },
      }
    );
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    onDrop,
    accept: {
      'image/*': [],
    },
  });

  return (
    <div {...getRootProps()} className='ms-auto'>
      <Input type='file' {...getInputProps({ name: 'base64' })} />
      <Button
        size='icon'
        variant='ghost'
        className='flex items-center justify-center'
      >
        {uploadImage.isPending || updateCompanyMutation.isPending ? (
          <Loader size={30} className='animate-spin' />
        ) : (
          <PencilIcon color='gray' />
        )}
      </Button>
    </div>
  );
}
