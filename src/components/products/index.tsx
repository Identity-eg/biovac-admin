import { Link } from 'react-router-dom';
import { Loader, Plus } from 'lucide-react';
// UI
import { columns } from './Columns';
import { DataTable } from './table';
import LoaderComponent from '../ui/loader';
import { Button } from '../ui/button';
// Utils
import { useGetProducts } from '@/apis/products';
import useGetSearchParams from '@/hooks/useGetSearchParams';
import { useAuthStore } from '@/store/auth';

export default function ProductsPage() {
  const user = useAuthStore((state) => state.userData);

  const params = useGetSearchParams();
  const productsQuery = useGetProducts({
    ...params,
    ...(user?.company && { company: user.company._id }),
  });

  if (productsQuery.isLoading) return <LoaderComponent />;
  if (productsQuery.isError) return <div>error</div>;

  const products =
    productsQuery.data?.pages.flatMap((page) => page.products) ?? [];

  return (
    <>
      <div className='h-full flex-1 flex-col space-y-8 md:flex'>
        <div className='flex justify-between items-center'>
          <h2 className='capitalize font-bold tracking-tight'>product list</h2>
          <Button asChild>
            <Link to='/products/create' className='space-x-2'>
              <Plus strokeWidth={3} />
              <span className='capitalize'>create product</span>
            </Link>
          </Button>
        </div>
        <DataTable
          data={products}
          columns={columns}
          isPlaceholderData={productsQuery.isPlaceholderData}
          fetchNextPage={productsQuery.fetchNextPage}
          hasNextPage={productsQuery.hasNextPage}
        />
        {productsQuery.hasNextPage && productsQuery.isFetchingNextPage && (
          <div className='flex justify-center items-center'>
            {<Loader className='animate-spin' size={30} />}
          </div>
        )}
      </div>
    </>
  );
}
