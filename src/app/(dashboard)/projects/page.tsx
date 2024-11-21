'use client';
import { useEffect } from 'react';
import { useBreadcrumb } from '@/contexts/breadcrumb-context';
import ProjectTable from '@/features/projects/components/project-table';

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

  return <ProjectTable />;
};
export default ProjectPage;
