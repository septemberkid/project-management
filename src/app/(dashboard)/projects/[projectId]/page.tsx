'use client';
import { toast } from 'sonner';
import React, { useEffect } from 'react';
import { parseDate } from '@/libs/utils';
import { useRouter } from 'next/navigation';
import { ProjectSchema } from '@/features/projects/schema';
import { useBreadcrumb } from '@/contexts/breadcrumb-context';
import ProjectForm from '@/features/projects/components/project-form';
import { useUpdateProject } from '@/features/projects/apis/use-update-project';
import { useRetrieveProject } from '@/features/projects/apis/use-retrieve-project';

interface SingleProjectPageProps {
  params: Promise<{
    projectId: string;
  }>;
  searchParams: Promise<{
    action: string;
  }>;
}
const SingleProjectPage = ({
  params,
  searchParams,
}: SingleProjectPageProps) => {
  const { projectId } = React.use(params);
  const { action } = React.use(searchParams);
  const { setBreadcrumbs } = useBreadcrumb();
  useEffect(() => {
    setBreadcrumbs([
      {
        title: 'Home',
        url: '/',
      },
      {
        title: 'Project List',
        url: '/projects',
      },
      {
        title: 'Project',
      },
    ]);
  }, [setBreadcrumbs]);
  const router = useRouter();
  const { data, error } = useRetrieveProject(projectId);
  const { isPending, mutate } = useUpdateProject(projectId);
  if (error) {
    throw error;
  }
  if (!data) {
    return null;
  }
  const initialValues: ProjectSchema = {
    name: data.name,
    description: data.description ?? '',
    start_date: parseDate(data.start_date),
    end_date: parseDate(data.end_date),
    client_id: data.client_id,
  };
  const onSubmit = (values: ProjectSchema) => {
    mutate(values, {
      onError: err => {
        toast.error(err.message);
      },
      onSuccess: data => {
        toast.success(data.message);
        router.push('/projects');
      },
    });
  };
  return (
    <div className='flex flex-col items-center'>
      <div className={'w-full lg:max-w-xl'}>
        <ProjectForm
          action={action}
          isLoading={isPending}
          onSubmit={onSubmit}
          initialValues={initialValues}
        />
      </div>
    </div>
  );
};

export default SingleProjectPage;
