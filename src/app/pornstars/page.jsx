
import { Suspense } from 'react';
import PornstarsPageClient from './pornstars-page-client';
import { Skeleton } from '@/components/ui/skeleton';
import { getPornstars } from '@/lib/data';


export default async function PornstarsPage() {
  const pornstars = await getPornstars();
  return (
    <Suspense fallback={<PornstarsPageSkeleton/>}>
      <PornstarsPageClient pornstars={pornstars} />
    </Suspense>
  );
}

function PornstarsPageSkeleton() {
    return (
        <div className="px-4 sm:px-6 lg:px-8 py-8 text-white">
            <section className="mb-12">
                <Skeleton className="h-8 w-48 mb-4" />
                <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4">
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="flex-shrink-0 w-40 md:w-48 space-y-2">
                           <Skeleton className="aspect-[3/4] w-full" />
                           <Skeleton className="h-4 w-2/3" />
                           <Skeleton className="h-3 w-1/2" />
                        </div>
                    ))}
                </div>
            </section>
            <section>
                <Skeleton className="h-8 w-72 mb-4" />
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-x-4 gap-y-8">
                     {[...Array(14)].map((_, i) => (
                        <div key={i} className="space-y-2">
                           <Skeleton className="aspect-[3/4] w-full" />
                           <Skeleton className="h-4 w-2/3" />
                           <Skeleton className="h-3 w-1/2" />
                        </div>
                    ))}
                </div>
            </section>
        </div>
    )
}
