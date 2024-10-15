import {
  LockKeyholeIcon,
  MailCheckIcon,
  PencilIcon,
  SmartphoneIcon,
  UserIcon,
} from 'lucide-react';

import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Separator } from '../ui/separator';
import { TScreen } from '.';

type TDetailsScreenProps = {
  fullName: string;
  email: string;
  mobileNumber?: string;
  setScreen: React.Dispatch<
    React.SetStateAction<TScreen>
  >;
};

export default function DetaisScreen({
  fullName,
  email,
  mobileNumber,
  setScreen,
}: TDetailsScreenProps) {
  return (
    <Card className='p-4 space-y-6'>
      <article className='flex items-center gap-x-4'>
        <UserIcon size={26} color='gray' />
        <div>
          <h5 className='text-base font-bold'>Full name</h5>
          <p className='text-sm'>{fullName}</p>
        </div>
        <Button
          size='icon'
          variant='ghost'
          className='flex items-center justify-center ms-auto'
          onClick={() => setScreen('fullName')}
        >
          <PencilIcon color='gray' />
        </Button>
      </article>
      <Separator />
      <article className='flex items-center gap-x-4'>
        <MailCheckIcon size={26} color='gray' />
        <div>
          <h5 className='text-base font-bold'>Email</h5>
          <p className='text-sm'>{email}</p>
        </div>
        <Button
          size='icon'
          variant='ghost'
          className='flex items-center justify-center ms-auto'
          onClick={() => setScreen('email')}
        >
          <PencilIcon color='gray' />
        </Button>
      </article>
      <Separator />
      <article className='flex items-center gap-x-4'>
        <SmartphoneIcon size={26} color='gray' />
        <div>
          <h5 className='text-base font-bold'>Mobile number</h5>
          <p className='text-sm'>{mobileNumber ?? '_ _ _'}</p>
        </div>
        <Button
          size='icon'
          variant='ghost'
          className='flex items-center justify-center ms-auto'
          onClick={() => setScreen('mobileNumber')}
        >
          <PencilIcon color='gray' />
        </Button>
      </article>
      <Separator />
      <article className='flex items-center gap-x-4'>
        <LockKeyholeIcon size={26} color='gray' />
        <div>
          <h5 className='text-base font-bold'>Password</h5>
          <p className='text-sm'>**********</p>
        </div>
        <Button
          size='icon'
          variant='ghost'
          className='flex items-center justify-center ms-auto'
          onClick={() => setScreen('password')}
        >
          <PencilIcon color='gray' />
        </Button>
      </article>
    </Card>
  );
}
