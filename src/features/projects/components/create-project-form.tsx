import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { ArrowLeftIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import DottedSeparator from '@/components/dotted-separator';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  createProjectSchema,
  CreateProjectSchema,
} from '@/features/projects/schema';
import Link from 'next/link';
import DatePicker from '@/components/date-picker';
import ComboBox, { Option } from '@/components/combo-box';

const CreateProjectForm = () => {
  const router = useRouter();
  const form = useForm<CreateProjectSchema>({
    defaultValues: {
      name: '',
      start_date: undefined,
      end_date: undefined,
      client_id: undefined,
    },
    resolver: zodResolver(createProjectSchema),
  });
  const clientOptions: Option[] = [
    {
      label: 'PT Adaro',
      value: '1',
    },
    {
      label: 'PT Aneka Tambang',
      value: '2',
    },
    {
      label: 'PT Asam',
      value: '3',
    },
  ];
  const onSubmit = (values: CreateProjectSchema) => {
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
          onClick={() => router.push('/projects')}
        >
          <ArrowLeftIcon className={'mr-2 size-4'} />
          Back
        </Button>
        <CardTitle className={'text-xl font-bold'}>
          Create a new project
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
              name={'start_date'}
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Start Date</FormLabel>
                  <FormControl>
                    <DatePicker {...field} placeholder={'Pick a date'} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name={'end_date'}
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>End Date</FormLabel>
                  <FormControl>
                    <DatePicker {...field} placeholder={'Pick a date'} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name={'client_id'}
              control={form.control}
              render={({ field }) => (
                <FormItem className={'flex flex-col'}>
                  <FormLabel>Client</FormLabel>
                  <FormControl>
                    <ComboBox
                      {...field}
                      options={clientOptions}
                      placeholder={'Select a client'}
                      noOptionFoundMessage={'No client found'}
                    />
                  </FormControl>
                  <FormMessage />
                  <FormDescription>
                    Don&#39;t see client?{' '}
                    <Link
                      href={'/clients/create'}
                      className={'cursor-pointer font-semibold underline'}
                    >
                      Click here
                    </Link>
                  </FormDescription>
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
export default CreateProjectForm;
