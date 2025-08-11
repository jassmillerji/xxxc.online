
import LiveCamsClient from './live-cams-client';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { getLiveCamsData } from '@/lib/data';

export const metadata = {
  title: 'Live Cams - Watch Live Adult Models on xxxc.online',
  description: 'Join live cam shows with models from around the world. Chat, interact, and watch live performances now on xxxc.online.',
};

async function LiveCamsContent() {
    const camData = await getLiveCamsData();
    return <LiveCamsClient camData={camData} />
}

export default function LiveCamsPage() {
  return (
    <Suspense fallback={<LiveCamsPageSkeleton />}>
      <LiveCamsContent />
    </Suspense>
  );
}

function LiveCamsPageSkeleton() {
    return (
        <div className="px-4 sm:px-6 lg:px-8 py-8 space-y-12">
            {/* Featured Carousel Skeleton */}
            <Skeleton className="w-full h-96 rounded-lg" />

            {/* Sections Skeleton */}
            {[...Array(3)].map((_, i) => (
                <div key={i}>
                    <Skeleton className="h-8 w-1/3 mb-6" />
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                        {[...Array(6)].map((_, j) => (
                            <div key={j} className="space-y-2">
                               <Skeleton className="aspect-[3/4] w-full" />
                               <Skeleton className="h-4 w-2/3" />
                               <Skeleton className="h-3 w-1/2" />
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )
}
