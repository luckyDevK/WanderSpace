import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';
import type { LucideIcon } from 'lucide-react';

import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

interface ItemNav {
  title: string;
  href: string;
  icon: LucideIcon;

  isRender: boolean;
}

interface NavigationProps {
  navigationMenuItems: ItemNav[];
}

export default function NavigationMenuWithActiveItem({
  navigationMenuItems,
}: NavigationProps) {
  const location = useLocation();

  return (
    <NavigationMenu className="md:block hidden">
      <NavigationMenuList className="space-x-8">
        {navigationMenuItems.map((item) => {
          const isActive = location.pathname === item.href;

          return (
            item.isRender && (
              <NavigationMenuItem key={item.title}>
                <NavigationMenuLink
                  className={cn(
                    'relative group inline-flex h-9 w-max items-center justify-center px-0.5 py-2 text-sm font-medium',
                    'before:absolute before:bottom-0 before:inset-x-0 before:h-[2px] before:bg-primary before:scale-x-0 before:transition-transform',
                    'hover:before:scale-x-100 hover:text-accent-foreground',
                    'focus:before:scale-x-100 focus:text-accent-foreground focus:outline-none',
                    'disabled:pointer-events-none disabled:opacity-50',
                    'data-[active]:before:scale-x-100 data-[state=open]:before:scale-x-100',
                  )}
                  asChild
                  active={isActive}
                >
                  <Link to={item.href}>
                    <item.icon className="h-5 w-5 mr-1" />
                    {item.title}
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            )
          );
        })}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
