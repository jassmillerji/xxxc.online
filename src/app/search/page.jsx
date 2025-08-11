
import { Suspense } from 'react';
import { getVideos, getPornstars, getPhotosAndGifs } from '@/lib/data';
import VideoCard from '@/components/video-card';
import PornstarCard from '@/components/pornstar-card';
import ContentCard from '@/components/content-card';
import { Skeleton } from '@/components/ui/skeleton';

async function SearchResults({ query }) {
    if (!query) {
        return (
            <div className="px-4 sm:px-6 lg:px-8 py-8">
                <h1 className="text-3xl font-bold mb-8 font-headline">Search</h1>
                <p className="text-center text-muted-foreground text-lg mt-12">
                    Please enter a search term to begin.
                </p>
            </div>
        );
    }

    const normalizedQuery = query.toLowerCase().trim();

    const allVideos = await getVideos();
    const videoResults = allVideos.filter(video => 
        video.title.toLowerCase().includes(normalizedQuery) ||
        video.creator.toLowerCase().includes(normalizedQuery) ||
        video.tags.some(tag => tag.toLowerCase().includes(normalizedQuery))
    );

    const allPornstars = await getPornstars();
    const pornstarResults = allPornstars.filter(pornstar => 
        pornstar.name.toLowerCase().includes(normalizedQuery)
    );

    const allContent = await getPhotosAndGifs();
    const contentResults = allContent.filter(item => 
        item.title.toLowerCase().includes(normalizedQuery) ||
        item.tags.some(tag => tag.toLowerCase().includes(normalizedQuery))
    );

    const hasResults = videoResults.length > 0 || pornstarResults.length > 0 || contentResults.length > 0;

    return (
        <div className="px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-3xl font-bold mb-8 font-headline">
                Search Results for: <span className="text-accent">{query}</span>
            </h1>

            {!hasResults ? (
                <p className="text-center text-muted-foreground text-lg mt-12">
                    No results found for "{query}". Please try a different search.
                </p>
            ) : (
                <div className="space-y-12">
                    {videoResults.length > 0 && (
                        <section>
                            <h2 className="text-2xl font-bold mb-6">Videos ({videoResults.length})</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-x-4 gap-y-8">
                                {videoResults.map((video, index) => (
                                    <VideoCard key={`video-${video.id}-${index}`} video={video} />
                                ))}
                            </div>
                        </section>
                    )}

                    {pornstarResults.length > 0 && (
                        <section>
                            <h2 className="text-2xl font-bold mb-6">Pornstars ({pornstarResults.length})</h2>
                             <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-x-4 gap-y-8">
                                {pornstarResults.map((pornstar) => (
                                    <PornstarCard key={pornstar.id} pornstar={pornstar} />
                                ))}
                            </div>
                        </section>
                    )}

                    {contentResults.length > 0 && (
                        <section>
                            <h2 className="text-2xl font-bold mb-6">Photos & GIFs ({contentResults.length})</h2>
                            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {contentResults.map((item) => (
                                    <ContentCard key={item.id} item={item} type={item.type} />
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            )}
        </div>
    );
}

function SearchPageSkeleton() {
    return (
        <div className="px-4 sm:px-6 lg:px-8 py-8">
            <Skeleton className="h-8 w-1/2 mb-8" />
            <div className="space-y-12">
                <section>
                    <Skeleton className="h-7 w-48 mb-6" />
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
                        {[...Array(6)].map((_, i) => (
                             <div key={i} className="space-y-2">
                                <Skeleton className="aspect-video w-full" />
                                <Skeleton className="h-4 w-2/3" />
                                <Skeleton className="h-3 w-1/2" />
                            </div>
                        ))}
                    </div>
                </section>
                 <section>
                    <Skeleton className="h-7 w-48 mb-6" />
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-6">
                        {[...Array(7)].map((_, i) => (
                             <div key={i} className="space-y-2">
                               <Skeleton className="aspect-[3/4] w-full" />
                               <Skeleton className="h-4 w-2/3" />
                               <Skeleton className="h-3 w-1/2" />
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}

function SearchPageWrapper({searchParams}) {
    const query = searchParams?.q || '';
    return <SearchResults query={query} />
}

export default function SearchPage({ searchParams }) {
    return (
        <Suspense fallback={<SearchPageSkeleton />}>
            <SearchPageWrapper searchParams={searchParams} />
        </Suspense>
    );
}
