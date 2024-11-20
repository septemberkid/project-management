'use client';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { signInSchema, SignInSchema } from '@/features/auth/schema';
import { useSignIn } from '@/features/auth/apis/use-sign-in';

const SignInForm = () => {
  const router = useRouter();
  const { isPending, mutate } = useSignIn();
  const form = useForm<SignInSchema>({
    defaultValues: {
      email: 'jane@mail.com',
      password: 'w2e3r4t5',
    },
    resolver: zodResolver(signInSchema),
  });
  const onSubmit = form.handleSubmit(values => {
    mutate(values, {
      onError: err => {
        toast.error(err.message);
      },
      onSuccess: data => {
        form.reset();
        toast.success(data.message);
        router.push('/');
      },
    });
  });

  return (
    <Form {...form}>
      <form className={'space-y-4'} onSubmit={onSubmit}>
        <FormField
          name={'email'}
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <Input
                type={'email'}
                placeholder={'Enter your email'}
                disabled={isPending}
                autoComplete={'off'}
                {...field}
              />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name={'password'}
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <Input
                type={'password'}
                placeholder={'Enter your password'}
                disabled={isPending}
                autoComplete={'off'}
                {...field}
              />
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isPending} size={'lg'} className={'w-full'}>
          Sign In
        </Button>
      </form>
    </Form>
  );
};
export default SignInForm;
