'use client';

import * as React from 'react';
import { NavItem, User } from '@/types';
import { Sidebar } from '@/components/ui/sidebar';
import {
  Settings2,
  Package2,
  Users2,
  Home,
  CheckCircle2,
  Table2,
  Kanban,
  Calendar,
} from 'lucide-react';
import AppSidebarFooter from '@/components/app/sidebar/app-sidebar-footer';
import AppSidebarHeader from '@/components/app/sidebar/app-sidebar-header';
import AppSidebarContent from '@/components/app/sidebar/app-sidebar-content';

interface AppSidebarData {
  readonly user: User;
  readonly navs: NavItem[];
  readonly appNavs: NavItem[];
}
const AppSidebar = ({ ...props }: React.ComponentProps<typeof Sidebar>) => {
  const data: AppSidebarData = {
    user: {
      full_name: 'Jane Doe',
      email: 'jane@acme.inc',
    },
    navs: [
      {
        title: 'Home',
        url: '/',
        icon: Home,
      },
      {
        title: 'My Tasks',
        url: '/tasks',
        icon: CheckCircle2,
        actions: [
          {
            title: 'Table',
            icon: Table2,
            action: () => {},
          },
          {
            title: 'Kanban',
            icon: Kanban,
            action: () => {},
          },
        ],
      },
      {
        title: 'My Calendar',
        url: '/calendar',
        icon: Calendar,
      },
    ],
    appNavs: [
      {
        title: 'Clients',
        url: '/clients',
        icon: Users2,
        items: [
          {
            title: 'Create Client',
            url: '/clients/create',
          },
          {
            title: 'Client List',
            url: '/clients',
          },
        ],
      },
      {
        title: 'Projects',
        url: '/projects',
        icon: Package2,
        items: [
          {
            title: 'Create Project',
            url: '/projects/create',
          },
          {
            title: 'Project List',
            url: '/projects',
          },
        ],
      },
      {
        title: 'Settings',
        url: '/settings',
        icon: Settings2,
        items: [
          {
            title: 'General',
            url: '/settings',
          },
          {
            title: 'Member',
            url: '/settings/member',
          },
        ],
      },
    ],
  };

  return (
    <Sidebar collapsible={'icon'} {...props}>
      <AppSidebarHeader />
      <AppSidebarContent navs={data.navs} appNavs={data.appNavs} />
      <AppSidebarFooter user={data.user} />
    </Sidebar>
  );
};
export default AppSidebar;
