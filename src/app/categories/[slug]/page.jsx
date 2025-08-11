
import { getCategories, getVideos } from '@/lib/data';
import { notFound } from 'next/navigation';
import VideoCard from '@/components/video-card';

export const dynamic = 'force-dynamic';

export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map((category) => ({
    slug: category.slug,
  }));
}

export async function generateMetadata({ params }) {
  const categories = await getCategories();
  const category = categories.find((c) => c.slug === params.slug);
  if (!category) {
    return {
      title: 'Category Not Found',
    };
  }

  const siteUrl = 'https://xxxc.online';
  const canonicalUrl = `${siteUrl}/categories/${category.slug}`;

  return {
    title: category.meta_title,
    description: category.meta_description,
    keywords: category.meta_keywords ? category.meta_keywords.split(',').map(k => k.trim()) : [],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: category.meta_title,
      description: category.meta_description,
      type: 'website',
      url: canonicalUrl,
      images: [
        {
          url: category.thumbnailUrl,
          width: 400,
          height: 225,
          alt: category.name,
        },
      ],
    },
    twitter: {
        card: 'summary_large_image',
        title: category.meta_title,
        description: category.meta_description,
        images: [category.thumbnailUrl],
    }
  };
}

export default async function CategoryPage({ params }) {
  const categories = await getCategories();
  const category = categories.find((c) => c.slug === params.slug);

  if (!category) {
    notFound();
  }

  const allVideos = await getVideos();
  // Shuffle all videos to display a random selection on each category page visit
  const categoryVideos = allVideos.sort(() => Math.random() - 0.5);

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        <div className="md:col-span-12">
          <h2 className="text-xl md:text-2xl font-bold mb-6">Videos in {category.name}</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-6">
            {categoryVideos.map((video, index) => (
              <VideoCard key={`${video.id}-${index}`} video={video} />
            ))}
          </div>
          {categoryVideos.length === 0 && (
             <div className="text-center py-16">
                <p className="text-muted-foreground">No videos found for the category "{category.name}".</p>
            </div>
          )}
        </div>
      </div>
      
      <div className="mt-12 p-4 md:p-6 rounded-lg bg-card">
        <h1 className="text-2xl md:text-3xl font-bold font-headline mb-2">{category.name} Porn Videos</h1>
        <p className="text-muted-foreground text-sm md:text-base">{category.description}</p>
      </div>
    </div>
  );
}
