import { Link } from 'react-router-dom';
import { UseFormGetValues, UseFormSetValue } from 'react-hook-form';
import { z } from 'zod';
import { Eye, Trash2 } from 'lucide-react';
// UI
import { Card, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
// Utils
import { formatBytes } from '@/lib/utils';
import { variantsSchema } from './Schema';
import { TProductVariant } from '@/types/product';

export default function ImagesView({
  images,
  setValue,
  getValues,
}: {
  images: TProductVariant['images'];
  getValues: UseFormGetValues<z.infer<typeof variantsSchema>>;
  setValue: UseFormSetValue<z.infer<typeof variantsSchema>>;
}) {
  // console.log("images", images);
  const handleDelete = (url: string) => {
    setValue(
      'images',
      [...getValues('images').filter((img) => img.url !== url)],
      { shouldDirty: true }
    );
  };

  return images.map((image) => (
    <Card className='flex justify-between items-center' key={image.url}>
      <CardHeader className='flex flex-row gap-x-4 p-2 pt-0 md:p-4'>
        <img
          src={image.url}
          alt={image.url}
          className='w-14 h-14 rounded-full'
        />
        <div>
          <CardTitle className='text-base line-clamp-1'>{image.name}</CardTitle>
          <CardDescription className='font-semibold'>
            {formatBytes(image.size)}
          </CardDescription>
        </div>
      </CardHeader>
      <div className='flex items-center gap-x-1 pr-4'>
        <Button type='button' variant='ghost' size='icon'>
          <Link to={image.url} target='_blank'>
            <Eye size={18} color='gray' />
          </Link>
        </Button>
        <Button
          type='button'
          className='text-destructive hover:text-destructive hover:bg-destructive/5'
          variant='ghost'
          size='icon'
          onClick={() => handleDelete(image.url)}
        >
          <Trash2 size={18} />
        </Button>
      </div>
    </Card>
  ));
}
