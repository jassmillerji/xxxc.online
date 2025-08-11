
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
import { cn } from '@/lib/utils';
import { useLanguage } from '@/context/language-context';
import PhotosAndGifsDropdown from './photos-and-gifs-dropdown';

const PhotosAndGifsNavItem = () => {
  const pathname = usePathname();
  const isActive = pathname.startsWith('/photos-and-gifs') || pathname.startsWith('/albums') || pathname.startsWith('/gifs');
  const { t } = useLanguage();

  return (
    <NavigationMenuItem value="photos-and-gifs">
            <NavigationMenuTrigger
                className={cn(
                    navigationMenuTriggerStyle(),
                    "group p-0 m-0 h-auto bg-transparent",
                    "focus:bg-accent focus:text-accent-foreground data-[active]:bg-accent/50 data-[state=open]:bg-accent/50",
                    isActive && 'bg-accent/50'
                )}
            >
              <Link href="/photos-and-gifs" passHref legacyBehavior>
                 <span className="py-2 px-4">{t('main_nav_photos_gifs')}</span>
              </Link>
            </NavigationMenuTrigger>
      <NavigationMenuContent>
        <PhotosAndGifsDropdown />
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
};

export default PhotosAndGifsNavItem;
