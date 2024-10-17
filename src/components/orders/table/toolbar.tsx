import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Table } from '@tanstack/react-table';
import { X } from 'lucide-react';
// UI
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DataTableViewOptions } from './viewOption';
import { DataTableFacetedFilter } from './facetedFilter';
import SingleDataTableFacetedFilter from './singleDataTableFacetedFilter';
// Utils
import { ORDER_STATUS, PERIODS, USER_ROLES } from '@/constants';
import { useGetMe } from '@/apis/users';
import { useGetCompanies } from '@/apis/companies';
import useDebounce from '@/hooks/useDebounceValue';
import { PAYMENT_METHODS } from '@/constants/paymentMethods';

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const getMeQuery = useGetMe();
  const superAdmin = getMeQuery.data?.role === USER_ROLES.superAdmin.value;

  const [searchParams, setSearchParams] = useSearchParams();
  const [debouncedSearch, searchValue, setSearchValue] = useDebounce<string>(
    searchParams.get('name') ?? '',
    500
  );

  const companiesQuery = useGetCompanies();

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
          placeholder='Search by customer name...'
          value={searchValue}
          onChange={(event) => setSearchValue(event.target.value)}
          className='h-8 w-[250px] lg:w-[250px]'
        />
        {superAdmin && (
          <DataTableFacetedFilter
            param='company'
            title='Company'
            options={
              companiesQuery.data?.companies?.map((com) => ({
                label: com.name,
                value: com._id,
              })) ?? []
            }
          />
        )}
        {table.getColumn('status') && (
          <DataTableFacetedFilter
            param='status'
            title='Status'
            options={Object.values(ORDER_STATUS).map((status) => ({
              label: status.label,
              value: status.value,
            }))}
          />
        )}
        <SingleDataTableFacetedFilter
          param='paid'
          title='Paid'
          options={[
            { label: 'Paid', value: 'true' },
            { label: 'Unpaid', value: 'false' },
          ]}
        />
        <SingleDataTableFacetedFilter
          param='paymentMethod'
          title='Payment Method'
          options={Object.values(PAYMENT_METHODS)}
        />
        <SingleDataTableFacetedFilter
          param='period'
          title='Period'
          options={PERIODS}
        />
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
