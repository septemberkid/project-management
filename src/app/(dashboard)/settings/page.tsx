'use client';
import { useEffect } from 'react';
import { useBreadcrumb } from '@/contexts/breadcrumb-context';

const SettingsPage = () => {
  const { setBreadcrumbs } = useBreadcrumb();
  useEffect(() => {
    setBreadcrumbs([
      {
        title: 'Home',
        url: '/',
      },
      {
        title: 'Settings',
      },
    ]);
  }, [setBreadcrumbs]);

  return (
    <div className='min-h-[100vh] flex-1 md:min-h-min'>
      <h1>Settings</h1>
    </div>
  );
};
export default SettingsPage;
