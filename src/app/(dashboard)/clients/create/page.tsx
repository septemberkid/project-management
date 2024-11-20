'use client';
import { useEffect } from 'react';
import { useBreadcrumb } from '@/contexts/breadcrumb-context';
import CreateClientForm from '@/features/clients/components/create-client-form';

const CreateClientPage = () => {
  const { setBreadcrumbs } = useBreadcrumb();
  useEffect(() => {
    setBreadcrumbs([
      {
        title: 'Home',
        url: '/',
      },
      {
        title: 'Client List',
        url: '/clients',
      },
      {
        title: 'Create Client',
      },
    ]);
  }, [setBreadcrumbs]);

  return (
    <div className='w-full lg:max-w-xl'>
      <CreateClientForm />
    </div>
  );
};
export default CreateClientPage;
