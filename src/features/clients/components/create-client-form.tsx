import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  createClientSchema,
  CreateClientSchema,
} from '@/features/clients/schema';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { ArrowLeftIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import DottedSeparator from '@/components/dotted-separator';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const CreateClientForm = () => {
  const router = useRouter();
  const form = useForm<CreateClientSchema>({
    defaultValues: {
      name: '',
      address: '',
      email: '',
      website: '',
      phone: '',
      fax: '',
    },
    resolver: zodResolver(createClientSchema),
  });
  const onSubmit = (values: CreateClientSchema) => {
    console.log(values);
  };
  return (
    <Card className={'rounded-md border-none shadow-none'}>
      <CardHeader
        className={'flex flex-row items-center gap-x-4 space-y-0 p-7'}
      >
        <Button
          size={'sm'}
          variant={'secondary'}
          onClick={() => router.push('/clients')}
        >
          <ArrowLeftIcon className={'mr-2 size-4'} />
          Back
        </Button>
        <CardTitle className={'text-xl font-bold'}>
          Create a new client
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
                  <FormLabel>Phone Number</FormLabel>
                  <Input
                    {...field}
                    type={'text'}
                    placeholder={'Phone Number'}
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
                  <FormLabel>Fax Number</FormLabel>
                  <Input
                    {...field}
                    type={'text'}
                    placeholder={'Fax Number'}
                    autoComplete={'off'}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className='flex items-center justify-end'>
              <Button
                disabled={false}
                size='lg'
                onClick={form.handleSubmit(onSubmit)}
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
export default CreateClientForm;
