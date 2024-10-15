import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Undo2Icon } from 'lucide-react';
// UI
import { Button } from '../ui/button';
import LoaderComponent from '../ui/loader';
import DetaisScreen from './Detais';
import FullNameForm from './FullName';
import EmailForm from './Email';
import MobileNumberForm from './MobileNumber';
import PasswordForm from './Password';
// Utils
import { useGetMe } from '@/apis/users';

const screenObj = {
  details: {
    component: DetaisScreen,
  },
  fullName: { component: FullNameForm },
  email: { component: EmailForm },
  mobileNumber: { component: MobileNumberForm },
  password: { component: PasswordForm },
};

export type TScreen = keyof typeof screenObj;

export default function MyProfilePage() {
  const navigate = useNavigate();
  const [screen, setScreen] = useState<TScreen>('details');
  const getMeQuery = useGetMe();

  if (getMeQuery.isPending) return <LoaderComponent />;
  if (getMeQuery.isError) return 'error';

  const ComponentToDisplay = screenObj[screen].component;
  return (
    <section className='space-y-8 md:w-3/4 3xl:w-3/5 m-auto'>
      <div className='flex justify-between items-center'>
        <Button className='space-x-2' onClick={() => navigate('/')}>
          <Undo2Icon />
          <span className='capitalize'>back to dashboard</span>
        </Button>
      </div>
      <ComponentToDisplay {...getMeQuery.data} setScreen={setScreen} />
    </section>
  );
}
