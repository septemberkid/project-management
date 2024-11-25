'use client';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Roles } from '@/enums';
import { capitalize, cn } from '@/libs/utils';
import { useForm } from 'react-hook-form';
import { redirect } from 'next/navigation';
import { ArrowLeftIcon } from 'lucide-react';
import ComboBox, { Option } from '@/components/combo-box';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import DottedSeparator from '@/components/dotted-separator';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { memberSchema, MemberSchema } from '@/features/members/schema';

interface MemberFormProps {
  readonly initialValues: MemberSchema;
  readonly action: 'edit' | 'create' | string;
  readonly onSubmit?: (values: MemberSchema) => void;
  readonly isLoading?: boolean;
}
const MemberForm = ({
  initialValues,
  action,
  isLoading = false,
  onSubmit,
}: MemberFormProps) => {
  const form = useForm<MemberSchema>({
    defaultValues: {
      ...initialValues,
    },
    resolver: zodResolver(memberSchema),
  });
  const roles: Option[] = Object.entries(Roles).map(([key, value]) => ({
    value: value,
    label: capitalize(key),
  }));

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
          {action == 'create' ? 'Create a new member' : 'Update project'}
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
                    disabled={isLoading}
                    type={'text'}
                    placeholder={'Name'}
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
                    disabled={isLoading}
                    type={'email'}
                    placeholder={'Email'}
                    autoComplete={'off'}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name={'base_role'}
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Base Role</FormLabel>
                  <FormControl>
                    <ComboBox
                      {...field}
                      disabled={isLoading}
                      className={'lg:w-full'}
                      options={roles}
                      placeholder={'Select role'}
                    />
                  </FormControl>
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
export default MemberForm;
