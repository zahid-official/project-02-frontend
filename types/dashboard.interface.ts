import { UserRole } from "@/utils/protectedRoutes";

export interface NavItem {
  title: string;
  href: string;
  icon: string;
  badge?: string | number;
  description?: string;
  roles: UserRole[];
}

export interface NavSection {
  title?: string;
  items: NavItem[];
}
