'use client';
import { useEffect } from 'react';
import { useBreadcrumb } from '@/contexts/breadcrumb-context';

const ClientPage = () => {
  const { setBreadcrumbs } = useBreadcrumb();
  useEffect(() => {
    setBreadcrumbs([
      {
        title: 'Home',
        url: '/',
      },
      {
        title: 'Client List',
      },
    ]);
  }, [setBreadcrumbs]);

  return (
    <div className='w-full'>
      <h1>Client</h1>
    </div>
  );
};
export default ClientPage;
