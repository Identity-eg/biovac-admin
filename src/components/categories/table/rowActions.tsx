import { Row } from '@tanstack/react-table';
import { Ellipsis, SquarePen, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { TCategory } from '@/global';
import { toast } from '@/components/ui/use-toast';
import CategoryAlert from '@/lib/alerts/CategoryAlert';
import { useState } from 'react';
('@/lib/deleteModal');

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions({
  row,
}: DataTableRowActionsProps<TCategory>) {
  const category = row.original;
  
  const [isCategoryAlertOpened, setCategoryAlert] = useState(false);

  function handleDelete() {
    if (category.productsCount > 0) {
      toast({
        variant: 'destructive',
        title: 'Warning',
        description: `There are ${category.productsCount} products related to this category, if you want to delete this category, you have to Edit these products`,
      });
    } else {
      setCategoryAlert(true);
    }
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
          <DropdownMenuItem asChild>
            <Link to={`edit/${category._id}`}>
              <SquarePen size={20} className='text-slate-500 mr-2' />
              <span className='capitalize'>edit</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className='text-destructive focus:bg-destructive/5 focus:text-destructive'
            onClick={handleDelete}
          >
            <Trash2 size={20} className='mr-2' />
            <span className='capitalize'>delete</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <CategoryAlert
        id={category._id}
        isCategoryAlertOpened={isCategoryAlertOpened}
        setCategoryAlert={setCategoryAlert}
      />
    </>
  );
}
