
'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';

const brands = [
  "Brazzers", "MYLF", "TUSHY", "BLACKED", "Adult Time", "Team Skeet", "Kink", "Nubiles Porn", "FakeHub", "Oldje", "PornForce", "Bangbros", "DFXtra", "Reality Kings", "Naughty America", "Mom Lover"
];

const SubNav = () => {
  return (
    <div className="bg-card/95 backdrop-blur-sm shadow-md sticky top-16 z-40">
      <div className="relative w-full overflow-hidden">
        <div className="flex items-center gap-4 overflow-x-auto p-3 no-scrollbar">
          {brands.map((brand, index) => (
            <Button
              key={brand}
              asChild
              variant={index === 0 ? 'default' : 'ghost'}
              className={cn(
                'flex-shrink-0 font-semibold h-9 px-4 rounded-md',
                index === 0 ? 'bg-accent hover:bg-accent/90 text-accent-foreground' : 'text-muted-foreground hover:text-foreground hover:bg-muted',
              )}
            >
              <Link href={`/search?q=${encodeURIComponent(brand)}`}>
                {brand}
              </Link>
            </Button>
          ))}
          <Button
            asChild
            variant="link"
            className="flex-shrink-0 text-accent font-semibold"
          >
            <Link href="/categories">
              View all
            </Link>
          </Button>
        </div>
        <div className="absolute top-0 right-0 h-full w-8 bg-gradient-to-l from-card to-transparent pointer-events-none" />
      </div>
    </div>
  );
};

export default SubNav;
