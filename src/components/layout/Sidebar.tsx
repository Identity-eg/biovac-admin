import { Link, NavLink, useLocation } from 'react-router-dom';
import { LayoutDashboard, X } from 'lucide-react';

import { navLinks } from '@/constants/navLinks';
import { useGlobalStore } from '@/store/global';
import { cn } from '@/lib/utils';
import { useAuthStore } from '@/store/auth';

export default function Sidebar() {
  const { pathname } = useLocation();
  const openSidebar = useGlobalStore((state) => state.openSidebar);
  const openSidebarMobile = useGlobalStore((state) => state.openSidebarMobile);
  const toggleSidebarMobile = useGlobalStore(
    (state) => state.toggleSidebarMobile
  );

  const user = useAuthStore((state) => state.userData);

  return (
    <aside
      className={cn(
        'fixed z-30 top-0 bottom-0 left-0 overflow-hidden transition-all duration-500 bg-primary border-l-8 border-primary flex sm:-translate-x-0',
        openSidebar ? 'sm:w-64' : 'sm:w-20',
        openSidebarMobile ? '-translate-x-0 w-full' : '-translate-x-full w-0'
      )}
    >
      <ul className='absolute top-0 left-0 w-full'>
        <li className='flex items-center justify-between mb-12 text-white h-20'>
          <Link to='/' className='relative flex cursor-pointer'>
            <span className='relative flex items-center justify-center h-16 min-w-16'>
              <LayoutDashboard color='white' fontSize={30} />
            </span>
            <span className='relative flex px-2.5 h-16 items-center whitespace-nowrap text-3xl font-bold capitalize'>
              biovac
            </span>
          </Link>
          <div
            className='mr-4 text-white cursor-pointer sm:hidden'
            onClick={toggleSidebarMobile}
          >
            <X fontSize={30} />
          </div>
        </li>
        {navLinks
          .filter((li) => (user?.role ? li.roles.includes(user?.role) : false))
          .map((li, i) => (
            <li
              key={i}
              className={cn(
                'group relative w-full hover:bg-gray-50 rounded-tl-3xl rounded-bl-3xl text-white link',
                pathname.split('/')[1] === li.path && 'selected bg-gray-50'
              )}
              onClick={toggleSidebarMobile} // need to set a condition doing that only in mobilescreen
            >
              <NavLink
                to={li.path}
                className={({ isActive }) =>
                  `relative flex w-full group-hover:text-primary ${
                    isActive && 'text-primary'
                  }`
                }
              >
                <span className='relative flex items-center justify-center h-14 min-w-[64px]'>
                  <li.icon fontSize={30} />
                </span>
                <span className='relative flex px-2.5 h-14 items-center whitespace-nowrap text-lg capitalize'>
                  {li.label}
                </span>
              </NavLink>
            </li>
          ))}
      </ul>
    </aside>
  );
}
