
import { getPornstars, getVideos, getPornstarByName } from '@/lib/data';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { CheckCircle, Flame, Play, Plus, Star } from 'lucide-react';
import VideoCard from '@/components/video-card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import Link from 'next/link';

export async function generateStaticParams() {
  const pornstars = await getPornstars();
  return pornstars.map((pornstar) => ({
    name: pornstar.name.toLowerCase().replace(/ /g, '-'),
  }));
}

function formatViews(views) {
  if (views >= 1000000000) return `${(views / 1000000000).toFixed(1)}B`;
  if (views >= 1000000) return `${(views / 1000000).toFixed(1)}M`;
  if (views >= 1000) return `${(views / 1000).toFixed(0)}K`;
  return views.toString();
}

async function getPornstarDetails(name) {
    const pornstar = await getPornstarByName(name.replace(/-/g, ' '));
    if (!pornstar) return null;

    const allVideos = await getVideos();
    const pornstarVideos = allVideos
        .filter(video => video.creator.toLowerCase() === pornstar.name.toLowerCase())
        .sort((a, b) => b.views - a.views);

    const trendingVideos = pornstarVideos.slice(0, 10);
    
    return { pornstar, pornstarVideos, trendingVideos };
}

export default async function PornstarProfilePage({ params }) {
  const data = await getPornstarDetails(params.name);

  if (!data) {
    notFound();
  }

  const { pornstar, pornstarVideos, trendingVideos } = data;

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 text-white">
      {/* Banner and Profile Info */}
      <div className="relative rounded-lg overflow-hidden mb-8">
        <div className="w-full h-48 md:h-64 bg-gray-800">
            <Image
                src={pornstar.imageUrl}
                alt={`${pornstar.name} banner`}
                width={1280}
                height={256}
                className="w-full h-full object-cover object-center"
                data-ai-hint={pornstar.dataAiHint}
            />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

        <div className="absolute bottom-0 left-0 p-4 md:p-6 w-full">
            <div className="flex flex-col md:flex-row items-center gap-4 text-center md:text-left">
                <div className="relative flex-shrink-0 w-32 h-32 md:w-40 md:h-40 -mt-16 md:-mt-20">
                    <Image
                        src={pornstar.imageUrl}
                        alt={pornstar.name}
                        width={160}
                        height={160}
                        className="w-full h-full object-cover rounded-full border-4 border-black"
                        data-ai-hint={pornstar.dataAiHint}
                    />
                </div>
                <div className="flex flex-col items-center md:items-start">
                    <h1 className="text-3xl md:text-4xl font-bold font-headline flex items-center gap-2">
                        {pornstar.name}
                        {pornstar.isVerified && <CheckCircle className="w-7 h-7 text-accent" />}
                    </h1>
                    <p className="text-sm text-muted-foreground mt-1">@{pornstar.name.toLowerCase().replace(/ /g, '')}</p>
                    <div className="flex items-center gap-4 mt-3">
                        <div className="text-center">
                            <p className="font-bold text-lg">{pornstar.videos}</p>
                            <p className="text-xs text-muted-foreground">Videos</p>
                        </div>
                        <div className="text-center">
                            <p className="font-bold text-lg">{formatViews(pornstar.views)}</p>
                            <p className="text-xs text-muted-foreground">Views</p>
                        </div>
                        <div className="text-center">
                            <p className="font-bold text-lg">#{pornstar.rank}</p>
                            <p className="text-xs text-muted-foreground">Rank</p>
                        </div>
                    </div>
                </div>
                <div className="flex md:ml-auto items-center gap-2 mt-4 md:mt-0">
                    <Button className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold rounded-full">Subscribe</Button>
                    <Button variant="outline" className="bg-transparent border-accent text-accent hover:bg-accent/10 rounded-full">
                        <Plus className="w-4 h-4 mr-2" />
                        Follow
                    </Button>
                </div>
            </div>
        </div>
      </div>

      {/* Trending Videos Carousel */}
      {trendingVideos.length > 0 && (
        <section className="mb-12">
          <h2 className="font-headline text-2xl font-bold mb-4 flex items-center gap-2">
            <Flame className="text-accent" />
            Trending Videos
          </h2>
          <Carousel opts={{ align: "start", slidesToScroll: 'auto' }} className="w-full">
            <CarouselContent>
              {trendingVideos.map((video) => (
                <CarouselItem key={video.id} className="basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5 2xl:basis-1/6">
                  <VideoCard video={video} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex" />
            <CarouselNext className="hidden md:flex" />
          </Carousel>
        </section>
      )}

      {/* All Videos Grid */}
      {pornstarVideos.length > 0 && (
        <section>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-x-4 gap-y-8">
            {pornstarVideos.map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>
        </section>
      )}

      {pornstarVideos.length === 0 && trendingVideos.length === 0 && (
        <p className="text-center text-muted-foreground py-16">
          No videos found for {pornstar.name}.
        </p>
      )}
    </div>
  );
}
