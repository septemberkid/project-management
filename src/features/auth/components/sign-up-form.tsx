'use client';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSignUp } from '@/features/auth/apis/use-sign-up';
import { signUpSchema, SignUpSchema } from '@/features/auth/schema';

const SignUpForm = () => {
  const router = useRouter();
  const { isPending, mutate } = useSignUp();
  const form = useForm<SignUpSchema>({
    defaultValues: {
      name: 'Jane Doe',
      email: 'jane@mail.com',
      password: 'w2e3r4t5',
    },
    resolver: zodResolver(signUpSchema),
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
          name={'name'}
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <Input
                type={'name'}
                placeholder={'Enter your full name'}
                disabled={isPending}
                autoComplete={'off'}
                {...field}
              />
              <FormMessage />
            </FormItem>
          )}
        />
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
          Sign Up
        </Button>
      </form>
    </Form>
  );
};
export default SignUpForm;
