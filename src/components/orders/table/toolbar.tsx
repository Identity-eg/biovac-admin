import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Table } from '@tanstack/react-table';
import { X } from 'lucide-react';
// UI
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DataTableViewOptions } from './viewOption';
import { DataTableFacetedFilter } from './facetedFilter';
// Utils
import { ORDER_STATUS } from '@/constants';
import useDebounce from '@/hooks/useDebounceValue';

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [debouncedSearch, searchValue, setSearchValue] = useDebounce<string>(
    searchParams.get('name') ?? '',
    500
  );

  useEffect(() => {
    if (debouncedSearch) {
      searchParams.set('name', debouncedSearch);
    } else {
      searchParams.delete('name');
    }
    setSearchParams(searchParams);
  }, [debouncedSearch]);

  useEffect(() => {
    if (!searchParams.has('name')) {
      setSearchValue('');
    }
  }, [searchParams]);

  return (
    <div className='flex items-center justify-between'>
      <div className='flex flex-1 items-center space-x-2'>
        <Input
          placeholder='Filter orders by customer name...'
          value={searchValue}
          onChange={(event) => setSearchValue(event.target.value)}
          className='h-8 w-[250px] lg:w-[250px]'
        />
        {table.getColumn('status') && (
          <DataTableFacetedFilter
            column={table.getColumn('status')}
            title='Status'
            options={ORDER_STATUS.map((status) => ({
              label: status,
              value: status,
            }))}
          />
        )}
        {searchParams.size > 0 && (
          <Button
            variant='ghost'
            onClick={() => setSearchParams({})}
            className='h-8 px-2 lg:px-3'
          >
            Reset
            <X className='ml-2 h-4 w-4' />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}
