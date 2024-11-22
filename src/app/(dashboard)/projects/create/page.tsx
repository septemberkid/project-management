'use client';
import { toast } from 'sonner';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ProjectSchema } from '@/features/projects/schema';
import { useBreadcrumb } from '@/contexts/breadcrumb-context';
import { useCreateProject } from '@/features/projects/apis/use-create-project';
import ProjectForm from '@/features/projects/components/project-form';

const CreateProjectPage = () => {
  const router = useRouter();
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
        title: 'Create Project',
      },
    ]);
  }, [setBreadcrumbs]);

  const { isPending, mutate } = useCreateProject();
  const initialValues: ProjectSchema = {
    name: '',
    description: '',
    start_date: undefined,
    end_date: undefined,
    client_id: '',
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
          action={'create'}
          isLoading={isPending}
          onSubmit={onSubmit}
          initialValues={initialValues}
        />
      </div>
    </div>
  );
};
export default CreateProjectPage;
