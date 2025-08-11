
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
import LiveCamsDropdown from './live-cams-dropdown';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/context/language-context';

const LiveCamsNavItem = () => {
  const { t } = useLanguage();
  const pathname = usePathname();
  const isActive = pathname.startsWith('/live-cams');

  return (
    <NavigationMenuItem value="live-cams">
            <NavigationMenuTrigger
                 className={cn(
                    navigationMenuTriggerStyle(),
                    "group p-0 m-0 h-auto bg-transparent",
                    "focus:bg-accent focus:text-accent-foreground data-[active]:bg-accent/50 data-[state=open]:bg-accent/50",
                    isActive && 'bg-accent/50'
                )}
            >
              <Link href="/live-cams" passHref legacyBehavior>
                <span className="py-2 px-4">{t('main_nav_live_cams')}</span>
              </Link>
            </NavigationMenuTrigger>
      <NavigationMenuContent>
        <LiveCamsDropdown />
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
};

export default LiveCamsNavItem;
