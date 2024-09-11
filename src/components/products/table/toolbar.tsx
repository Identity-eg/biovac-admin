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
import { useGetCategories } from '@/apis/categories';
import useDebounce from '@/hooks/useDebounceValue';
import { useGetCompanies } from '@/apis/companies';
import { useGetDosageForms } from '@/apis/dosageForm';
import { USER_ROLES } from '@/constants';
import { useGetMe } from '@/apis/users';

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const getMeQuery = useGetMe();
  const superAdmin = getMeQuery.data?.role === USER_ROLES.superAdmin;

  const [searchParams, setSearchParams] = useSearchParams();
  const [debouncedSearch, searchValue, setSearchValue] = useDebounce<string>(
    searchParams.get('name') ?? '',
    500
  );

  const categoriesQuery = useGetCategories();
  const companiesQuery = useGetCompanies();
  const dosageFormsQuery = useGetDosageForms();

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
          placeholder='Search By Name...'
          value={searchValue}
          onChange={(event) => setSearchValue(event.target.value)}
          className='h-8 w-[150px] lg:w-[250px]'
        />
        {table.getColumn('company') && superAdmin && (
          <DataTableFacetedFilter
            column={table.getColumn('company')}
            title='Company'
            options={
              companiesQuery.data?.companies?.map((com) => ({
                label: com.name,
                value: com._id,
              })) ?? []
            }
          />
        )}
        {table.getColumn('dosageForm') && (
          <DataTableFacetedFilter
            column={table.getColumn('dosageForm')}
            title='Dosage Form'
            options={
              dosageFormsQuery.data?.dosageForms?.map((dos) => ({
                label: dos.name,
                value: dos._id,
              })) ?? []
            }
          />
        )}
        {table.getColumn('category') && (
          <DataTableFacetedFilter
            column={table.getColumn('category')}
            title='Category'
            options={
              categoriesQuery.data?.categories?.map((cat) => ({
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
