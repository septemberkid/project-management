'use client';
import { useEffect } from 'react';
import { useBreadcrumb } from '@/contexts/breadcrumb-context';

const TaskPage = () => {
  const { setBreadcrumbs } = useBreadcrumb();
  useEffect(() => {
    setBreadcrumbs([
      {
        title: 'Home',
        url: '/',
      },
      {
        title: 'My Tasks',
      },
    ]);
  }, [setBreadcrumbs]);

  return (
    <div className='min-h-[100vh] flex-1 md:min-h-min'>
      <h1>My Tasks</h1>
    </div>
  );
};
export default TaskPage;
