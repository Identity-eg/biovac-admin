import { useSearchParams } from 'react-router-dom';
import { CheckIcon, CirclePlusIcon } from 'lucide-react';
// UI
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
// Utils
import { cn } from '@/lib/utils';

interface DataTableFacetedFilterProps {
  param: string;
  title?: string;
  options: {
    label: string;
    value: string;
    icon?: React.ComponentType<{ className?: string }>;
  }[];
}

export function DataTableFacetedFilter({
  param,
  title,
  options,
}: DataTableFacetedFilterProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedValues = searchParams.getAll(param ?? '');

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant='outline' size='sm' className='h-8 border-dashed'>
          <CirclePlusIcon className='mr-2 h-4 w-4' />
          {title}
          {selectedValues && selectedValues.length > 0 && (
            <>
              <Separator orientation='vertical' className='mx-2 h-4' />
              <Badge
                variant='secondary'
                className='rounded-sm px-1 font-normal lg:hidden'
              >
                {selectedValues.length}
              </Badge>
              <div className='hidden space-x-1 lg:flex'>
                {selectedValues.length > 2 ? (
                  <Badge
                    variant='secondary'
                    className='rounded-sm px-1 font-normal'
                  >
                    {selectedValues.length} selected
                  </Badge>
                ) : (
                  options
                    .filter((option) =>
                      searchParams.has(param ?? '', option.value)
                    )
                    .map((option) => (
                      <Badge
                        variant='secondary'
                        key={option.value}
                        className='rounded-sm px-1 font-normal'
                      >
                        {option.label}
                      </Badge>
                    ))
                )}
              </div>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-[200px] p-0' align='start'>
        <Command
          filter={(value, search) => {
            const name = options.find(
              (o) => o.value.toString() === value.toString()
            )?.label;
            if (
              name &&
              name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
            )
              return 1;
            return 0;
          }}
        >
          <CommandInput placeholder={title} />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => {
                const isSelected = searchParams.has(
                  param ?? '',
                  option.value
                );
                return (
                  <CommandItem
                    key={option.value}
                    value={option.value}
                    onSelect={() => {
                      if (isSelected) {
                        searchParams.delete(param ?? '', option.value);
                      } else {
                        searchParams.append(param ?? '', option.value);
                      }
                      setSearchParams(searchParams);
                    }}
                  >
                    <div
                      className={cn(
                        'mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary',
                        isSelected
                          ? 'bg-primary text-primary-foreground'
                          : 'opacity-50 [&_svg]:invisible'
                      )}
                    >
                      <CheckIcon className={cn('h-4 w-4')} />
                    </div>
                    {option.icon && (
                      <option.icon className='mr-2 h-4 w-4 text-muted-foreground' />
                    )}
                    <span>{option.label}</span>
                  </CommandItem>
                );
              })}
            </CommandGroup>
            {selectedValues && selectedValues.length > 0 && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem
                    onSelect={() => {
                      searchParams.delete(param ?? '');
                      setSearchParams(searchParams);
                    }}
                    className='justify-center text-center'
                  >
                    Clear filters
                  </CommandItem>
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
