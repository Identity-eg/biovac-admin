import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Row } from '@tanstack/react-table';
import { Ban, Circle, Ellipsis, SquarePen } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { TUser } from '@/global';
import BlockCustomerAlert from '@/lib/alerts/BlockCustomerAlert';

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions({ row }: DataTableRowActionsProps<TUser>) {
  const user = row.original;
  const [isBlockCustomerAlertOpened, setBlockCustomerAlert] =
    useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost' className='h-8 w-8 p-0'>
            <span className='sr-only'>Open menu</span>
            <Ellipsis className='h-4 w-4' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuItem asChild>
            <Link to={`details/${user._id}`}>
              <SquarePen size={20} className='text-slate-500 mr-2' />
              <span className='capitalize'>details</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />

          <DropdownMenuItem
            className='text-destructive focus:bg-destructive/5 focus:text-destructive'
            onClick={() => setBlockCustomerAlert(true)}
          >
            {user.blocked ? (
              <Circle size={20} className='mr-2' />
            ) : (
              <Ban size={20} className='mr-2' />
            )}
            <span className='capitalize'>
              {user.blocked ? 'unblock' : 'block'}
            </span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <BlockCustomerAlert
        id={user._id}
        blocked={user.blocked}
        isBlockCustomerAlertOpened={isBlockCustomerAlertOpened}
        setBlockCustomerAlert={setBlockCustomerAlert}
      />
    </>
  );
}
