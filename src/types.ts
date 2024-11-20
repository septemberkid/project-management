import { LucideIcon } from 'lucide-react';

export interface User {
  readonly full_name: string;
  readonly email: string;
}
export interface BreadcrumbItem {
  title: string;
  url?: string;
}
export interface NavAction {
  readonly title: string;
  readonly icon: LucideIcon;
  readonly action: () => void;
}
export interface NavItem {
  readonly title: string;
  readonly url: string;
  readonly icon: LucideIcon;
  readonly actions?: NavAction[];
  readonly items?: Omit<NavItem, 'icon' | 'items' | 'actions'>[];
}
