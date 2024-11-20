'use client';
import { useEffect } from 'react';
import { useBreadcrumb } from '@/contexts/breadcrumb-context';

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

  return (
    <div className='min-h-[100vh] flex-1 md:min-h-min'>
      <h1>Member</h1>
    </div>
  );
};
export default MemberSettingsPage;
