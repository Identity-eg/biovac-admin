import { Outlet } from 'react-router-dom';
import HeaderLayout from './Header';
import SidebarLayout from './Sidebar';
import { useGlobalStore } from '@/store/global';

export function AppLayout() {
  const openSidebar = useGlobalStore((state) => state.openSidebar);

  return (
    <div className=''>
      <SidebarLayout />
      <div
        className={`absolute right-0 transition-all duration-500 ${
          openSidebar ? 'left-64' : 'left-0 sm:left-20'
        }
        `}
      >
        <HeaderLayout />
        <main className='bg-gray-50 min-h-[calc(100vh-80px)] p-8'>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
