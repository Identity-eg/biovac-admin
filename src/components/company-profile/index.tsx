import { Outlet, useNavigate } from 'react-router-dom';
import { Undo2Icon } from 'lucide-react';
// UI
import { Button } from '../ui/button';
import LoaderComponent from '../ui/loader';
// Utils
import { useGetMe } from '@/apis/users';

export default function CompanyProfilePage() {
  const navigate = useNavigate();
  const getMeQuery = useGetMe();

  if (getMeQuery.isPending) return <LoaderComponent />;
  if (getMeQuery.isError) return 'error';

  return (
    <section className='space-y-8 md:w-3/4 3xl:w-3/5 m-auto'>
      <div className='flex justify-between items-center'>
        <Button className='space-x-2' onClick={() => navigate('/')}>
          <Undo2Icon />
          <span className='capitalize'>back to dashboard</span>
        </Button>
      </div>
      {getMeQuery.data.company && (
        <Outlet context={{ ...getMeQuery.data.company }} />
      )}
    </section>
  );
}
