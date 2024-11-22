'use client';
import { toast } from 'sonner';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ClientSchema } from '@/features/clients/schema';
import { useBreadcrumb } from '@/contexts/breadcrumb-context';
import ClientForm from '@/features/clients/components/client-form';
import { useCreateClient } from '@/features/clients/apis/use-create-client';

const CreateClientPage = () => {
  const router = useRouter();
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
  const { isPending, mutate } = useCreateClient();
  const initialValues: ClientSchema = {
    name: '',
    address: '',
    email: '',
    website: '',
    phone: '',
    fax: '',
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
          action={'create'}
          isLoading={isPending}
          onSubmit={onSubmit}
          initialValues={initialValues}
        />
      </div>
    </div>
  );
};
export default CreateClientPage;
