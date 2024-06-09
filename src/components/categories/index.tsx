import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';

import { columns } from './Columns';
import { DataTable } from './table';
import LoaderComponent from '../ui/loader';
import { Button } from '../ui/button';

import { useGetCategories } from '@/apis/categories';

export default function CategoriesPage() {
  const categoriesQuery = useGetCategories();
  if (categoriesQuery.isPending) return <LoaderComponent />;
  if (categoriesQuery.isError) return <div>error</div>;

  return (
    <>
      <div className='hidden h-full flex-1 flex-col space-y-8 md:flex'>
        <div className='flex justify-between items-center'>
          <h2 className='capitalize font-bold tracking-tight'>category list</h2>
          <Button asChild>
            <Link to='/categories/create' className='space-x-2'>
              <Plus strokeWidth={3} />
              <span className='capitalize'>create category</span>
            </Link>
          </Button>
        </div>

        <DataTable data={categoriesQuery.data} columns={columns} />
      </div>
    </>
  );
}
