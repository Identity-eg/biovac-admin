import { ColumnDef } from '@tanstack/react-table';

import { DataTableColumnHeader } from './table/columnHeader';
import { DataTableRowActions } from './table/rowActions';
import { TCategory } from '@/types/category';


export const columns: ColumnDef<TCategory>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='name' />
    ),
    cell: ({ row }) => {
      const product = row.original;
      return (
        <div className='text-sm font-medium text-gray-900 line-clamp-1'>
          {product.name}
        </div>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'productsCount',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='products count' />
    ),
    cell: ({ row }) => (
      <span className='inline-flex px-2 font-semibold leading-5 text-green-800 bg-purple-100 rounded-full'>
        {row.original.productsCount}
      </span>
    ),
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
