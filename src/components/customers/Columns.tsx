import { ColumnDef } from '@tanstack/react-table';
import { BadgeCheck, Ban } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
// UI
import { Badge } from '@/components/ui/badge';
import { DataTableColumnHeader } from './table/columnHeader';
import { DataTableRowActions } from './table/rowActions';
// Utils
import { TUser } from '@/types/user';

export const columns: ColumnDef<TUser>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='name' />
    ),
    cell: ({ row }) => {
      const customer = row.original;
      return (
        <>
          <div className='text-sm font-medium text-gray-900 line-clamp-1'>
            {customer.firstName}
          </div>
          <span className='text-xs text-gray-600'>{customer._id}</span>
        </>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'email',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='email' />
    ),
    cell: ({ row }) => <Badge variant='outline'>{row.original.email}</Badge>,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    enableSorting: false,
  },
  {
    accessorKey: 'ordersCount',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='orders count' />
    ),
    cell: ({ row }) => (
      <span className='px-2 font-semibold leading-5 text-green-800 bg-purple-100 rounded-full'>
        {row.original.ordersCount}
      </span>
    ),
  },
  {
    accessorKey: 'blocked',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='blocked' />
    ),
    cell: ({ row }) => {
      const blocked = row.original.blocked;
      return (
        <div className='flex items-center justify-center'>
          {blocked ? <Ban color='red' /> : <BadgeCheck color='green' />}
        </div>
      );
    },
    enableSorting: false,
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='subscription date' />
    ),
    cell: ({ row }) => {
      const formattedDate = formatDistanceToNow(row.original.createdAt);
      return (
        <span className='font-semibold text-gray-600'>{formattedDate}</span>
      );
    },
    enableSorting: false,
  },

  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
