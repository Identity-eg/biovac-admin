import { Loader } from 'lucide-react';
// UI
import { columns } from './Columns';
import { DataTable } from './table';
import LoaderComponent from '../ui/loader';
// Utils
import { useGetOrders } from '@/apis/orders';
import useGetSearchParams from '@/hooks/useGetSearchParams';

export default function OrdersPage() {
  const params = useGetSearchParams();

  const ordersQuery = useGetOrders(params);

  if (ordersQuery.isLoading) return <LoaderComponent />;
  if (ordersQuery.isError) return <div>error</div>;

  const orders = ordersQuery.data?.pages.flatMap((page) => page.orders) ?? [];

  return (
    <>
      <div className='h-full flex-1 flex-col space-y-8 md:flex'>
        <h2 className='capitalize font-bold tracking-tight'>order list</h2>

        <DataTable
          data={orders}
          columns={columns}
          isPlaceholderData={ordersQuery.isPlaceholderData}
          fetchNextPage={ordersQuery.fetchNextPage}
          hasNextPage={ordersQuery.hasNextPage}
        />
        {ordersQuery.hasNextPage && ordersQuery.isFetchingNextPage && (
          <div className='flex justify-center items-center'>
            {<Loader className='animate-spin' size={30} />}
          </div>
        )}
      </div>
    </>
  );
}
