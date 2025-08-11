
'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import CategoryDropdown from './category-dropdown';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/context/language-context';

const CategoryNavItem = () => {
  const pathname = usePathname();
  const isActive = pathname.startsWith('/categories');
  const { t } = useLanguage();

  return (
    <NavigationMenuItem value="categories">
        <NavigationMenuTrigger 
            className={cn(
                navigationMenuTriggerStyle(),
                "group p-0 m-0 h-auto bg-transparent",
                "focus:bg-accent focus:text-accent-foreground data-[active]:bg-accent/50 data-[state=open]:bg-accent/50",
                isActive && 'bg-accent/50'
            )}
        >
          <Link href="/categories" passHref legacyBehavior>
            <span className="py-2 px-4">{t('main_nav_categories')}</span>
          </Link>
        </NavigationMenuTrigger>
      <NavigationMenuContent>
        <CategoryDropdown />
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
};

export default CategoryNavItem;
