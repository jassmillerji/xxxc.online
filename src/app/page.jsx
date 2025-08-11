
import HomePage from '@/components/home-page';
import { getVideos } from '@/lib/data';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export const dynamic = 'force-dynamic';

export async function generateMetadata() {
    try {
        const response = await fetch('https://api.panelauthy.xyz/api/v1/admin/pages/static/xxxc-home-page', { next: { revalidate: 1800 } });
        if (!response.ok) {
            return {
                title: 'xxxc.online | Featured Adult Videos & Free Porn',
                description: 'Your top destination for the latest and greatest adult videos. Browse a huge library of free porn movies updated daily. Watch now on xxxc.online.',
            }
        }
        const apiData = await response.json();
        const metadata = apiData.data.meta;

        return {
            title: metadata.title,
            description: metadata.description,
            keywords: metadata.keywords ? metadata.keywords.split(',').map(k => k.trim()) : [],
        }
    } catch (error) {
        console.error('Failed to fetch homepage metadata:', error);
        return {
            title: 'xxxc.online | Featured Adult Videos & Free Porn',
            description: 'Your top destination for the latest and greatest adult videos. Browse a huge library of free porn movies updated daily. Watch now on xxxc.online.',
        }
    }
}


async function HomeContent({ searchParams }) {
    const allVideos = await getVideos();
    const currentPage = Number(searchParams?.page) || 1;

    let homePageHeading = '';
    let homePageContent = '';
    try {
        const response = await fetch('https://api.panelauthy.xyz/api/v1/admin/pages/static/xxxc-home-page', { cache: 'no-store' });
        if (response.ok) {
            const apiData = await response.json();
            const heading = apiData.data.content.find(item => item.type === 'heading');
            const paragraph = apiData.data.content.find(item => item.type === 'paragraph');
            if (heading) {
                homePageHeading = heading.text;
            }
            if (paragraph) {
                homePageContent = paragraph.text;
            }
        }
    } catch (error) {
        console.error('Failed to fetch homepage content:', error);
    }

    const VIDEOS_PER_PAGE = 50;
    const totalPages = Math.ceil(allVideos.length / VIDEOS_PER_PAGE);

    return <HomePage videos={allVideos} currentPage={currentPage} totalPages={totalPages} homePageHeading={homePageHeading} homePageContent={homePageContent} />;
}

export default function Home({ searchParams }) {
    return (
        <Suspense fallback={<HomePageSkeleton />}>
            <HomeContent searchParams={searchParams} />
        </Suspense>
    );
}

function HomePageSkeleton() {
    return (
        <div className="px-4 sm:px-6 lg:px-8 py-8">
            <section className="mb-12">
                <Skeleton className="h-8 w-48 mb-6" />
                <Skeleton className="h-4 w-3/4 mb-6" />
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-5 gap-x-4 gap-y-8">
                    {[...Array(50)].map((_, i) => (
                        <div key={i} className="space-y-2">
                            <Skeleton className="aspect-video w-full" />
                            <Skeleton className="h-4 w-2/3" />
                            <Skeleton className="h-3 w-1/2" />
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
