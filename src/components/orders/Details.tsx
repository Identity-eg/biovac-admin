import { Button } from '../ui/button';
import { useNavigate, useParams } from 'react-router-dom';
import { Undo2 } from 'lucide-react';
import { useViewOrder } from '@/apis/orders';
import LoaderComponent from '../ui/loader';
import OrderItem from './OrderItem';
import { Separator } from '../ui/separator';
import { formatPrice } from '@/lib/utils';
import { formatDate } from 'date-fns';

export default function OrderDetails() {
  const params = useParams();
  const navigate = useNavigate();
  const orderQuery = useViewOrder({ id: params.orderId });

  if (orderQuery.isError) return <div>error</div>;

  return (
    <div className='space-y-10 md:w-3/4 m-auto'>
      <div className='flex justify-between items-center'>
        <Button className='space-x-2' onClick={() => navigate(-1)}>
          <Undo2 />
          <span className='capitalize'>back to orders</span>
        </Button>
      </div>
      {orderQuery.isPending ? (
        <LoaderComponent />
      ) : (
        <section className='space-y-8'>
          <div className='border border-slate-200 p-6 grid grid-cols-3'>
            <div>
              <h6 className='capitalize text-slate-500'>order date</h6>
              <p className='font-semibold'>
                {formatDate(orderQuery.data.createdAt, 'PP')}
              </p>
            </div>
            <div className='border-s ps-4 space-y-1'>
              <h6 className='capitalize text-slate-500'>delivery date</h6>
              <p className='font-semibold'>
                {orderQuery.data.deliveredAt ?? '--'}
              </p>
            </div>
            <div className='border-s ps-4 space-y-1'>
              <h6 className='capitalize text-slate-500'>order ID</h6>
              <p className='font-semibold'>{orderQuery.data._id}</p>
            </div>
          </div>
          <div className='space-y-4'>
            <h5 className='capitalize'>order items</h5>
            <div>
              {orderQuery.data.orderItems.map((order) => (
                <OrderItem key={order._id} {...order} />
              ))}
            </div>
          </div>

          <div>
            <div className='grid grid-cols-[150px,1fr] gap-x-10'>
              <div className='grid grid-cols-2 col-start-2'>
                <div className='space-y-3'>
                  <h6 className='capitalize'>shipping address</h6>
                  <div>
                    <p className='text-muted-foreground'>
                      {orderQuery.data.shippingAddress.city}
                    </p>
                    <p className='text-muted-foreground'>
                      {orderQuery.data.shippingAddress.state}
                    </p>
                    <p className='text-muted-foreground'>
                      {orderQuery.data.shippingAddress.street}
                    </p>
                  </div>
                </div>
                <div className='space-y-3'>
                  <h6 className='capitalize'>payment method</h6>
                  <div>
                    <p className='text-muted-foreground'>Mastercard</p>
                    <p className='text-muted-foreground'>Apple Pay</p>
                    <p className='text-muted-foreground'>••••Ending in1545</p>
                  </div>
                </div>
              </div>

              <Separator className='my-8 col-start-2' />
            </div>

            <div className='grid grid-cols-[150px,1fr] gap-x-10'>
              <div className='col-start-2 space-y-4'>
                <div className='flex justify-between'>
                  <h6 className='capitalize'>subtotal</h6>
                  <p className='text-muted-foreground'>
                    {formatPrice(orderQuery.data.subtotal)}
                  </p>
                </div>
                <div className='flex justify-between'>
                  <h6 className='capitalize'>discount</h6>
                  <p className='text-muted-foreground'>-EGP 150.00 (50%)</p>
                </div>
                <div className='flex justify-between'>
                  <h6 className='capitalize'>shipping</h6>
                  <p className='text-muted-foreground'>
                    {formatPrice(orderQuery.data.shippingFee)}
                  </p>
                </div>
                <div className='flex justify-between'>
                  <h6 className='capitalize'>total</h6>
                  <p className='text-green-500 font-semibold underline'>
                    {formatPrice(orderQuery.data.total)}
                  </p>
                </div>
              </div>

              <Separator className='my-8 col-start-2' />
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
