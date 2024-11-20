import Link from 'next/link';
import DottedSeparator from '@/components/dotted-separator';
import SignInForm from '@/features/auth/components/sign-in-form';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const SignInPage = async () => {
  return (
    <Card className={'h-full w-full border-none shadow-none md:w-[487px]'}>
      <CardHeader className='flex items-center justify-center p-7 text-center'>
        <CardTitle className='text-2xl'>Welcome Back!</CardTitle>
      </CardHeader>
      <DottedSeparator className='px-7' />
      <CardContent className={'p-7'}>
        <SignInForm />
      </CardContent>
      <DottedSeparator className='px-7' />
      <CardContent className={'flex items-center justify-center p-7'}>
        <p>
          Don&apos;t have an account?
          <Link href='/sign-up'>
            <span className='text-blue-600'>&nbsp;Sign Up</span>
          </Link>
        </p>
      </CardContent>
    </Card>
  );
};
export default SignInPage;
