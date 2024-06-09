import { useEffect } from 'react';
import { Table } from '@tanstack/react-table';
import { useSearchParams } from 'react-router-dom';
import { X } from 'lucide-react';
// UI
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DataTableViewOptions } from './viewOption';
import { DataTableFacetedFilter } from './facetedFilter';
// Utils
import { APP_COMPANIES, DOSAGE_FORMS } from '@/constants';
import { useGetCategories } from '@/apis/categories';
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
  
  const categoriesQuery = useGetCategories();

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
          placeholder='Filter products...'
          value={searchValue}
          onChange={(event) => setSearchValue(event.target.value)}
          className='h-8 w-[150px] lg:w-[250px]'
        />
        {table.getColumn('company') && (
          <DataTableFacetedFilter
            column={table.getColumn('company')}
            title='Company'
            options={APP_COMPANIES.map((company) => ({
              label: company,
              value: company,
            }))}
          />
        )}
        {table.getColumn('itemForm') && (
          <DataTableFacetedFilter
            column={table.getColumn('itemForm')}
            title='Dosage Form'
            options={DOSAGE_FORMS.map((company) => ({
              label: company,
              value: company,
            }))}
          />
        )}
        {table.getColumn('category') && (
          <DataTableFacetedFilter
            column={table.getColumn('category')}
            title='Category'
            options={
              categoriesQuery.data?.map((cat) => ({
                label: cat.name,
                value: cat._id,
              })) ?? []
            }
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
