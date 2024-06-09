import { Loader } from 'lucide-react';
// UI
import { columns } from './Columns';
import { DataTable } from './table';
import LoaderComponent from '../ui/loader';
// Utils
import { useGetUsers } from '@/apis/customers';
import useGetSearchParams from '@/hooks/useGetSearchParams';

export default function CustomersPage() {
  const params = useGetSearchParams();
  const usersQuery = useGetUsers(params);
  if (usersQuery.isLoading) return <LoaderComponent />;
  if (usersQuery.isError) return <div>error</div>;

  const users = usersQuery.data?.pages.flatMap((page) => page.users) ?? [];

  return (
    <div className='hidden h-full flex-1 flex-col space-y-8 md:flex'>
      <h2 className='capitalize font-bold tracking-tight'>customer list</h2>

      <DataTable
        data={users}
        columns={columns}
        isPlaceholderData={usersQuery.isPlaceholderData}
        fetchNextPage={usersQuery.fetchNextPage}
        hasNextPage={usersQuery.hasNextPage}
      />
      {usersQuery.hasNextPage && usersQuery.isFetchingNextPage && (
        <div className='flex justify-center items-center'>
          {<Loader className='animate-spin' size={30} />}
        </div>
      )}
    </div>
  );
}
