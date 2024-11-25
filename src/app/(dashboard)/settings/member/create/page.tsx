'use client';
import { toast } from 'sonner';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useBreadcrumb } from '@/contexts/breadcrumb-context';
import { MemberSchema } from '@/features/members/schema';
import { useCreateMember } from '@/features/members/apis/use-create-member';
import MemberForm from '@/features/members/components/member-form';

const CreateMemberPage = () => {
  const router = useRouter();
  const { setBreadcrumbs } = useBreadcrumb();
  useEffect(() => {
    setBreadcrumbs([
      {
        title: 'Home',
        url: '/',
      },
      {
        title: 'Members',
        url: '/settings/member',
      },
      {
        title: 'Create Member',
      },
    ]);
  }, [setBreadcrumbs]);

  const { isPending, mutate } = useCreateMember();
  const initialValues: MemberSchema = {
    name: '',
    email: '',
    base_role: '',
  };
  const onSubmit = (values: MemberSchema) => {
    mutate(values, {
      onError: err => {
        toast.error(err.message);
      },
      onSuccess: data => {
        toast.success(data.message);
        router.push('/settings/member');
      },
    });
  };

  return (
    <div className='flex flex-col items-center'>
      <div className={'w-full lg:max-w-xl'}>
        <MemberForm
          initialValues={initialValues}
          action={'create'}
          isLoading={isPending}
          onSubmit={onSubmit}
        />
      </div>
    </div>
  );
};
export default CreateMemberPage;
