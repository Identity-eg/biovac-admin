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

import { TDosageForm } from '@/types/dosage-form';
import { toast } from '@/components/ui/use-toast';
import DosageFormAlert from '@/lib/alerts/DosageFormAlert';
import { useState } from 'react';
('@/lib/deleteModal');

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions({
  row,
}: DataTableRowActionsProps<TDosageForm>) {
  const dosageForm = row.original;
  
  const [isDosageFormAlertOpened, setDosageFormAlert] = useState(false);

  function handleDelete() {
    if (dosageForm.productsCount > 0) {
      toast({
        variant: 'destructive',
        title: 'Warning',
        description: `There are ${dosageForm.productsCount} products related to this dosageForm, if you want to delete this dosageForm, you have to Edit these products`,
      });
    } else {
      setDosageFormAlert(true);
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
            <Link to={`edit/${dosageForm._id}`}>
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
      <DosageFormAlert
        id={dosageForm._id}
        isDosageFormAlertOpened={isDosageFormAlertOpened}
        setDosageFormAlert={setDosageFormAlert}
      />
    </>
  );
}
