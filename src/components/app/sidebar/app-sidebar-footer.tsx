'use client';
import { User } from '@/types';
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
import { generateAvatarInitial } from '@/libs/utils';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ChevronsUpDown, LogOut, Bell, VerifiedIcon } from 'lucide-react';

interface AppSidebarFooterProps {
  user: User;
}
const AppSidebarFooter = ({ user }: AppSidebarFooterProps) => {
  const { isMobile } = useSidebar();

  const avatarInitial = generateAvatarInitial(user.full_name);

  const UserAvatar = () => (
    <Avatar className={'h-8 w-8 rounded-lg'}>
      <AvatarFallback className={'rounded-lg bg-neutral-800 text-white'}>
        {avatarInitial}
      </AvatarFallback>
    </Avatar>
  );
  const UserInfo = () => (
    <div className={'grid flex-1 text-left text-sm leading-tight'}>
      <span className={'truncate font-semibold'}>{user.full_name}</span>
      <span className={'truncate text-xs text-muted-foreground'}>
        {user.email}
      </span>
    </div>
  );

  return (
    <SidebarFooter>
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
                <UserAvatar />
                <UserInfo />
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
                  <UserAvatar />
                  <UserInfo />
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
