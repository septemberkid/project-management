import Link from 'next/link';
import DottedSeparator from '@/components/dotted-separator';
import SignUpForm from '@/features/auth/components/sign-up-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const SignUpPage = async () => {
  return (
    <Card className={'h-full w-full border-none shadow-none md:w-[487px]'}>
      <CardHeader className='flex items-center justify-center p-7 text-center'>
        <CardTitle className='text-2xl'>Sign Up!</CardTitle>
      </CardHeader>
      <DottedSeparator className='px-7' />
      <CardContent className={'p-7'}>
        <SignUpForm />
      </CardContent>
      <DottedSeparator className='px-7' />
      <CardContent className={'flex items-center justify-center p-7'}>
        <p>
          Already have an account?
          <Link href='/sign-in'>
            <span className='text-blue-600'>&nbsp;Sign In</span>
          </Link>
        </p>
      </CardContent>
    </Card>
  );
};
export default SignUpPage;
