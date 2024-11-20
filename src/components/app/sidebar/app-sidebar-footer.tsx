'use client';
import { User } from '@/types';
import { toast } from 'sonner';
import * as React from 'react';
import {
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useRouter } from 'next/navigation';
import { generateAvatarInitial } from '@/libs/utils';
import { useSignOut } from '@/features/auth/apis/use-sign-out';
import useConfirmationDialog from '@/hooks/use-confirm-dialog';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useGetSession } from '@/features/auth/apis/use-get-session';
import {
  ChevronsUpDown,
  LogOut,
  Bell,
  VerifiedIcon,
  Loader,
} from 'lucide-react';

const UserAvatar = ({ name }: { name: string }) => {
  const avatarInitial = generateAvatarInitial(name);
  return (
    <Avatar className={'h-8 w-8 rounded-lg'}>
      <AvatarFallback className={'rounded-lg bg-neutral-800 text-white'}>
        {avatarInitial}
      </AvatarFallback>
    </Avatar>
  );
};

const UserInfo = ({ user }: { user: User }) => {
  return (
    <div className={'grid flex-1 text-left text-sm leading-tight'}>
      <span className={'truncate font-semibold'}>{user.name}</span>
      <span className={'truncate text-xs text-muted-foreground'}>
        {user.email}
      </span>
    </div>
  );
};

const AppSidebarFooter = () => {
  const { isMobile } = useSidebar();
  const router = useRouter();
  const { mutate } = useSignOut();
  const [SignOutDialog, onConfirm] = useConfirmationDialog({
    title: 'Sign out',
    message: 'Are you sure want to sign out?',
    variant: 'destructive',
  });
  const { isFetching, isLoading, data: user, error } = useGetSession();

  if (error) {
    toast.error(error.message);
  }
  if (isFetching || isLoading) {
    return (
      <div className={'flex flex-col items-center justify-center p-4'}>
        <Loader className={'size-6 animate-spin text-muted-foreground'} />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const signOutHandler = async () => {
    const ok = await onConfirm();
    if (!ok) {
      return;
    }
    mutate(null, {
      onError: err => {
        toast.error(err.message);
      },
      onSuccess: res => {
        toast.success(res.message);
        console.log('sign out success');
        router.refresh();
      },
    });
  };
  return (
    <SidebarFooter>
      <SignOutDialog />
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size={'lg'}
                className={
                  'data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
                }
              >
                <UserAvatar name={user.name} />
                <UserInfo user={user} />
                <ChevronsUpDown className='ml-auto size-4' />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              side={isMobile ? 'bottom' : 'right'}
              align={'end'}
              sideOffset={4}
              className={
                'w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg'
              }
            >
              <DropdownMenuLabel className={'p-0 font-normal'}>
                <div className='flex items-center gap-2 px-1 py-1.5 text-left text-sm'>
                  <UserAvatar name={user.name} />
                  <UserInfo user={user} />
                </div>
              </DropdownMenuLabel>

              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <VerifiedIcon className={'mr-2 size-5'} />
                Account
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Bell className={'mr-2 size-5'} />
                Notification
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className={'text-destructive focus:text-destructive'}
                onClick={signOutHandler}
              >
                <LogOut className={'mr-2 size-5'} />
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  );
};
export default AppSidebarFooter;
