import { Loader } from 'lucide-react';
// UI
import { columns } from './Columns';
import { DataTable } from './table';
import LoaderComponent from '../ui/loader';
// Utils
import { useGetAllOrders } from '@/apis/orders';
import useGetSearchParams from '@/hooks/useGetSearchParams';

export default function AllOrders() {
  const params = useGetSearchParams();

  const allOrdersQuery = useGetAllOrders(params);

  if (allOrdersQuery.isLoading) return <LoaderComponent />;
  if (allOrdersQuery.isError) return <div>error</div>;

  const orders =
    allOrdersQuery.data?.pages.flatMap((page) => page.orders) ?? [];

  return (
    <>
      <div className='h-full flex-1 flex-col space-y-8 md:flex'>
        <h2 className='capitalize font-bold tracking-tight'>order list</h2>

        <DataTable
          data={orders}
          columns={columns}
          isPlaceholderData={allOrdersQuery.isPlaceholderData}
          fetchNextPage={allOrdersQuery.fetchNextPage}
          hasNextPage={allOrdersQuery.hasNextPage}
        />
        {allOrdersQuery.hasNextPage && allOrdersQuery.isFetchingNextPage && (
          <div className='flex justify-center items-center'>
            {<Loader className='animate-spin' size={30} />}
          </div>
        )}
      </div>
    </>
  );
}
