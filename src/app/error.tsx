'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { TriangleAlert } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}
const ErrorPage = ({ error }: ErrorPageProps) => {
  return (
    <div className='flex min-h-screen items-center justify-center'>
      <div className={'flex w-full flex-col lg:max-w-xl'}>
        <Alert>
          <TriangleAlert className='h-4 w-4' />
          <AlertTitle>Ops! Something went wrong!</AlertTitle>
          <AlertDescription>{error.message}</AlertDescription>
        </Alert>
        <Button variant={'link'} asChild>
          <Link href={'/'}>Back to Home</Link>
        </Button>
      </div>
    </div>
  );
};
export default ErrorPage;
