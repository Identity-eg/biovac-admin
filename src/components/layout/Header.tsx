import { useEffect, useState } from 'react';
import { useGlobalStore } from '@/store/global';
import {
  X,
  AlignLeft,
  CircleUser,
  LayoutDashboard,
  LogOutIcon,
  UserRoundPlusIcon,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Button } from '../ui/button';
import { useLogout } from '@/apis/auth';
import { USER_ROLES } from '@/constants';
import { useGetMe } from '@/apis/users';
// import LogoIcon from '@/assets/svgs/LogoIcon';

export default function Header() {
  const [fixedNav, setFixedNav] = useState(false);
  const openSidebar = useGlobalStore((state) => state.openSidebar);
  const toggleSidebar = useGlobalStore((state) => state.toggleSidebar);
  const toggleSidebarMobile = useGlobalStore(
    (state) => state.toggleSidebarMobile
  );

  const getMeQuery = useGetMe();

  const handlefixedNav = () =>
    window.scrollY === 0 ? setFixedNav(false) : setFixedNav(true);

  useEffect(() => {
    window.addEventListener('scroll', () => handlefixedNav);
    return () => window.removeEventListener('scroll', handlefixedNav);
  }, []);

  const logoutMutation = useLogout();

  return (
    <nav
      className={`sticky top-0 left-0 right-0 z-50 h-20 flex items-center justify-between px-8 py-3 transition-shadow duration-200 backdrop-filter backdrop-blur border-b ${
        fixedNav ? 'shadow-nav' : 'shadow-card'
      }`}
      style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)' }}
    >
      <div
        className='flex items-center cursor-pointer text-primary sm:hidden'
        onClick={toggleSidebarMobile}
      >
        <AlignLeft size={30} className='text-primary' />
      </div>
      <div
        className='hidden md:inline-flex cursor-pointer text-primary'
        onClick={toggleSidebar}
      >
        {!openSidebar ? <AlignLeft size={25} /> : <X size={25} />}
      </div>
      {/* <LogoIcon className='w-60 lg:w-72 text-primary mr-auto' /> */}
      <div className='flex gap-x-4'>
        <LayoutDashboard fontSize={30} />
        <span className='capitalize'>
          {getMeQuery.data?.role === USER_ROLES.admin
            ? getMeQuery.data.company?.name
            : 'super admin'}
        </span>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='secondary' size='icon' className='rounded-full'>
            <CircleUser className='h-5 w-5' />
            <span className='sr-only'>Toggle user menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end' className='w-40'>
          <DropdownMenuItem className='flex gap-x-4'>
            <UserRoundPlusIcon size={18} />
            My profile
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className='flex gap-x-4'
            onClick={() => logoutMutation.mutate()}
          >
            <LogOutIcon size={18} /> Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
  );
}
