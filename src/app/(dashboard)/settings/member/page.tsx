'use client';
import { useEffect } from 'react';
import { useBreadcrumb } from '@/contexts/breadcrumb-context';
import MemberTable from '@/features/members/components/member-table';

const MemberSettingsPage = () => {
  const { setBreadcrumbs } = useBreadcrumb();
  useEffect(() => {
    setBreadcrumbs([
      {
        title: 'Home',
        url: '/',
      },
      {
        title: 'Settings',
        url: '/settings',
      },
      {
        title: 'Member',
      },
    ]);
  }, [setBreadcrumbs]);

  return <MemberTable />;
};
export default MemberSettingsPage;
