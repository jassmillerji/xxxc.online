
'use client';

import VideoCard from '@/components/video-card';
import { Pagination } from '@/components/ui/pagination';
import { useLanguage } from '@/context/language-context';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect, useMemo, useCallback } from 'react';
import FilterSection from '@/components/filter-section';
import { getCategories, getPornstars, getPopularTags } from '@/lib/data';

export default function HomePage({ videos, currentPage, totalPages, homePageHeading, homePageContent }) {
  const { t } = useLanguage();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [filters, setFilters] = useState(() => {
    const params = new URLSearchParams(searchParams);
    return {
        sort: params.get('sort') || 'popular',
        category: params.get('category') || 'all',
        pornstar: params.get('pornstar') || 'all',
        tags: params.getAll('tags') || [],
    }
  });

  const [categories, setCategories] = useState([]);
  const [pornstars, setPornstars] = useState([]);
  const [tags, setTags] = useState([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const fetchFilterData = async () => {
        const [cats, pstars, pTags] = await Promise.all([
            getCategories(),
            getPornstars(),
            getPopularTags()
        ]);
        setCategories(cats);
        setPornstars(pstars);
        setTags(pTags);
    };
    fetchFilterData();
  }, []);

  const handleFilterChange = useCallback((newFilters) => {
    const currentParams = new URLSearchParams(searchParams);
    const params = new URLSearchParams();
    
    params.set('page', '1');
    
    if (newFilters.sort !== 'popular') params.set('sort', newFilters.sort);
    if (newFilters.category !== 'all') params.set('category', newFilters.category);
    if (newFilters.pornstar !== 'all') params.set('pornstar', newFilters.pornstar);
    newFilters.tags.forEach(tag => params.append('tags', tag));

    if(params.toString() !== currentParams.toString()) {
        router.push(`/?${params.toString()}`);
    }
    setFilters(newFilters);
  }, [router, searchParams]);


  const filteredVideos = useMemo(() => {
    let tempVideos = [...videos];

    // Sorting
    if (filters.sort === 'newest') {
        // Assuming videos are already somewhat sorted by date or ID from the backend.
        // For a real "newest" sort, an explicit date field would be best.
        // Here we'll just reverse for demonstration.
        tempVideos.reverse();
    } else if (filters.sort === 'top-rated') {
        tempVideos.sort((a, b) => b.rating - a.rating);
    } else { // 'popular'
        tempVideos.sort((a, b) => b.views - a.views);
    }

    // Filtering
    return tempVideos.filter(video => {
        const categoryMatch = filters.category === 'all' || video.tags.includes(filters.category);
        const pornstarMatch = filters.pornstar === 'all' || video.creator === filters.pornstar;
        const tagsMatch = filters.tags.length === 0 || filters.tags.every(tag => video.tags.includes(tag));
        return categoryMatch && pornstarMatch && tagsMatch;
    });
  }, [videos, filters]);

  const VIDEOS_PER_PAGE = 50;
  const currentTotalPages = Math.ceil(filteredVideos.length / VIDEOS_PER_PAGE);
  const startIndex = (currentPage - 1) * VIDEOS_PER_PAGE;
  const endIndex = startIndex + VIDEOS_PER_PAGE;
  const currentVideos = filteredVideos.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', page.toString());
    router.push(`/?${params.toString()}`);
    window.scrollTo(0, 0);
  };
  
  if (!isClient) {
    return null; // Or a loading skeleton
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
       <FilterSection 
         onFilterChange={handleFilterChange}
         categories={categories}
         pornstars={pornstars}
         tags={tags}
         initialFilters={filters}
       />
      
      <section className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <h1 className="text-2xl md:text-3xl font-bold font-headline">{t('all_videos')}</h1>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-x-4 gap-y-8">
          {currentVideos.map((video, index) => (
            <VideoCard key={`${video.id}-${index}`} video={video} />
          ))}
        </div>
         {currentVideos.length === 0 && (
            <div className="col-span-full text-center py-16">
                <p className="text-muted-foreground">No videos found matching your criteria.</p>
            </div>
        )}
      </section>

      {(homePageHeading || homePageContent.length > 0) && (
        <section className="mb-12">
            <div className="prose prose-invert max-w-none text-muted-foreground space-y-4">
                {homePageHeading && <h2 className="text-2xl font-bold text-foreground mb-4">{homePageHeading}</h2>}
                {homePageContent.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                ))}
            </div>
        </section>
      )}

      {currentTotalPages > 1 && (
        <div className="mt-12">
          <Pagination 
            currentPage={currentPage} 
            totalPages={currentTotalPages} 
            onPageChange={handlePageChange} 
          />
        </div>
      )}
    </div>
  );
}
