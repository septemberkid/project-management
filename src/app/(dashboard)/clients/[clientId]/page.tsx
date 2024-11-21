'use client';
import { toast } from 'sonner';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ClientSchema } from '@/features/clients/schema';
import { useBreadcrumb } from '@/contexts/breadcrumb-context';
import ClientForm from '@/features/clients/components/client-form';
import { useUpdateClient } from '@/features/clients/apis/use-update-client';
import { useRetrieveClient } from '@/features/clients/apis/use-retrieve-client';

interface SingleClientPage {
  params: Promise<{
    clientId: string;
  }>;
  searchParams: Promise<{
    action: string;
  }>;
}
const SingleClientPage = ({ params, searchParams }: SingleClientPage) => {
  const { clientId } = React.use(params);
  const { action } = React.use(searchParams);
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
        title: 'Client',
      },
    ]);
  }, [setBreadcrumbs]);
  const router = useRouter();
  const { data, error } = useRetrieveClient(clientId);
  const { isPending, mutate } = useUpdateClient(clientId);
  if (error) {
    throw error;
  }
  if (!data) {
    return null;
  }
  const initialValues: ClientSchema = {
    name: data.name,
    address: data.address ?? '',
    email: data.email ?? '',
    website: data.website ?? '',
    phone: data.phone_number ?? '',
    fax: data.fax_number ?? '',
  };
  const onSubmit = (values: ClientSchema) => {
    mutate(values, {
      onError: err => {
        toast.error(err.message);
      },
      onSuccess: data => {
        toast.success(data.message);
        router.push('/clients');
      },
    });
  };

  return (
    <div className='flex flex-col items-center'>
      <div className={'w-full lg:max-w-xl'}>
        <ClientForm
          initialValues={initialValues}
          isLoading={isPending}
          action={action || 'view'}
          onSubmit={onSubmit}
        />
      </div>
    </div>
  );
};
export default SingleClientPage;
