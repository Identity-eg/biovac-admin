import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';

import { columns } from './Columns';
import { DataTable } from './table';
import LoaderComponent from '../ui/loader';
import { Button } from '../ui/button';

import { useGetCompanies } from '@/apis/companies';

export default function CompaniesPage() {
  const companiesQuery = useGetCompanies();
  if (companiesQuery.isPending) return <LoaderComponent />;
  if (companiesQuery.isError) return <div>error</div>;

  return (
    <>
      <div className='h-full flex-1 flex-col space-y-8 md:flex'>
        <div className='flex justify-between items-center'>
          <h2 className='capitalize font-bold tracking-tight'>company list</h2>
          <Button asChild>
            <Link to='/companies/create' className='space-x-2'>
              <Plus strokeWidth={3} />
              <span className='capitalize'>create company</span>
            </Link>
          </Button>
        </div>

        <DataTable data={companiesQuery.data.companies} columns={columns} />
      </div>
    </>
  );
}
