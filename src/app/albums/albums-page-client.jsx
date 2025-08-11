
'use client';

import { useState } from 'react';
import ContentCard from '@/components/content-card';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Tag } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Pagination } from '@/components/ui/pagination';

const ITEMS_PER_PAGE = 12;

export default function AlbumsPageClient({ allAlbums, popularTags }) {
  const [selectedTag, setSelectedTag] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const filteredAlbums = selectedTag
    ? allAlbums.filter(album => album.tags.includes(selectedTag))
    : allAlbums;

  const totalPages = Math.ceil(filteredAlbums.length / ITEMS_PER_PAGE);
  const paginatedAlbums = filteredAlbums.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleTagClick = (tag) => {
    setSelectedTag(tag);
    setCurrentPage(1); // Reset to first page on new filter
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8">
       <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        <div className="md:col-span-3">
        </div>

        <div className="md:col-span-9">
            <h1 className="text-3xl font-bold mb-8 font-headline">
              {selectedTag ? `${selectedTag} Albums` : 'All Photo Albums'}
            </h1>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginatedAlbums.map((album) => (
                  <ContentCard key={album.id} item={album} type="album" />
                ))}
            </div>
            {filteredAlbums.length === 0 && (
                <p className="text-center text-muted-foreground mt-10">No albums found for the tag "{selectedTag}".</p>
            )}

            {totalPages > 1 && (
                <div className="mt-12">
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                </div>
            )}
        </div>
      </div>
    </div>
  );
}
