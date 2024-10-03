import { Loader } from 'lucide-react';
// UI
import { columns } from './Columns';
import { DataTable } from './table';
import LoaderComponent from '../ui/loader';
// Utils
import { useGetCompanyOrders } from '@/apis/orders';
import useGetSearchParams from '@/hooks/useGetSearchParams';

export default function CompanyOrders() {
  const params = useGetSearchParams();

  const companyOrdersQuery = useGetCompanyOrders(params);

  if (companyOrdersQuery.isLoading) return <LoaderComponent />;
  if (companyOrdersQuery.isError) return <div>error</div>;

  const orders =
    companyOrdersQuery.data?.pages.flatMap((page) => page.orders) ?? [];

  return (
    <>
      <div className='h-full flex-1 flex-col space-y-8 md:flex'>
        <h2 className='capitalize font-bold tracking-tight'>order list</h2>

        <DataTable
          data={orders}
          columns={columns}
          isPlaceholderData={companyOrdersQuery.isPlaceholderData}
          fetchNextPage={companyOrdersQuery.fetchNextPage}
          hasNextPage={companyOrdersQuery.hasNextPage}
        />
        {companyOrdersQuery.hasNextPage && companyOrdersQuery.isFetchingNextPage && (
          <div className='flex justify-center items-center'>
            {<Loader className='animate-spin' size={30} />}
          </div>
        )}
      </div>
    </>
  );
}
