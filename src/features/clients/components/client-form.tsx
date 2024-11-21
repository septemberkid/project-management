'use client';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { cn } from '@/libs/utils';
import { useForm } from 'react-hook-form';
import { redirect } from 'next/navigation';
import { ArrowLeftIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { Textarea } from '@/components/ui/textarea';
import DottedSeparator from '@/components/dotted-separator';
import { clientSchema, ClientSchema } from '@/features/clients/schema';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ClientFormProps {
  readonly initialValues: ClientSchema;
  readonly action: 'edit' | 'create' | 'view' | string;
  readonly onSubmit?: (values: ClientSchema) => void;
  readonly isLoading?: boolean;
}
const ClientForm = ({
  initialValues,
  action,
  isLoading = false,
  onSubmit,
}: ClientFormProps) => {
  const form = useForm<ClientSchema>({
    defaultValues: {
      ...initialValues,
    },
    resolver: zodResolver(clientSchema),
  });

  return (
    <Card className={'rounded-xl shadow-none'}>
      <CardHeader
        className={'flex flex-row items-center gap-x-4 space-y-0 p-7'}
      >
        <Button
          size={'sm'}
          variant={'outline'}
          onClick={() => redirect('/clients')}
        >
          <ArrowLeftIcon className={'mr-2 size-4'} />
          Back
        </Button>
        <CardTitle className={'text-xl font-bold'}>
          {action == 'create'
            ? 'Create a new client'
            : action == 'view'
              ? 'View client'
              : 'Update client'}
        </CardTitle>
      </CardHeader>
      <DottedSeparator className={'px-7 pb-4'} />
      <CardContent className={'px-7'}>
        <Form {...form}>
          <form className={'space-y-4'}>
            <FormField
              name={'name'}
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <Input
                    {...field}
                    disabled={isLoading || action == 'view'}
                    type={'text'}
                    placeholder={'Name'}
                    autoComplete={'off'}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name={'address'}
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <Textarea
                    {...field}
                    disabled={isLoading || action == 'view'}
                    placeholder={'Address'}
                    autoComplete={'off'}
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
                    {...field}
                    disabled={isLoading || action == 'view'}
                    type={'email'}
                    placeholder={'Email'}
                    autoComplete={'off'}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name={'website'}
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Website</FormLabel>
                  <Input
                    {...field}
                    disabled={isLoading || action == 'view'}
                    type={'text'}
                    placeholder={'Website'}
                    autoComplete={'off'}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name={'phone'}
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <Input
                    {...field}
                    disabled={isLoading || action == 'view'}
                    type={'text'}
                    placeholder={'Phone'}
                    autoComplete={'off'}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name={'fax'}
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fax</FormLabel>
                  <Input
                    {...field}
                    disabled={isLoading || action == 'view'}
                    type={'text'}
                    placeholder={'Fax'}
                    autoComplete={'off'}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className='flex items-center justify-end'>
              <Button
                className={cn(action === 'view' && 'invisible')}
                disabled={isLoading}
                size='lg'
                onClick={onSubmit ? form.handleSubmit(onSubmit) : () => {}}
              >
                Save changes
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
export default ClientForm;
