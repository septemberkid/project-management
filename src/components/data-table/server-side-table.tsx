'use client';
import React from 'react';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import {
  ColumnDef,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  PaginationState,
} from '@tanstack/table-core';
import { flexRender, useReactTable } from '@tanstack/react-table';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDown, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import DataTablePagination from '@/components/table/data-table-pagination';
import { tableHeaderRender } from '@/components/data-table/render-utils';

export interface ServerSideTableProps<TData> {
  title: string;
  columns: ColumnDef<TData>[];
  data: TData[];
  renderHeaderBlock?: React.ReactNode;
  renderFilterBlock?: React.ReactNode;
  sorting?: SortingState;
  onSortingChange?: (newValue: SortingState) => void;
  pagination: PaginationState;
  onPaginationChange: (newValue: PaginationState) => void;
  total: number;
  totalPages: number;
}
const ServerSideTable = <T,>({
  title,
  columns,
  data,
  renderHeaderBlock,
  renderFilterBlock,
  sorting,
  onSortingChange,
  pagination,
  onPaginationChange,
  total,
  totalPages,
}: ServerSideTableProps<T>) => {
  const table = useReactTable({
    data,
    columns,
    pageCount: totalPages,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: updaterOrValue => {
      if (typeof updaterOrValue === 'function' && sorting) {
        onSortingChange?.(updaterOrValue([...sorting]));
      }
    },
    onPaginationChange: updaterOrValue => {
      if (typeof updaterOrValue === 'function' && pagination) {
        onPaginationChange?.(updaterOrValue({ ...pagination }));
      }
    },
    manualSorting: true,
    manualPagination: true,
    state: {
      pagination,
      sorting,
    },
  });
  return (
    <div className={'w-full'}>
      <div className={'flex flex-row items-center justify-between'}>
        <h1 className={'text-2xl font-semibold'}>{title}</h1>
        <div className='flex items-center gap-x-2 py-4'>
          {table.getAllColumns().filter(column => column.getCanHide()).length >
          0 ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant='outline'>
                  <Eye /> Columns <ChevronDown />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align='end'>
                {table
                  .getAllColumns()
                  .filter(column => column.getCanHide())
                  .map(column => {
                    return (
                      <DropdownMenuCheckboxItem
                        key={column.id}
                        className={'capitalize'}
                        checked={column.getIsVisible()}
                        onCheckedChange={value =>
                          column.toggleVisibility(value)
                        }
                      >
                        {column.columnDef.meta?.title ?? column.id}
                      </DropdownMenuCheckboxItem>
                    );
                  })}
              </DropdownMenuContent>
            </DropdownMenu>
          ) : null}
          {renderHeaderBlock}
        </div>
      </div>
      <div className={'my-4 flex flex-row'}>{renderFilterBlock}</div>
      <div className={'rounded-md border'}>
        <Table>
          {tableHeaderRender(table)}
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map(row => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map(cell => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className='h-24 text-center'
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination
        table={table}
        size={pagination.pageSize}
        total={total}
      />
    </div>
  );
};

export default ServerSideTable;
