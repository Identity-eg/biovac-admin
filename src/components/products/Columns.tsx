import { ColumnDef } from '@tanstack/react-table';
import parse from 'html-react-parser';
// UI
import { Badge } from '@/components/ui/badge';
import { DataTableColumnHeader } from './table/columnHeader';
import { DataTableRowActions } from './table/rowActions';
// Utils
import { TProduct } from '@/types/product';

export const columns: ColumnDef<TProduct>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='name & image' />
    ),
    cell: ({ row }) => {
      const product = row.original;
      return (
        <div className='flex items-center max-w-[40ch]'>
          <div className='flex-shrink-0 w-10 h-10'>
            <img
              className='w-10 h-10 rounded-full'
              src={product.variants[0].images[0].url}
              alt={product.variants[0].name}
            />
          </div>
          <div className='ml-4'>
            <div className='text-sm font-medium text-gray-900 line-clamp-1'>
              {product.variants[0].name}
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
    cell: ({ row }) => {
      const quantity = row.original.variants.reduce(
        (total, v) => (total += v.quantity),
        0
      );
      return (
        <div className='flex flex-col items-center'>
          <div className='text-gray-600 font-semibold'>{quantity}</div>
          <span className='inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full'>
            {quantity > 0 ? 'in Stock' : 'out of stock'}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: 'sold',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='sold' />
    ),
    cell: ({ row }) => {
      const sold = row.original.variants.reduce(
        (total, v) => (total += v.sold),
        0
      );
      return (
        <span className='inline-flex px-2 font-semibold leading-5 text-green-800 bg-purple-100 rounded-full'>
          {sold}
        </span>
      );
    },
  },
  {
    accessorKey: 'price',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='price' />
    ),
    cell: ({ row }) => {
      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'EGP',
      }).format(
        (row.original.variants[0].priceAfterDiscount ||
          row.original.variants[0].price) as number
      );

      return <span className='font-semibold text-gray-700'>{formatted}</span>;
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
