

import { getVideoBySlug, getVideos } from '@/lib/data';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import WatchPageClient from './watch-page-client';
import SimilarVideos from '@/components/similar-videos';

export async function generateMetadata({ params }) {
  const video = await getVideoBySlug(params.slug);
  if (!video) {
    return {
      title: 'Video Not Found',
    };
  }

  const siteUrl = 'https://xxxc.online';
  const canonicalUrl = `${siteUrl}/watch/${video.slug}`;

  return {
    title: video.meta_title || `${video.title} on xxxc.online`,
    description: video.meta_description || video.description,
    keywords: [...video.tags, video.creator, 'xxxc.online'],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: video.meta_title || `${video.title} on xxxc.online`,
      description: video.meta_description || video.description,
      type: 'video.movie',
      url: canonicalUrl,
      images: [
        {
          url: video.thumbnailUrl,
          width: 600,
          height: 400,
          alt: video.title,
        },
      ],
      videos: [
        {
          url: video.videoSources[0].url,
          secure_url: video.videoSources[0].url,
          type: 'video/mp4',
          width: 600,
          height: 400,
        }
      ]
    },
    twitter: {
        card: 'player',
        title: video.meta_title || `${video.title} on xxxc.online`,
        description: video.meta_description || video.description,
        images: [video.thumbnailUrl],
        players: [
            {
                playerUrl: canonicalUrl,
                streamUrl: video.videoSources[0].url,
                width: 600,
                height: 400
            }
        ]
    }
  };
}

const popularSearches = [
  "Passionate Sensual Sex", "Real Massage Happy Ending", "Best Porn",
  "Full Porn Movies", "Diva Flawless", "Hollywood Movie Sex Scenes",
  "Naughty America Step Mom", "American", "Two Girls One Boy", "Tamil Aunty"
];

export default async function WatchPage({ params }) {
  const { slug } = params;
  const video = await getVideoBySlug(slug);

  if (!video) {
    notFound();
  }

  const allVideos = await getVideos();
  const otherVideos = allVideos.filter((v) => v.id !== video.id);
  // Simple shuffle for variety on the server
  const similarVideos = otherVideos.sort(() => 0.5 - Math.random());
  
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 xl:col-span-9">
          <WatchPageClient video={video} />
        </div>
        <div className="lg:col-span-4 xl:col-span-3">
            <div className="bg-card p-6 rounded-lg">
                <h2 className="text-2xl font-bold mb-6 font-headline">Popular Searches</h2>
                <div className="flex flex-wrap gap-2">
                    {popularSearches.map((search) => (
                        <Button key={search} variant="secondary" className="bg-stone-800 hover:bg-stone-700 text-white rounded-md h-auto py-1.5 px-3 text-sm">
                            {search}
                        </Button>
                    ))}
                </div>
            </div>
        </div>
      </div>
      
      <div className="mt-12">
        <SimilarVideos videos={similarVideos} />
      </div>
    </div>
  );
}
