
"use client";

import Link from "next/link";
import { Menu, Search, PlayCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import Logo from "./logo";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useLanguage } from "@/context/language-context";
import { useState, useEffect, useCallback } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Button } from "./ui/button";
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import CategoryNavItem from "./category-nav-item";
import LiveCamsNavItem from "./live-cams-nav-item";
import PhotosAndGifsNavItem from "./photos-and-gifs-nav-item";

// Custom hook for debouncing
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

const Header = () => {
  const { t } = useLanguage();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  const handleSearchRedirect = useCallback((query) => {
    if (query.trim() !== '') {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    } else if (pathname === '/search') {
      router.push('/');
    }
  }, [router, pathname]);
  
  useEffect(() => {
    if (debouncedSearchQuery !== (searchParams.get('q') || '') || (debouncedSearchQuery === '' && pathname === '/search')) {
        handleSearchRedirect(debouncedSearchQuery);
    }
  }, [debouncedSearchQuery, searchParams, handleSearchRedirect, pathname]);

  useEffect(() => {
    setSearchQuery(searchParams.get('q') || '');
  }, [searchParams]);

  const navLinks = [
    { href: "/pornstars", label: t('main_nav_pornstars') },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center px-4 sm:px-6 lg:px-8">
          <SidebarTrigger className="mr-4 text-foreground/70 hover:text-foreground md:hidden">
            <Menu className="w-6 h-6" />
          </SidebarTrigger>
          
          <div className="mr-6 flex">
            <Logo showDomain={true} />
          </div>

          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList className="border border-accent rounded-full p-1">
              <NavigationMenuItem>
                  <Link href="/" legacyBehavior passHref>
                      <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                          {t('main_nav_home')}
                      </NavigationMenuLink>
                  </Link>
              </NavigationMenuItem>
              <CategoryNavItem />
              <LiveCamsNavItem />
              <PhotosAndGifsNavItem />
               {navLinks.map(link => (
                 <NavigationMenuItem key={link.href}>
                  <Link href={link.href} legacyBehavior passHref>
                      <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                          {link.label}
                      </NavigationMenuLink>
                  </Link>
              </NavigationMenuItem>
               ))}
            </NavigationMenuList>
          </NavigationMenu>

          <div className="flex flex-1 items-center justify-end gap-2">
            <div className="flex-1 max-w-xs hidden sm:block">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input 
                  placeholder={t('search_placeholder')} 
                  className="bg-card border-none h-10 rounded-full pl-10 placeholder:text-muted-foreground"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
             <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full">
                <Link href="/fuck-now">
                    <PlayCircle className="w-5 h-5 mr-1" />
                    Reels
                </Link>
            </Button>
          </div>
      </div>
    </header>
  );
};

export default Header;
