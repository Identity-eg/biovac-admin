import { Row } from '@tanstack/react-table';
import { Link } from 'react-router-dom';
import { Ellipsis, SquarePen } from 'lucide-react';
// UI
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  // DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
// Utils
import { TOrder } from '@/types/order';

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions({ row }: DataTableRowActionsProps<TOrder>) {
  const order = row.original;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' className='h-8 w-8 p-0'>
          <span className='sr-only'>Open menu</span>
          <Ellipsis className='h-4 w-4' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuItem asChild>
          <Link to={`details/${order._id}`}>
            <SquarePen size={20} className='text-slate-500 mr-2' />
            <span className='capitalize'>details</span>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
