import React from 'react';

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <main className={'min-h-screen bg-neutral-100'}>
      <div className='mx-auto max-w-screen-2xl p-4'>
        <div className='flex flex-col items-center justify-center pt-4 md:pt-14'>
          {children}
        </div>
      </div>
    </main>
  );
};
export default AuthLayout;
