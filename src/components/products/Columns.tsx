import { ColumnDef } from '@tanstack/react-table';
import parse from 'html-react-parser';
// UI
import { Badge } from '@/components/ui/badge';
import { DataTableColumnHeader } from './table/columnHeader';
import { DataTableRowActions } from './table/rowActions';
// Utils
import { TProduct } from '@/global';

export const columns: ColumnDef<TProduct>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='name & image' />
    ),
    cell: ({ row }) => {
      const product = row.original;
      return (
        <div className='flex items-center max-w-[50ch]'>
          <div className='flex-shrink-0 w-10 h-10'>
            <img
              className='w-10 h-10 rounded-full'
              src={product.images[0].url}
              alt={product.name}
            />
          </div>
          <div className='ml-4'>
            <div className='text-sm font-medium text-gray-900 line-clamp-1'>
              {product.name}
            </div>
            <div className='text-sm text-gray-500 line-clamp-1'>
              {parse(product.description)}
            </div>
          </div>
        </div>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'company',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='company' />
    ),
    cell: ({ row }) => {
      const company = row.original.company.name;
      return <Badge variant='outline'>{company}</Badge>;
    },
    enableSorting: false,
  },
  {
    accessorKey: 'dosageForm',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='dosage form' />
    ),
    cell: ({ row }) => {
      const dosageForm = row.original.dosageForm.name;
      return <Badge variant='outline'>{dosageForm}</Badge>;
    },
    enableSorting: false,
  },
  {
    accessorKey: 'category',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='category' />
    ),
    cell: ({ row }) => {
      const category = row.original.category.map((cat) => cat.name).join(' , ');
      return <div className='text-gray-800 font-semibold'>{category}</div>;
    },
    enableSorting: false,
  },
  {
    accessorKey: 'quantity',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='quantity' />
    ),
    cell: ({ row }) => (
      <div className='flex flex-col items-center'>
        <div className='text-gray-600 font-semibold'>
          {row.original.quantity}
        </div>
        <span className='inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full'>
          {row.original.quantity > 0 ? 'in Stock' : 'out of stock'}
        </span>
      </div>
    ),
  },
  {
    accessorKey: 'sold',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='sold' />
    ),
    cell: ({ row }) => (
      <span className='inline-flex px-2 font-semibold leading-5 text-green-800 bg-purple-100 rounded-full'>
        {row.original.sold}
      </span>
    ),
    // filterFn: (row, id, value) => {
    //   return value.includes(row.getValue(id));
    // },
  },
  {
    accessorKey: 'price',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='price' />
    ),
    cell: ({ getValue }) => {
      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'EGP',
      }).format(getValue() as number);

      return <span className='font-semibold text-gray-700'>{formatted}</span>;
    },
    // filterFn: (row, id, value) => {
    //   return value.includes(row.getValue(id));
    // },
  },
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
