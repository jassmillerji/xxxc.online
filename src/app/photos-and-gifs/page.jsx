
'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { ArrowRight, FileImage, Gift, Tag } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { getPopularTags, getPhotosAndGifs } from '@/lib/data';
import ContentCard from '@/components/content-card';
import { cn } from '@/lib/utils';
import { Pagination } from '@/components/ui/pagination';


const ITEMS_PER_PAGE = 8;

export default function PhotosAndGifsPage() {
  const [selectedTag, setSelectedTag] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [popularTags, setPopularTags] = useState([]);
  const [photosAndGifsData, setPhotosAndGifsData] = useState([]);

  useEffect(() => {
    async function fetchData() {
        const [tags, content] = await Promise.all([
            getPopularTags(),
            getPhotosAndGifs()
        ]);
        setPopularTags(tags);
        setPhotosAndGifsData(content);
    }
    fetchData();
  }, []);

  const topGifs = photosAndGifsData.filter(item => item.type === 'gif' && item.category === 'Top Rated').slice(0, 4);
  const topAlbums = photosAndGifsData.filter(item => item.type === 'album' && item.category === 'Top Rated').slice(0, 4);
  
  const allContent = photosAndGifsData;

  const filteredContent = selectedTag
    ? allContent.filter(item => item.tags.includes(selectedTag))
    : allContent;
  
  const totalPages = Math.ceil(filteredContent.length / ITEMS_PER_PAGE);
  const paginatedContent = filteredContent.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleTagClick = (tag) => {
    setSelectedTag(tag);
    setCurrentPage(1);
  };
  
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold font-headline mb-4">Explore Photos & GIFs</h1>
        <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
          Dive into our collections of high-resolution photo albums and exciting animated GIFs. Find your favorite content and discover new creators in every category.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <main className="lg:col-span-full w-full ">
          {/* Hottest GIFs Section */}
          {!selectedTag && (
            <>
              <section className="mb-12  ">
                <div className="flex justify-between items-center mb-6 w-full">
                  <h2 className="text-2xl font-bold flex items-center gap-2">
                    <Gift className="text-accent" />
                    <span>Hottest GIFs</span>
                  </h2>
                  <Button asChild variant="link" className="text-accent">
                    <Link href="/gifs">View All <ArrowRight className="w-4 h-4 ml-1" /></Link>
                  </Button>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {topGifs.map(gif => (
                    <ContentCard key={gif.id} item={gif} type="gif" />
                  ))}
                </div>
              </section>

              {/* Top Photo Albums Section */}
              <section>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold flex items-center gap-2">
                    <FileImage className="text-accent" />
                    <span>Top Photo Albums</span>
                  </h2>
                  <Button asChild variant="link" className="text-accent">
                    <Link href="/albums">View All <ArrowRight className="w-4 h-4 ml-1" /></Link>
                  </Button>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {topAlbums.map(album => (
                    <ContentCard key={album.id} item={album} type="album" />
                  ))}
                </div>
              </section>
            </>
          )}

          {selectedTag && (
            <section>
                <h2 className="text-2xl font-bold mb-6">
                    Showing results for <span className="text-accent">"{selectedTag}"</span>
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {paginatedContent.map(item => (
                    <ContentCard key={item.id} item={item} type={item.type} />
                  ))}
                </div>

                {totalPages > 1 && (
                    <div className="mt-12">
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                        />
                    </div>
                )}
            </section>
          )}
        </main>

        <aside className="lg:col-span-3">
          <div className="sticky top-24">
          </div>
        </aside>
      </div>
    </div>
  );
}
