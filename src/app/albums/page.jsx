
import { Suspense } from 'react';
import AlbumsPageClient from './albums-page-client';
import { Skeleton } from '@/components/ui/skeleton';
import { getPhotosAndGifs, getPopularTags } from '@/lib/data';

async function AlbumsPageContent() {
  const allContent = await getPhotosAndGifs();
  const popularTags = await getPopularTags();
  const allAlbums = allContent.filter(item => item.type === 'album');
  
  return <AlbumsPageClient allAlbums={allAlbums} popularTags={popularTags} />
}

export default function AlbumsPage() {
  return (
    <Suspense fallback={<AlbumPageSkeleton />}>
      <AlbumsPageContent />
    </Suspense>
  );
}

function AlbumPageSkeleton() {
    return (
        <div className="px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                <div className="md:col-span-3">
                </div>
                <div className="md:col-span-9">
                    <Skeleton className="h-8 w-1/3 mb-8" />
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
                        {[...Array(12)].map((_, i) => (
                            <div key={i} className="space-y-2">
                                <Skeleton className="aspect-video w-full" />
                                <Skeleton className="h-4 w-2/3" />
                                <Skeleton className="h-3 w-1/2" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
