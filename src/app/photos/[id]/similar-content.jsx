
'use client';

import { useState } from 'react';
import ContentCard from '@/components/content-card';
import { Button } from '@/components/ui/button';
import { Film } from 'lucide-react';

const ITEMS_PER_PAGE = 6;

const SimilarContent = ({ items, title }) => {
  const [visibleItems, setVisibleItems] = useState(ITEMS_PER_PAGE);

  const handleLoadMore = () => {
    setVisibleItems(prev => prev + ITEMS_PER_PAGE);
  };

  return (
    <div>
        <div className="flex items-center gap-3 mb-6">
            <Film className="w-8 h-8 text-primary" />
            <h2 className="text-2xl md:text-3xl font-bold font-headline">{title}</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            {items.slice(0, visibleItems).map((item) => (
                <ContentCard key={item.id} item={item} type={item.type} />
            ))}
        </div>
        {visibleItems < items.length && (
            <div className="text-center mt-8">
            <Button onClick={handleLoadMore} className="bg-pink-500 hover:bg-pink-500/90 text-white">Load More</Button>
            </div>
        )}
    </div>
  );
};

export default SimilarContent;
