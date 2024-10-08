import { useState } from 'react';
import { Row } from '@tanstack/react-table';
import { Link } from 'react-router-dom';
import { CopyIcon, Ellipsis, SquarePen, Trash2 } from 'lucide-react';
// UI
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import ProductAlert from '@/lib/alerts/ProductAlert';
import { toast } from '@/components/ui/use-toast';
// Utils
import { TProduct } from '@/types/product';

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions({
  row,
}: DataTableRowActionsProps<TProduct>) {
  const product = row.original;
  const [isProductAlertOpened, setProductAlert] = useState(false);

  function copyID() {
    navigator.clipboard
      .writeText(product._id)
      .then(function () {
        toast({ title: 'Success', description: 'ID copied to clipboard!' });
      })
      .catch(function () {
        toast({
          title: 'Failed',
          description:
            'there was an error while coping, please try again later',
          variant: 'destructive',
        });
      });
  }

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
          <DropdownMenuItem onClick={copyID}>
            <CopyIcon size={20} className='text-slate-500 mr-2' />
            <span className='capitalize'>copy ID</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link to={`edit/${product._id}`}>
              <SquarePen size={20} className='text-slate-500 mr-2' />
              <span className='capitalize'>edit</span>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem
            className='text-destructive focus:bg-destructive/5 focus:text-destructive'
            onClick={() => setProductAlert(true)}
          >
            <Trash2 size={20} className='mr-2' />
            <span className='capitalize'>delete</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <ProductAlert
        id={product._id}
        isProductAlertOpened={isProductAlertOpened}
        setProductAlert={setProductAlert}
      />
    </>
  );
}
