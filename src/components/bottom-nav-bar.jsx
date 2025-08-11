
'use client';

import Link from 'next/link';
import { Home, LayoutGrid, Clapperboard, Star, Image as ImageIcon, Flame } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';

const navItems = [
  { href: '/', icon: Home, label: 'Home' },
  { href: '/categories', icon: LayoutGrid, label: 'Categories' },
  { href: '/live-cams', icon: Clapperboard, label: 'Live' },
  { href: '/pornstars', icon: Star, label: 'Stars' },
  { href: '/photos-and-gifs', icon: ImageIcon, label: 'Photos' },
];

const BottomNavBar = () => {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-0 left-0 right-0 h-20 flex justify-center pointer-events-none z-50 md:hidden">
        <nav className="flex items-center justify-around w-full max-w-md h-16 pointer-events-auto bg-black/50 backdrop-blur-lg rounded-full shadow-lg mx-4 px-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link href={item.href} key={item.label} className="flex flex-col items-center justify-center h-full w-16 text-white">
                <item.icon className={cn("w-6 h-6", isActive ? 'text-accent' : 'text-stone-400')} />
                <span className={cn("text-[10px] mt-1", isActive ? 'text-white font-bold' : 'text-stone-400')}>{item.label}</span>
              </Link>
            );
          })}
          <Button asChild className="h-12 w-12 rounded-full bg-accent hover:bg-accent/90 p-0">
            <Link href="/fuck-now">
              <Flame className="w-6 h-6 text-accent-foreground" />
              <span className="sr-only">Fuck Now</span>
            </Link>
          </Button>
        </nav>
    </div>
  );
};

export default BottomNavBar;
