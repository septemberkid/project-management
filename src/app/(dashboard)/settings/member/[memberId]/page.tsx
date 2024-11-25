'use client';
import { toast } from 'sonner';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useBreadcrumb } from '@/contexts/breadcrumb-context';
import { MemberSchema } from '@/features/members/schema';
import MemberForm from '@/features/members/components/member-form';
import { useUpdateMember } from '@/features/members/apis/use-update-member';
import { useRetrieveMember } from '@/features/members/apis/use-retrieve-member';

interface SingleMemberPageProps {
  params: Promise<{
    memberId: string;
  }>;
  searchParams: Promise<{
    action: string;
  }>;
}
const SingleMemberPage = ({ params, searchParams }: SingleMemberPageProps) => {
  const { memberId } = React.use(params);
  const { action } = React.use(searchParams);
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
        title: 'Member',
      },
    ]);
  }, [setBreadcrumbs]);
  const router = useRouter();
  const { data, error } = useRetrieveMember(memberId);
  const { isPending, mutate } = useUpdateMember(memberId);
  if (error) {
    throw error;
  }
  if (!data) {
    return null;
  }
  const initialValues: MemberSchema = {
    name: data.name,
    email: data.email,
    base_role: data.base_role,
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
          action={action}
          isLoading={isPending}
          onSubmit={onSubmit}
        />
      </div>
    </div>
  );
};

export default SingleMemberPage;
