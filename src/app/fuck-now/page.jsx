
import { getVideos } from '@/lib/data';
import FuckNowClient from './fuck-now-client';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';


export const metadata = {
  title: 'Fuck Now - Instant Video Reels on xxxc.online',
  description: 'Instantly watch short, hot video reels. Scroll for an endless stream of 15-second clips on xxxc.online.',
};

export default async function FuckNowPage() {
  const videos = await getVideos();
  // Simple sort to ensure consistent order between server and client
  const sortedVideos = videos.sort((a, b) => a.id.localeCompare(b.id));
  return (
    <Suspense fallback={<FuckNowPageSkeleton />}>
        <div className="flex-grow flex flex-col h-full relative">
            <FuckNowClient videos={sortedVideos} />
        </div>
    </Suspense>
  );
}

function FuckNowPageSkeleton() {
    return (
        <div className="flex-grow flex items-center justify-center bg-black">
            <Skeleton className="h-full w-full" />
        </div>
    )
}
