import React from 'react';
import { Table } from '@tanstack/table-core';
import { Button } from '@/components/ui/button';
import { flexRender } from '@tanstack/react-table';
import { TableHead, TableHeader, TableRow } from '@/components/ui/table';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { ArrowDown, ArrowUp } from 'lucide-react';

export const tableHeaderRender = <T,>(table: Table<T>) => {
  return (
    <TableHeader>
      {table.getHeaderGroups().map(headerGroup => (
        <TableRow key={headerGroup.id}>
          {headerGroup.headers.map(header => {
            if (header.isPlaceholder) {
              return null;
            }
            if (header.column.getCanSort()) {
              return (
                <TableHead
                  key={header.id}
                  className={'bg-neutral-200 font-semibold text-black'}
                >
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant='ghost'
                        className={'hover:bg-transparent focus:bg-transparent'}
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {header.column.columnDef.meta?.title}
                        {header.column.getIsSorted() === 'asc' ? (
                          <ArrowUp className={'ml-2 h-4 w-4'} />
                        ) : header.column.getIsSorted() === 'desc' ? (
                          <ArrowDown className='ml-2 h-4 w-4' />
                        ) : null}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent align={'center'} side={'bottom'}>
                      {header.column.getNextSortingOrder() === 'asc'
                        ? 'Sort Ascending'
                        : header.column.getNextSortingOrder() === 'desc'
                          ? 'Sort Descending'
                          : 'Clear'}
                    </TooltipContent>
                  </Tooltip>
                </TableHead>
              );
            }
            return (
              <TableHead
                key={header.id}
                className={'bg-neutral-200 font-semibold text-black'}
              >
                {flexRender(
                  header.column.columnDef.header,
                  header.getContext(),
                )}
              </TableHead>
            );
          })}
        </TableRow>
      ))}
    </TableHeader>
  );
};
