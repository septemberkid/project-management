'use client';
import { useEffect } from 'react';
import { useBreadcrumb } from '@/contexts/breadcrumb-context';
import { useGetClients } from '@/features/clients/apis/use-get-clients';

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

  const { data: clients } = useGetClients();
  return (
    <div className='w-full'>
      <h1>Clients: {JSON.stringify(clients)}</h1>
    </div>
  );
};
export default ClientPage;
