
'use client';

import AppSidebar from '@/components/app-sidebar';
import Footer from '@/components/footer';
import Header from '@/components/header';
import PageTransition from '@/components/page-transition';
import { useSidebar } from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import { Suspense } from 'react';
import { Skeleton } from './ui/skeleton';
import TrendingSearches from './trending-searches';
import SubNav from './sub-nav';

function HeaderSkeleton() {
    return (
        <div className="flex h-16 items-center px-4 sm:px-6 lg:px-8">
            <Skeleton className="h-8 w-8 mr-4" />
            <Skeleton className="h-8 w-32 mr-auto" />
            <Skeleton className="h-10 w-64" />
        </div>
    )
}

export default function AppBodyContent({ children }) {
    const { openMobile } = useSidebar();
    const pathname = usePathname();
    const isFuckNowPage = pathname === '/fuck-now';

    if (isFuckNowPage) {
        return (
             <div className="flex-grow flex flex-col h-screen bg-black">
                {children}
            </div>
        )
    }

    return (
        <div className="flex min-h-screen">
            <AppSidebar />
            <div className="flex flex-col w-full">
                <Suspense fallback={<HeaderSkeleton />}>
                   <Header />
                </Suspense>
                <SubNav />
                <main id="main-content" className={cn("flex-grow transition-all duration-300", { "bg-background/80 backdrop-blur-sm": openMobile })}>
                    <PageTransition>
                        {children}
                    </PageTransition>
                </main>
                <TrendingSearches />
                <Footer />
            </div>
        </div>
    );
}
