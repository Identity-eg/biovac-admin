import { useEffect, useState } from 'react';
import { useGlobalStore } from '@/store/global';
import { X, AlignLeft, CircleUser, LayoutDashboard } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Button } from '../ui/button';
import { useLogout } from '@/apis/auth';
// import LogoIcon from '@/assets/svgs/LogoIcon';

export default function Header() {
  const [fixedNav, setFixedNav] = useState(false);
  const openSidebar = useGlobalStore((state) => state.openSidebar);
  const toggleSidebar = useGlobalStore((state) => state.toggleSidebar);
  const toggleSidebarMobile = useGlobalStore(
    (state) => state.toggleSidebarMobile
  );

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
        <span className='capitalize'>logo</span>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='secondary' size='icon' className='rounded-full'>
            <CircleUser className='h-5 w-5' />
            <span className='sr-only'>Toggle user menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Settings</DropdownMenuItem>
          <DropdownMenuItem>Support</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => logoutMutation.mutate()}>
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
  );
}
