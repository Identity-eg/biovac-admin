import { useNavigate } from 'react-router-dom';
import { Undo2 } from 'lucide-react';
// UI
import { Button } from '../ui/button';

export default function UserDetails() {
  const navigate = useNavigate();
  return (
    <section className='space-y-8 md:w-3/4 m-auto'>
      <div className='flex justify-between items-center'>
        <Button className='space-x-2' onClick={() => navigate(-1)}>
          <Undo2 />
          <span className='capitalize'>back to customers</span>
        </Button>
      </div>
      customer details
    </section>
  );
}
