'use client';
import { Button } from '@/components/ui/button';
import {
  ChevronFirst,
  ChevronLeft,
  ChevronRight,
  ChevronLast,
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Table } from '@tanstack/table-core';

interface DataTablePaginationProps<T> {
  table: Table<T>;
  total: number;
  size: number;
}
const DataTablePagination = <T,>({
  table,
  total,
  size,
}: DataTablePaginationProps<T>) => {
  return (
    <div className={'flex items-center justify-end space-x-4 py-4'}>
      <div className='flex-1 text-sm text-muted-foreground'>
        <div className='flex-1 text-sm text-muted-foreground'>
          Showing {table.getRowModel().rows.length.toLocaleString()} of {total}{' '}
          Rows | Page {table.getState().pagination.pageIndex + 1} of{' '}
          {table.getPageCount().toLocaleString()}
        </div>
      </div>
      <div className='flex-2 text-sm text-muted-foreground'>
        <div className={'flex flex-row items-center'}>
          <span className={'mr-2 text-muted-foreground'}>
            Records per page:
          </span>
          <Select
            value={String(size)}
            defaultValue='10'
            onValueChange={value => table.setPageSize(Number(value))}
          >
            <SelectTrigger className={'w-[60px]'}>
              <SelectValue placeholder='Data' />
            </SelectTrigger>
            <SelectContent>
              {[10, 20, 30, 40, 50, 100].map(pageSize => (
                <SelectItem key={pageSize} value={String(pageSize)}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className='space-x-1'>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant='outline'
              size='icon'
              onClick={() => table.firstPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <ChevronFirst />
            </Button>
          </TooltipTrigger>
          <TooltipContent align={'center'} side={'bottom'}>
            <p>First page</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant='outline'
              size='icon'
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <ChevronLeft />
            </Button>
          </TooltipTrigger>
          <TooltipContent align={'center'} side={'bottom'}>
            <p>Previous page</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant='outline'
              className={'ml-5'}
              size='icon'
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <ChevronRight />
            </Button>
          </TooltipTrigger>
          <TooltipContent align={'center'} side={'bottom'}>
            <p>Next page</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant='outline'
              size='icon'
              onClick={() => table.lastPage()}
              disabled={!table.getCanNextPage()}
            >
              <ChevronLast />
            </Button>
          </TooltipTrigger>
          <TooltipContent align={'center'} side={'bottom'}>
            <p>Last page</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
};
export default DataTablePagination;
