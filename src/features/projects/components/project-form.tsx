'use client';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import Link from 'next/link';
import { useState } from 'react';
import { cn } from '@/libs/utils';
import { useForm } from 'react-hook-form';
import { redirect } from 'next/navigation';
import { ArrowLeftIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import DatePicker from '@/components/date-picker';
import { Textarea } from '@/components/ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import ComboBoxServer from '@/components/combo-box-server';
import DottedSeparator from '@/components/dotted-separator';
import { projectSchema, ProjectSchema } from '@/features/projects/schema';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useGetClientsOptions } from '@/features/clients/apis/use-get-clients-options';

interface ProjectFormProps {
  readonly initialValues: ProjectSchema;
  readonly action: 'edit' | 'create' | 'view' | string;
  readonly onSubmit?: (values: ProjectSchema) => void;
  readonly isLoading?: boolean;
}
const ProjectForm = ({
  initialValues,
  action,
  isLoading = false,
  onSubmit,
}: ProjectFormProps) => {
  const form = useForm<ProjectSchema>({
    defaultValues: {
      ...initialValues,
    },
    resolver: zodResolver(projectSchema),
  });
  const [keyword, setKeyword] = useState('');
  const {
    data: options,
    isLoading: isLoadingClients,
    isFetching: isFetchingClients,
  } = useGetClientsOptions(keyword, initialValues.client_id);

  return (
    <Card className={'rounded-xl shadow-none'}>
      <CardHeader
        className={'flex flex-row items-center gap-x-4 space-y-0 p-7'}
      >
        <Button
          size={'sm'}
          variant={'outline'}
          onClick={() => redirect('/projects')}
        >
          <ArrowLeftIcon className={'mr-2 size-4'} />
          Back
        </Button>
        <CardTitle className={'text-xl font-bold'}>
          {action == 'create'
            ? 'Create a new project'
            : action == 'view'
              ? 'View project'
              : 'Update project'}
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
              name={'description'}
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <Textarea
                    {...field}
                    disabled={isLoading || action == 'view'}
                    placeholder={'Description'}
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
                    <DatePicker
                      {...field}
                      placeholder={'Pick a date'}
                      disabled={isLoading || action == 'view'}
                    />
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
                    <DatePicker
                      {...field}
                      placeholder={'Pick a date'}
                      disabled={isLoading || action == 'view'}
                    />
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
                    <ComboBoxServer
                      value={field.value}
                      options={options}
                      isLoading={isLoadingClients || isFetchingClients}
                      disabled={isLoading || action == 'view'}
                      onChangeKeyword={setKeyword}
                      placeholder={'Select client'}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                  {action != 'view' && (
                    <FormDescription>
                      Don&#39;t see client?{' '}
                      <Link
                        href={'/clients/create'}
                        className={'cursor-pointer font-semibold underline'}
                      >
                        Click here
                      </Link>
                    </FormDescription>
                  )}
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
export default ProjectForm;
