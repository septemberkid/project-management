'use client';
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog';
import { Drawer, DrawerContent } from '@/components/ui/drawer';
import { useIsMobile } from '@/hooks/use-mobile';

interface ResponsiveModalProps {
  children: React.ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ResponsiveModal = ({
  children,
  open,
  onOpenChange,
}: ResponsiveModalProps) => {
  const isMobile = useIsMobile();
  if (!isMobile) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className='hide-scrollbar max-h-[85vh] w-full overflow-y-auto border-none p-0 sm:max-w-lg'>
          <DialogTitle />
          <DialogDescription />
          {children}
        </DialogContent>
      </Dialog>
    );
  }
  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent>
        <DialogTitle />
        <DialogDescription />
        <div className='hide-scrollbar max-h-[85vh] overflow-y-auto'>
          {children}
        </div>
      </DrawerContent>
    </Drawer>
  );
};
export default ResponsiveModal;
