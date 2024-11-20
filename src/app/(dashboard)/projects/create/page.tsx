'use client';
import { useEffect } from 'react';
import { useBreadcrumb } from '@/contexts/breadcrumb-context';
import CreateProjectForm from '@/features/projects/components/create-project-form';

const CreateProjectPage = () => {
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

  return (
    <div className='w-full lg:max-w-xl'>
      <CreateProjectForm />
    </div>
  );
};
export default CreateProjectPage;
