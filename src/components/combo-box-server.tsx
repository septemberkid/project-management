'use client';
import * as React from 'react';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/libs/utils';
import { HTMLAttributes, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Check, ChevronsUpDown } from 'lucide-react';
import { Option } from '@/components/combo-box';
import { CommandLoading } from 'cmdk';

interface ComboBoxServerProps {
  value?: string;
  isLoading?: boolean;
  options?: Option[];
  onChange: (value: string) => void;
  placeholder?: string;
  noOptionFoundMessage?: string;
  className?: HTMLAttributes<string>['className'];
  debounce?: number;
  disabled?: boolean;
  onChangeKeyword?: (value: string) => void;
}
const ComboBoxServer = ({
  value,
  onChange,
  isLoading,
  options = [],
  placeholder,
  noOptionFoundMessage = 'No option found.',
  debounce = 150,
  className,
  disabled,
  onChangeKeyword,
}: ComboBoxServerProps) => {
  const [open, setOpen] = React.useState(false);
  const [keyword, setKeyword] = React.useState('');

  const memoizedOnChangeKeyword = useCallback(
    (value: string) => onChangeKeyword?.(value),
    [onChangeKeyword],
  );
  React.useEffect(() => {
    const timeout = setTimeout(() => {
      memoizedOnChangeKeyword(keyword);
    }, debounce);
    return () => clearTimeout(timeout);
  }, [keyword, debounce, memoizedOnChangeKeyword]);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          disabled={disabled}
          variant={'outline'}
          role={'combobox'}
          aria-expanded={open}
          className={cn(
            'w-full justify-between',
            !value && 'text-muted-foreground',
            className,
          )}
        >
          {value ? options.find(o => o.value === value)?.label : placeholder}
          <ChevronsUpDown className='opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-fit p-0' align={'start'}>
        <Command shouldFilter={false}>
          <CommandInput
            placeholder={placeholder}
            className='h-9'
            onValueChange={setKeyword}
          />
          <CommandList>
            {!isLoading && (
              <CommandEmpty
                className={'my-4 text-center text-sm text-muted-foreground'}
              >
                {noOptionFoundMessage}
              </CommandEmpty>
            )}

            {isLoading ? (
              <CommandLoading
                className={'my-4 text-center text-sm text-muted-foreground'}
              >
                Fetching on…
              </CommandLoading>
            ) : (
              <CommandGroup>
                {options.map(option => (
                  <CommandItem
                    key={option.value}
                    value={option.label}
                    onSelect={() => {
                      setKeyword('');
                      onChange(option.value);
                      setOpen(false);
                    }}
                  >
                    {option.label}
                    <Check
                      className={cn(
                        'ml-auto',
                        value === option.value ? 'opacity-100' : 'opacity-0',
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
export default ComboBoxServer;
