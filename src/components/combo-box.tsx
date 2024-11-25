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
import { HTMLAttributes } from 'react';
import { Button } from '@/components/ui/button';
import { Check, ChevronsUpDown } from 'lucide-react';

export interface Option {
  readonly label: string;
  readonly value: string;
}
interface ComboBoxProps {
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  options: Option[];
  noOptionFoundMessage?: string;
  disabled?: boolean;
  className?: HTMLAttributes<string>['className'];
}
const ComboBox = ({
  value,
  onChange,
  placeholder,
  options,
  noOptionFoundMessage = 'No option found.',
  className,
  disabled,
}: ComboBoxProps) => {
  const [open, setOpen] = React.useState(false);

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
        <Command>
          <CommandInput placeholder={placeholder} className='h-9' />
          <CommandList>
            <CommandEmpty>{noOptionFoundMessage}</CommandEmpty>
            <CommandGroup>
              {options.map(option => (
                <CommandItem
                  key={option.value}
                  value={option.label}
                  onSelect={() => {
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
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
export default ComboBox;
