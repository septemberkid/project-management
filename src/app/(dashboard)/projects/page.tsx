'use client';
import { useEffect } from 'react';
import { useBreadcrumb } from '@/contexts/breadcrumb-context';

const ProjectPage = () => {
  const { setBreadcrumbs } = useBreadcrumb();
  useEffect(() => {
    setBreadcrumbs([
      {
        title: 'Home',
        url: '/',
      },
      {
        title: 'Project List',
      },
    ]);
  }, [setBreadcrumbs]);

  return (
    <div className='min-h-[100vh] flex-1 md:min-h-min'>
      <h1>Project</h1>
    </div>
  );
};
export default ProjectPage;
