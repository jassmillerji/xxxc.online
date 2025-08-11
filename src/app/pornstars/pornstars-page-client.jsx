
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import PornstarCard from '@/components/pornstar-card';

const INITIAL_ITEMS = 50;
const ITEMS_TO_LOAD = 50;

export default function PornstarsPageClient({ pornstars }) {
  const popularPornstars = pornstars.filter(p => !p.isTrending);
  const [visibleCount, setVisibleCount] = useState(INITIAL_ITEMS);

  const visiblePornstars = popularPornstars.slice(0, visibleCount);

  const handleLoadMore = () => {
    setVisibleCount(prevCount => prevCount + ITEMS_TO_LOAD);
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 text-white">
      <section>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
          <h2 className="text-xl md:text-2xl font-bold">This Month's Most Popular Pornstars And Models</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-x-4 gap-y-8">
          {visiblePornstars.map((pornstar) => (
            <PornstarCard key={pornstar.id} pornstar={pornstar} />
          ))}
        </div>

        {visibleCount < popularPornstars.length && (
          <div className="text-center mt-12">
            <Button onClick={handleLoadMore} size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
              Load More Pornstars
            </Button>
          </div>
        )}
      </section>
    </div>
  );
}
