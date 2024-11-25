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
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Member } from '@/features/members/types';
import { MoreHorizontal, Pencil, Trash, DatabaseBackup } from 'lucide-react';
import { ColumnDef, SortingState } from '@tanstack/table-core';
import useConfirmationDialog from '@/hooks/use-confirm-dialog';
import { useGetMembers } from '@/features/members/apis/use-get-members';
import { useDeleteMember } from '@/features/members/apis/use-delete-member';
import { useQueriesTable } from '@/components/data-table/use-queries-table';
import { ServerSideTableProps } from '@/components/data-table/server-side-table';
import MemberFilters, {
  useMemberFilters,
} from '@/features/members/components/member-filters';
import { Roles } from '@/enums';
import { capitalize } from '@/libs/utils';
import { useRestoreMember } from '@/features/members/apis/use-restore-member';

const ServerSideTable = dynamic<ServerSideTableProps<Member>>(
  () => import('@/components/data-table/server-side-table'),
  {
    ssr: false,
  },
);

const MemberTable = () => {
  const router = useRouter();
  const columns: ColumnDef<Member>[] = [
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
        title: 'Email',
      },
      header: 'Email',
      accessorKey: 'email',
      enableHiding: false,
      enableSorting: true,
      sortDescFirst: true,
      sortUndefined: false,
    },
    {
      meta: {
        title: 'Role',
      },
      header: 'Role',
      accessorFn: originalRow => {
        const entry = Object.entries(Roles).find(
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          ([_, v]) => v === originalRow.base_role,
        );
        return entry ? capitalize(entry[0]) : undefined;
      },
      enableHiding: false,
      enableSorting: true,
      sortDescFirst: true,
      sortUndefined: false,
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        const member = row.original;
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
                onClick={() =>
                  router.push(`/settings/member/${member.id}?action=edit`)
                }
              >
                <Pencil className={'size-4'} /> Update
              </DropdownMenuItem>
              {member.deleted_at == null ? (
                <DropdownMenuItem
                  className={'text-destructive focus:text-destructive'}
                  onClick={() => onDelete(member.id)}
                >
                  <Trash className={'size-4'} /> Remove
                </DropdownMenuItem>
              ) : (
                <DropdownMenuItem
                  className={'text-primary focus:text-primary'}
                  onClick={() => onRestore(member.id)}
                >
                  <DatabaseBackup className={'size-4'} /> Restore
                </DropdownMenuItem>
              )}
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
  const onRestore = async (id: string) => {
    const ok = await onConfirmRestore();
    if (!ok) {
      return;
    }
    mutateRestore(
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
  const [{ name, email, base_role, trashed }] = useMemberFilters();
  const [sort, setSort] = useState<SortingState>([]);
  const { data: result, refetch } = useGetMembers(
    { name, email, base_role, trashed },
    pageIndex + 1,
    pageSize,
    sort,
  );
  const { mutate } = useDeleteMember();
  const { mutate: mutateRestore } = useRestoreMember();
  const [DeleteDialog, onConfirm] = useConfirmationDialog({
    title: 'Delete Member',
    message: 'Are you sure want to delete this member?',
    variant: 'destructive',
  });
  const [RestoreDialog, onConfirmRestore] = useConfirmationDialog({
    title: 'Restore Member',
    message: 'Are you sure want to restore this member?',
  });
  const onFilterHandler = async () => {
    await refetch();
  };

  return (
    <div className='flex h-full w-full flex-col items-center bg-white p-4'>
      <DeleteDialog />
      <RestoreDialog />
      <ServerSideTable
        title={'Members'}
        columns={columns}
        data={result?.members ?? []}
        total={result?.total ?? 0}
        totalPages={result?.total_pages ?? 0}
        renderHeaderBlock={
          <Button variant={'outline'} asChild>
            <Link href={'/settings/member/create'}>Create</Link>
          </Button>
        }
        renderFilterBlock={
          <MemberFilters onFilter={onFilterHandler} onReset={onFilterHandler} />
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
export default MemberTable;
