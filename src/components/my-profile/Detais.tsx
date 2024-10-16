import { useNavigate, useOutletContext } from 'react-router-dom';
import {
  LockKeyholeIcon,
  MailCheckIcon,
  PencilIcon,
  SmartphoneIcon,
  UserIcon,
} from 'lucide-react';
// UI
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Separator } from '../ui/separator';
// Utils
import { TUser } from '@/types/user';

export default function ProfileDetaisScreen() {
  const navigate = useNavigate();
  const { fullName, email, mobileNumber } =
    useOutletContext<Pick<TUser, 'fullName' | 'email' | 'mobileNumber'>>();
  return (
    <Card className='p-4 space-y-6'>
      <article className='flex items-start gap-x-4'>
        <UserIcon size={26} color='gray' />
        <div className='space-y-2'>
          <h5 className='text-base font-bold'>Full name</h5>
          <p className='text-sm'>{fullName}</p>
        </div>
        <Button
          size='icon'
          variant='ghost'
          className='flex items-center justify-center ms-auto'
          onClick={() => navigate('/my-profile/edit-fullname')}
        >
          <PencilIcon color='gray' />
        </Button>
      </article>
      <Separator />
      <article className='flex items-start gap-x-4'>
        <MailCheckIcon size={26} color='gray' />
        <div className='space-y-2'>
          <h5 className='text-base font-bold'>Email</h5>
          <p className='text-sm'>{email}</p>
        </div>
        <Button
          size='icon'
          variant='ghost'
          className='flex items-center justify-center ms-auto'
          onClick={() => navigate('/my-profile/edit-email')}
        >
          <PencilIcon color='gray' />
        </Button>
      </article>
      <Separator />
      <article className='flex items-start gap-x-4'>
        <SmartphoneIcon size={26} color='gray' />
        <div className='space-y-2'>
          <h5 className='text-base font-bold'>Mobile number</h5>
          <p className='text-sm'>{mobileNumber ?? '_ _ _'}</p>
        </div>
        <Button
          size='icon'
          variant='ghost'
          className='flex items-center justify-center ms-auto'
          onClick={() => navigate('/my-profile/edit-mobilenumber')}
        >
          <PencilIcon color='gray' />
        </Button>
      </article>
      <Separator />
      <article className='flex items-start gap-x-4'>
        <LockKeyholeIcon size={26} color='gray' />
        <div className='space-y-2'>
          <h5 className='text-base font-bold'>Password</h5>
          <p className='text-sm'>**********</p>
        </div>
        <Button
          size='icon'
          variant='ghost'
          className='flex items-center justify-center ms-auto'
          onClick={() => navigate('/my-profile/edit-password')}
        >
          <PencilIcon color='gray' />
        </Button>
      </article>
    </Card>
  );
}
