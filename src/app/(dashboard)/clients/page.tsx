'use client';
import React, { useEffect } from 'react';
import { useBreadcrumb } from '@/contexts/breadcrumb-context';
import ClientTable from '@/features/clients/components/client-table';
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

  return <ClientTable />;
};
export default ClientPage;
