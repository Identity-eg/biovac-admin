import { UseFieldArrayRemove, UseFieldArrayUpdate } from 'react-hook-form';
import { z } from 'zod';
import { Trash2Icon } from 'lucide-react';
// UI
import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
} from '@/components/ui/carousel';
import { Button } from '@/components/ui/button';
import EditVariantForm from './EditForm';
// Utils
import { cn } from '@/lib/utils';
import { productSchema, variantsSchema } from '../Schema';
import { useDeleteVariant } from '@/apis/variants';

type TVariantItem = Pick<
  z.infer<typeof variantsSchema>,
  | '_id'
  | 'name'
  | 'flavor'
  | 'price'
  | 'priceAfterDiscount'
  | 'quantity'
  | 'unitCount'
  | 'images'
> & {
  index: number;
  removeItem: UseFieldArrayRemove;
  updateItem: UseFieldArrayUpdate<z.infer<typeof productSchema>, 'variants'>;
};

export default function VariantItem({
  index,
  _id,
  name,
  price,
  priceAfterDiscount,
  flavor,
  unitCount,
  quantity,
  images,
  removeItem,
  updateItem,
}: TVariantItem) {
  const deleteVariant = useDeleteVariant();
  const handleDelete = () => {
    if (_id) {
      deleteVariant.mutate(_id, {
        onSuccess: () => {
          removeItem(index);
        },
      });
    }
  };
  const variant = {
    _id,
    name,
    price,
    priceAfterDiscount,
    flavor,
    unitCount,
    quantity,
    images,
  };
  return (
    <article className='space-y-4'>
      <Carousel className='w-full max-w-xs'>
        <CarouselContent>
          {images.map((img, index) => (
            <CarouselItem key={index}>
              <div className='aspect-h-1 aspect-w-1 w-full h-32 overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7'>
                <img
                  src={img.url}
                  alt={img.name}
                  className='h-full w-full object-cover object-center group-hover:opacity-75'
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        {/* <CarouselPrevious type='button' className='-left-8' />
        <CarouselNext type='button' className='-right-8' /> */}
        <CarouselDots className='bottom-6' />
      </Carousel>
      <div>
        <p className='flex items-center gap-x-2 flex-nowrap'>
          <span className='font-medium'>name:</span>{' '}
          <span className='line-clamp-1 text-xs'>{name}</span>
        </p>
        {flavor && (
          <p className='flex items-center gap-x-2 flex-nowrap'>
            <span className='font-medium'>flavor</span>:{' '}
            <span className='text-xs'>{flavor}</span>
          </p>
        )}
        <p className='flex items-center gap-x-2 flex-nowrap'>
          <span className='font-medium'>unit count</span>:{' '}
          <span className='text-xs'>{unitCount}</span>
        </p>
        <p className='flex items-center gap-x-2 flex-nowrap'>
          <span className='font-medium'>qty</span>:{' '}
          <span className='text-xs'>{quantity}</span>
        </p>
        <p className='flex items-center gap-x-2 flex-nowrap'>
          <span className='font-medium'>price</span>:{' '}
          <span
            className={cn('text-green-600', {
              'text-red-600 line-through text-sm': priceAfterDiscount,
            })}
          >
            {price}
          </span>
          {priceAfterDiscount && (
            <span className='text-green-600'>{priceAfterDiscount}</span>
          )}
        </p>
      </div>
      <div className='flex items-center justify-around'>
        <EditVariantForm index={index} updateItem={updateItem} {...variant} />
        <Button
          variant='secondary'
          className='bg-red-50 hover:bg-red-100'
          size='icon'
          type='button'
          onClick={handleDelete}
        >
          <Trash2Icon size={16} color='red' />
        </Button>
      </div>
    </article>
  );
}
