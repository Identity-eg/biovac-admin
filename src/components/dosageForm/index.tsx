import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';

import { columns } from './Columns';
import { DataTable } from './table';
import LoaderComponent from '../ui/loader';
import { Button } from '../ui/button';

import { useGetDosageForms } from '@/apis/dosageForm';

export default function DosageFormsPage() {
  const dosageFormsQuery = useGetDosageForms();
  if (dosageFormsQuery.isPending) return <LoaderComponent />;
  if (dosageFormsQuery.isError) return <div>error</div>;

  return (
    <>
      <div className='hidden h-full flex-1 flex-col space-y-8 md:flex'>
        <div className='flex justify-between items-center'>
          <h2 className='capitalize font-bold tracking-tight'>dosage form list</h2>
          <Button asChild>
            <Link to='/dosageForms/create' className='space-x-2'>
              <Plus strokeWidth={3} />
              <span className='capitalize'>create dosage form</span>
            </Link>
          </Button>
        </div>

        <DataTable data={dosageFormsQuery.data.dosageForms} columns={columns} />
      </div>
    </>
  );
}
