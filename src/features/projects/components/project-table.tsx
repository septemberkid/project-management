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
import { ProjectWithClient } from '@/features/projects/types';
import { ColumnDef, SortingState } from '@tanstack/table-core';
import useConfirmationDialog from '@/hooks/use-confirm-dialog';
import { Eye, MoreHorizontal, Pencil, Trash } from 'lucide-react';
import { useGetProjects } from '@/features/projects/apis/use-get-projects';
import { useQueriesTable } from '@/components/data-table/use-queries-table';
import { useDeleteProject } from '@/features/projects/apis/use-delete-project';
import { ServerSideTableProps } from '@/components/data-table/server-side-table';
import ProjectFilters, {
  useProjectFilters,
} from '@/features/projects/components/project-filters';
import { format } from 'date-fns';

const ServerSideTable = dynamic<ServerSideTableProps<ProjectWithClient>>(
  () => import('@/components/data-table/server-side-table'),
  {
    ssr: false,
  },
);

const ProjectTable = () => {
  const router = useRouter();
  const columns: ColumnDef<ProjectWithClient>[] = [
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
        title: 'Start Date',
      },
      header: 'Start Date',
      accessorKey: 'start_date',
      cell: props => {
        const value = props.getValue();
        return value == null
          ? null
          : format(props.getValue() as string, 'dd MMM yyyy');
      },
      enableHiding: true,
      enableSorting: false,
    },
    {
      meta: {
        title: 'End Date',
      },
      header: 'End Date',
      accessorKey: 'end_date',
      cell: props => {
        const value = props.getValue();
        return value == null
          ? null
          : format(props.getValue() as string, 'dd MMM yyyy');
      },
      enableHiding: true,
      enableSorting: false,
    },
    {
      meta: {
        title: 'Client',
      },
      header: 'Client',
      accessorKey: 'client.name',
      enableHiding: true,
      enableSorting: false,
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        const project = row.original;
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
                  router.push(`/projects/${project.id}?action=view`)
                }
              >
                <Eye className={'size-4'} /> Detail
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() =>
                  router.push(`/projects/${project.id}?action=edit`)
                }
              >
                <Pencil className={'size-4'} /> Update
              </DropdownMenuItem>
              <DropdownMenuItem
                className={'text-destructive focus:text-destructive'}
                onClick={() => onDelete(project.id)}
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
  const [{ name, clientId }] = useProjectFilters();
  const [sort, setSort] = useState<SortingState>([]);
  const { data: result, refetch } = useGetProjects(
    { name, clientId },
    pageIndex + 1,
    pageSize,
    sort,
  );
  const { mutate } = useDeleteProject();
  const [DeleteDialog, onConfirm] = useConfirmationDialog({
    title: 'Delete Project',
    message: 'Are you sure want to delete this project?',
    variant: 'destructive',
  });
  const onFilterHandler = async () => {
    await refetch();
  };

  return (
    <div className='flex h-full w-full flex-col items-center bg-white p-4'>
      <DeleteDialog />
      <ServerSideTable
        title={'Projects'}
        columns={columns}
        data={result?.projects ?? []}
        total={result?.total ?? 0}
        totalPages={result?.total_pages ?? 0}
        renderHeaderBlock={
          <Button variant={'outline'} asChild>
            <Link href={'/projects/create'}>Create</Link>
          </Button>
        }
        renderFilterBlock={
          <ProjectFilters
            onFilter={onFilterHandler}
            onReset={onFilterHandler}
          />
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
export default ProjectTable;
