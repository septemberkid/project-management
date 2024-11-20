'use client';
import { cn } from '@/libs/utils';
import { HTMLAttributes } from 'react';
import { CalendarIcon } from 'lucide-react';
import { format, isValid } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

interface DatePickerProps {
  value: Date | undefined;
  onChange: (data: Date | undefined) => void;
  className?: HTMLAttributes<string>['className'];
  placeholder?: string;
  onClear?: () => void;
}
const DatePicker = ({
  value,
  onChange,
  onClear,
  placeholder,
  className,
}: DatePickerProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild className={'h-9'}>
        <Button
          variant={'outline'}
          size={'lg'}
          className={cn(
            'w-full justify-start px-3 text-left font-normal',
            !value && 'text-muted-foreground',
            className,
          )}
        >
          <CalendarIcon className={'mr-2 size-4'} />
          {value && isValid(value) ? (
            format(value, 'dd MMM yyyy')
          ) : (
            <span>{placeholder}</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className={'w-auto p-0'}>
        <Calendar
          mode={'single'}
          selected={value}
          onSelect={value => onChange(value)}
          initialFocus
        />
        {onClear && (
          <Button
            size={'sm'}
            variant={'secondary'}
            className={'w-full rounded-none text-muted-foreground'}
            onClick={onClear}
          >
            Clear
          </Button>
        )}
      </PopoverContent>
    </Popover>
  );
};
export default DatePicker;
