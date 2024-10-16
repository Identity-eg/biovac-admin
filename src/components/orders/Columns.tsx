import { ColumnDef } from '@tanstack/react-table';
// UI
import { Badge } from '@/components/ui/badge';
import { DataTableColumnHeader } from './table/columnHeader';
import { DataTableRowActions } from './table/rowActions';
// Utils
import { TOrder } from '@/types/order';
import { formatDistanceToNow } from 'date-fns';

export const columns: ColumnDef<TOrder>[] = [
  {
    accessorKey: 'user',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='customer' />
    ),
    cell: ({ row }) => {
      const order = row.original;
      return (
        <div className=''>
          <div className='text-sm font-medium text-gray-900 line-clamp-1'>
            {order.user.fullName}
          </div>
          <div className='text-sm text-gray-500 line-clamp-1'>
            {order.user.email}
          </div>
        </div>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'status',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='status' />
    ),
    cell: ({ row }) => <Badge variant='outline'>{row.original.status}</Badge>,
    enableSorting: false,
  },

  {
    accessorKey: 'paid',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='paid' />
    ),
    cell: ({ row }) => {
      return row.original.paid ? (
        <Badge className='capitalize bg-green-500 hover:bg-green-500'>
          paid
        </Badge>
      ) : (
        <Badge className='capitalize bg-orange-400 hover:bg-orange-400'>
          unpaid
        </Badge>
      );
    },
    enableSorting: false,
  },
  {
    accessorKey: 'total',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='total price' />
    ),
    cell: ({ row }) => {
      const actualPrice = row.original.total;
      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'EGP',
      }).format(actualPrice);

      return <span className='font-semibold text-gray-700'>{formatted}</span>;
    },
  },
  {
    accessorKey: 'paymentMethod',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='payment method' />
    ),
    cell: ({ row }) => {
      return (
        <span className='font-semibold text-gray-700'>
          {row.original.paymentMethod.name}
        </span>
      );
    },
    enableSorting: false,
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='order date' />
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
    accessorKey: 'deliveredAt',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='delivery date' />
    ),
    cell: ({ row }) => {
      // const formattedDate = formatDistanceToNow(row.original.createdAt);
      return (
        <span className='font-semibold text-gray-600'>
          {row.original.deliveredAt ?? '---'}
        </span>
      );
    },
    enableSorting: false,
  },
  {
    accessorKey: 'orderItems',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='number of items' />
    ),
    cell: ({ row }) => {
      return (
        <span className='font-semibold text-gray-600'>
          {row.original.orderItems.length}
        </span>
      );
    },
    enableSorting: false,
  },
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
