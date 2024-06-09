import { TOrderItem } from '@/global';
import { Separator } from '../ui/separator';
import { formatPrice } from '@/lib/utils';

export default function OrderItem({
  name,
  image,
  amount,
  price,
  product,
}: TOrderItem) {
  return (
    <>
      <article className='grid grid-cols-[150px,1fr] gap-x-10'>
        <img
          src={image}
          alt={name}
          className='rounded w-32 h-24 object-cover'
        />
        <div className='flex flex-col justify-between'>
          <div className='space-y-1'>
            <h6>{name}</h6>
            <p className='text-sm line-clamp-2 text-muted-foreground md:w-4/5'>
              {product.description}
            </p>
          </div>
          <div className='flex gap-10'>
            <div className='flex items-center gap-6'>
              <h6 className='capitalize'>quanity</h6>
              <span>{amount}</span>
            </div>
            <Separator orientation='vertical' />
            <div className='flex items-center gap-6'>
              <h6 className='capitalize'>price</h6>
              <span>{formatPrice(price)}</span>
            </div>
          </div>
        </div>
      </article>
      <Separator className='my-8' />
    </>
  );
}
