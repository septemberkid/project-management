import React from 'react';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Separator } from '@/components/ui/separator';
import AppBreadcrumb from '@/components/app/app-breadcrumb';
import AppSidebar from '@/components/app/sidebar/app-sidebar';
import { BreadcrumbProvider } from '@/contexts/breadcrumb-context';

interface DashboardLayoutProps {
  children: React.ReactNode;
}
const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <BreadcrumbProvider>
        <SidebarInset>
          <header className='flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12'>
            <div className='flex items-center gap-2 px-4'>
              <SidebarTrigger className='-ml-1' />
              <Separator orientation='vertical' className='mr-2 h-4' />
              <AppBreadcrumb />
            </div>
          </header>
          <div className='h-full gap-4 bg-muted/50 p-4'>{children}</div>
        </SidebarInset>
      </BreadcrumbProvider>
    </SidebarProvider>
  );
};
export default DashboardLayout;
