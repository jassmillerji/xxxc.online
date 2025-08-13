
'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { useEffect, useState } from 'react';
import { getCategories } from '@/lib/data';
import { usePathname } from 'next/navigation';

const SubNav = () => {
  const [categories, setCategories] = useState([]);
  const pathname = usePathname();

  useEffect(() => {
    async function fetchCategories() {
      const fetchedCategories = await getCategories();
      // Take a slice of categories to avoid overcrowding the nav bar
      setCategories(fetchedCategories.slice(0, 15));
    }
    fetchCategories();
  }, []);


  return (
    <div className="bg-card/95 backdrop-blur-sm shadow-md sticky top-16 z-40">
      <div className="relative w-full overflow-hidden">
        <div className="flex items-center gap-4 overflow-x-auto p-3 no-scrollbar">
          {categories.map((category) => {
            const isActive = pathname === `/categories/${category.slug}`;
            return (
                <Button
                    key={category.id}
                    asChild
                    variant={isActive ? 'default' : 'ghost'}
                    className={cn(
                        'flex-shrink-0 font-semibold h-9 px-4 rounded-md',
                        isActive ? 'bg-accent hover:bg-accent/90 text-accent-foreground' : 'text-muted-foreground hover:text-foreground hover:bg-muted',
                    )}
                >
                    <Link href={`/categories/${category.slug}`}>
                        {category.name}
                    </Link>
                </Button>
            )
          })}
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
