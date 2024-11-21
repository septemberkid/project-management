import React, { useState } from 'react';
import Link from 'next/link';
import { toast } from 'sonner';
import dynamic from 'next/dynamic';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { ColumnDef, SortingState } from '@tanstack/table-core';
import { Client } from '@/features/clients/types';
import useConfirmationDialog from '@/hooks/use-confirm-dialog';
import { useGetClients } from '@/features/clients/apis/use-get-clients';
import { useDeleteClient } from '@/features/clients/apis/use-delete-client';
import { Eye, MoreHorizontal, Pencil, Trash } from 'lucide-react';
import { ServerSideTableProps } from '@/components/data-table/server-side-table';
import { useQueriesTable } from '@/components/data-table/use-queries-table';
import ClientFilters, {
  useClientFilters,
} from '@/features/clients/components/client-filters';
import { useRouter } from 'next/navigation';

const ServerSideTable = dynamic<ServerSideTableProps<Client>>(
  () => import('@/components/data-table/server-side-table'),
  {
    ssr: false,
  },
);

const ClientTable = () => {
  const router = useRouter();
  const columns: ColumnDef<Client>[] = [
    {
      id: 'rowNumber',
      header: '#',
      enableHiding: false,
      cell: ({ row, table }) => {
        const pagination = table.getState().pagination;
        const { pageIndex, pageSize } = pagination;
        return <p>{pageIndex * pageSize + row.index + 1}</p>;
      },
    },
    {
      meta: {
        title: 'Name',
      },
      header: 'Name',
      accessorKey: 'name',
      enableHiding: false,
      enableSorting: true,
      sortDescFirst: true,
      sortUndefined: false,
    },
    {
      meta: {
        title: 'Address',
      },
      header: 'Address',
      accessorKey: 'address',
      enableHiding: true,
      enableSorting: false,
    },
    {
      meta: {
        title: 'Email',
      },
      accessorKey: 'email',
      header: 'Email',
      enableHiding: true,
      enableSorting: false,
    },
    {
      meta: {
        title: 'Website',
      },
      accessorKey: 'website',
      header: 'Website',
      enableHiding: true,
      enableSorting: false,
    },
    {
      meta: {
        title: 'Phone',
      },
      accessorKey: 'phone_number',
      header: 'Phone',
      enableHiding: true,
      enableSorting: false,
    },
    {
      meta: {
        title: 'Fax',
      },
      accessorKey: 'fax_number',
      header: 'Fax',
      enableHiding: true,
      enableSorting: false,
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        const client = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='ghost' className='h-8 w-8 p-0'>
                <span className='sr-only'>Open menu</span>
                <MoreHorizontal className='h-4 w-4' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => router.push(`/clients/${client.id}?action=view`)}
              >
                <Eye className={'size-4'} /> Detail
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => router.push(`/clients/${client.id}?action=edit`)}
              >
                <Pencil className={'size-4'} /> Update
              </DropdownMenuItem>
              <DropdownMenuItem
                className={'text-destructive focus:text-destructive'}
                onClick={() => onDelete(client.id)}
              >
                <Trash className={'size-4'} /> Remove
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
      enableSorting: false,
      enableHiding: false,
    },
  ];
  const onDelete = async (id: string) => {
    const ok = await onConfirm();
    if (!ok) {
      return;
    }
    mutate(
      {
        id,
      },
      {
        onError: err => {
          toast.error(err.message);
        },
        onSuccess: data => {
          toast.success(data.message);
        },
      },
    );
  };
  const [{ pageSize, pageIndex }, setQueriesTable] = useQueriesTable();
  const [{ name, address }] = useClientFilters();
  const [sort, setSort] = useState<SortingState>([]);
  const { data: result, refetch } = useGetClients(
    { name, address },
    pageIndex + 1,
    pageSize,
    sort,
  );
  const { mutate } = useDeleteClient();
  const [DeleteDialog, onConfirm] = useConfirmationDialog({
    title: 'Delete Client',
    message: 'Are you sure want to delete this client?',
    variant: 'destructive',
  });
  const onFilterHandler = async () => {
    await refetch();
  };

  return (
    <div className='flex h-full w-full flex-col items-center bg-white p-4'>
      <DeleteDialog />
      <ServerSideTable
        title={'Clients'}
        columns={columns}
        data={result?.clients ?? []}
        total={result?.total ?? 0}
        totalPages={result?.total_pages ?? 0}
        renderHeaderBlock={
          <Button variant={'outline'} asChild>
            <Link href={'/clients/create'}>Create</Link>
          </Button>
        }
        renderFilterBlock={
          <ClientFilters onFilter={onFilterHandler} onReset={onFilterHandler} />
        }
        sorting={sort}
        onSortingChange={setSort}
        pagination={{
          pageIndex,
          pageSize,
        }}
        onPaginationChange={async newValue => {
          await setQueriesTable({
            pageIndex: newValue.pageIndex,
            pageSize: newValue.pageSize,
          });
        }}
      />
    </div>
  );
};
export default ClientTable;
